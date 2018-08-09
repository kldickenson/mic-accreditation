<?php
/**
 * Plugin Name: University of Michigan: MAuth
 * Plugin URI: https://github.com/umdigital/umich-mauth/
 * Description: Alternate UMich website authentication method.
 * Version: 1.2.1
 * Author: U-M: Digital
 * Author URI: http://vpcomm.umich.edu
 */

define( 'UMICHMAUTH_PATH', dirname( __FILE__ ) . DIRECTORY_SEPARATOR );

class UMichMAuth
{
    static private $_ssoURL = 'https://mauth.umwebops.org/';

    static private $_options = array(
        'mauth'      => 0,
        'wpauth'     => 0,
        'autocreate' => 0
    );

    static public function init()
    {
        // UPDATER SETUP
        if( !class_exists( 'WP_GitHub_Updater' ) ) {
            include_once UMICHMAUTH_PATH .'includes'. DIRECTORY_SEPARATOR .'updater.php';
        }
        if( isset( $_GET['force-check'] ) && $_GET['force-check'] && !defined( 'WP_GITHUB_FORCE_UPDATE' ) ) {
            define( 'WP_GITHUB_FORCE_UPDATE', true );
        }
        if( is_admin() ) {
            new WP_GitHub_Updater(array(
                // this is the slug of your plugin
                'slug' => plugin_basename(__FILE__),
                // this is the name of the folder your plugin lives in
                'proper_folder_name' => dirname( plugin_basename( __FILE__ ) ),
                // the github API url of your github repo
                'api_url' => 'https://api.github.com/repos/umdigital/umich-mauth',
                // the github raw url of your github repo
                'raw_url' => 'https://raw.githubusercontent.com/umdigital/umich-mauth/master',
                // the github url of your github repo
                'github_url' => 'https://github.com/umdigital/umich-mauth',
                 // the zip url of the github repo
                'zip_url' => 'https://github.com/umdigital/umich-mauth/zipball/master',
                // wether WP should check the validity of the SSL cert when getting an update, see https://github.com/jkudish/WordPress-GitHub-Plugin-Updater/issues/2 and https://github.com/jkudish/WordPress-GitHub-Plugin-Updater/issues/4 for details
                'sslverify' => true,
                // which version of WordPress does your plugin require?
                'requires' => '4.0',
                // which version of WordPress is your plugin tested up to?
                'tested' => '4.9.4',
                // which file to use as the readme for the version number
                'readme' => 'README.md',
                // Access private repositories by authorizing under Appearance > Github Updates when this example plugin is installed
                'access_token' => '',
            ));
        }

        // default options
        self::$_options = array_merge(
            self::$_options,
            get_site_option( 'umich_mauth_options', self::$_options ) ?: array()
        );

        // AUTHENTICATION HOOKS
        if( self::$_options['mauth'] ) {
            // authentication login
            add_filter( 'login_url',    array( __CLASS__, 'noReauth' ) );
            add_filter( 'authenticate', array( __CLASS__, 'authenticate' ), 30 ,3 );

            add_filter( 'plugin_action_links_'. plugin_basename( __FILE__ ), array( __CLASS__, 'actionLinks' ) );

            add_filter( 'allow_password_reset', function( $allow, $uID ){
                // if WP Auth is disabled OR the user is managed by mauth, disabled password reset
                if( !self::$_options['wpauth'] || ($uID && get_user_meta( $uID, 'umich_mauth_login', true )) ) {
                    return false;
                }

                return $allow;
            }, 10, 2 );

            add_action( 'admin_init', function(){
                if( preg_match( '#/user-new.php$#', $_SERVER['REQUEST_URI'] ) ) {
                    wp_redirect(
                        str_replace( 'user-new.php', 'users.php?page=um-mauth-add-user', $_SERVER['REQUEST_URI'] )
                    );
                    exit;
                }
            }, 1);
        }

        // disable WP authentication
        if( !self::$_options['wpauth'] ) {
            remove_filter( 'authenticate', 'wp_authenticate_username_password', 20 );
        }
        // add login button to login page if WP Auth is still enabled
        else {
            add_action( 'login_header', function(){
                $ssoAuthURL = 'http'. (isset( $_SERVER['HTTPS'] ) ? 's' : '') .'://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
                $parts = parse_url( $ssoAuthURL );
                $parts['query'] = isset( $parts['query'] ) ? $parts['query'] : '';
                parse_str( $parts['query'], $parts['query'] );
                unset( $parts['query']['mauth-token'] );
                unset( $parts['query']['loggedout'] );
                $parts['query']['mauth'] = 'true';
                $parts['query'] = http_build_query( $parts['query'] );
                $parts['query'] = $parts['query'] ? '?'. $parts['query'] : '';
                $ssoAuthURL = "{$parts['scheme']}://{$parts['host']}{$parts['path']}{$parts['query']}";

                include UMICHMAUTH_PATH .'templates'. DIRECTORY_SEPARATOR .'login.tpl';
            });
        }

        // ADMIN SETTINGS PAGES
        add_action( 'admin_init', array( __CLASS__, 'adminInit' ) );

        add_action( 'admin_menu', array( __CLASS__, 'adminMenu' ) );
        if( is_multisite() ) {
            add_action( 'network_admin_menu', array( __CLASS__, 'networkAdminMenu' ) );
        }
    }

    /**
     * Disable the reauth url param as it conflicts with SSO process
     */
    static public function noReauth( $url )
    {
        return remove_query_arg( 'reauth', $url );
    }

    /**
     * Handle authentication and validation to the SSO Service
     */
    static public function authenticate( $user, $username, $password )
    {
        global $wpdb;

        // get service URL
        $serviceURL = 'http'. (isset( $_SERVER['HTTPS'] ) ? 's' : '') .'://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        $parts = parse_url( $serviceURL );
        $parts['query'] = isset( $parts['query'] ) ? $parts['query'] : '';
        parse_str( $parts['query'], $parts['query'] );
        unset( $parts['query']['mauth-token'] );
        unset( $parts['query']['loggedout'] );
        $parts['query'] = http_build_query( $parts['query'] );
        $parts['query'] = $parts['query'] ? '?'. $parts['query'] : '';

        $serviceURL = "{$parts['scheme']}://{$parts['host']}{$parts['path']}{$parts['query']}";

        parse_str( $parts['query'], $parts['query'] );
        $parts['query']['mauth'] = 'true';
        $parts['query'] = http_build_query( $parts['query'] );
        $parts['query'] = $parts['query'] ? '?'. $parts['query'] : '';
        $ssoAuthURL = "{$parts['scheme']}://{$parts['host']}{$parts['path']}{$parts['query']}";

        // handle authentication verifycation
        if( isset( $_GET['mauth-token'] ) ) {
            $sites  = array();
            $groups = array();

            // get list of sites and groups
            if( is_multisite() ) {
                $sql = "
                SELECT meta_key,
                       meta_value
                  FROM {$wpdb->sitemeta}
                 WHERE meta_key LIKE 'umich_mauth_%_groups'";
                foreach( $wpdb->get_results( $sql ) as $row ) {
                    $siteID     = preg_replace( '/[^0-9]+/', '', $row->meta_key );
                    $siteGroups = maybe_unserialize( $row->meta_value ) ?: array();

                    foreach( $siteGroups as $group ) {
                        if( !$group['active'] ) {
                            continue;
                        }

                        $sites[ $siteID ][ $group['group'] ] = $group;
                        $groups[ $group['group'] ]           = $group['group'];

                        ksort( $sites[ $siteID ] );
                    }
                }

                ksort( $sites );
                ksort( $groups );
            }
            else {
                $sites[''] = array();
                foreach( get_option( 'umich_mauth_groups' ) as $group ) {
                    if( !$group['active'] ) {
                        continue;
                    }

                    $sites[''][ $group['group'] ] = $group;
                    $groups[ $group['group'] ]    = $group['group'];
                }

                ksort( $sites[''] );
                ksort( $groups );
            }


            $parts = parse_url( self::$_ssoURL );
            $parts['path'] = '/verify';

            $parts['query'] = isset( $parts['query'] ) ? $parts['query'] : '';
            parse_str( $parts['query'], $parts['query'] );
            $parts['query']['service'] = $serviceURL;
            $parts['query']['token']   = $_GET['mauth-token'];
            $parts['query']['groups']  = implode( ',', array_map( 'urlencode', array_keys( $groups ) ) );
            $parts['query'] = http_build_query( $parts['query'] );
            $parts['query'] = $parts['query'] ? '?'. $parts['query'] : '';

            // verify status and get user details
            $json = json_decode( file_get_contents(
                "{$parts['scheme']}://{$parts['host']}{$parts['path']}{$parts['query']}"
            ) );

            // if its not a good request, restart SSO process
            if( $json->status != 'success' ) {
                wp_redirect( $serviceURL, 307 );
                exit;
            }

            // make sure necessary params exist
            if( !$json->user->groups ) {
                $json->user->groups = array();
            }

            // determine autocreation status && determine new user groups
            $autoCreate = self::$_options['autocreate'] ? true : false;
            foreach( $sites as $siteID => $siteGroups ) {
                foreach( $siteGroups as $group ) {
                    if( in_array( $group['group'], $json->user->groups ) ) {
                        if( $group['autocreate'] ) {
                            $autoCreate = true;
                        }
                    }
                }
            }

            // see if user already has an account
            $user = get_user_by( 'login', $json->user->uname );
            if( !$user || is_wp_error( $user ) ) { // no account
                // autocreate account
                if( $autoCreate ) {
                    $uid = wp_insert_user(
                        array(
                            'user_login' => $json->user->uname,
                            'user_pass'  => wp_generate_password(),
                            'user_email' => $json->user->email ?: $json->user->uname .'@umich.edu',
                            'first_name' => $json->user->first,
                            'last_name'  => $json->user->last
                        )
                    );

                    $user = get_user_by( 'id', $uid );
                }
                else {
                    // NO ACCOUNT, and NO AUTOCREATION ENABLED, NO ACCESS
                    wp_die( 'You are not authorized to access this resource.', 'Unauthorized', array( 'back_link' => true ) );
                    exit;
                }
            }
            else {
                // update name from central authority
                if( $json->user->first || $json->user->last ) {
                    wp_update_user(
                        array(
                            'ID'         => $user->ID,
                            'first_name' => $json->user->first,
                            'last_name'  => $json->user->last
                        )
                    );
                }
            }


            // determine if user role should change
            if( $sites ) {
                $wpRoles = new WP_Roles();

                // get mauth site roles
                $mauthSiteRoles = get_user_meta( $user->ID, 'umich_mauth_roles', true );

                // get user sites role
                $wpSiteRoles = array();
                $sql = "
                SELECT meta_key,
                       meta_value

                  FROM {$wpdb->usermeta}

                 WHERE user_id = {$user->ID}
                   AND (
                       meta_key = '{$wpdb->prefix}capabilities'
                    OR meta_key LIKE CONCAT( '{$wpdb->prefix}', '%_capabilities' )
                   )";
                foreach( $wpdb->get_results( $sql ) as $row ) {
                    $siteID   = preg_replace( '/[^0-9]+/', '', $row->meta_key ) ?: 1;
                    $thisRole = maybe_unserialize( $row->meta_value ) ?: array();
                    $thisRole = $thisRole ? @array_shift( array_keys( $thisRole ) ) : false;

                    if( $thisRole ) {
                        $wpSiteRoles[ $siteID ] = $thisRole;
                    }

                    ksort( $wpSiteRoles );
                }

                // determine new sites role
                $newMauthSiteRoles = array();
                foreach( $sites as $siteID => $siteGroups ) {
                    $mauthSiteRole = isset( $mauthSiteRoles[ $siteID ] ) ? $mauthSiteRoles[ $siteID ] : false;
                    $wpSiteRole    = isset( $wpSiteRoles[ $siteID ] )    ? $wpSiteRoles[ $siteID ]    : false;
                    $userIsMember  = is_user_member_of_blog( $user->ID, $siteID );

                    if( $mauthSiteRole && !$userIsMember ) {
                        $mauthSiteRole = false;
                    }

                    $autoRole = '';
                    $autoAdd  = false;
                    foreach( $wpRoles->get_names() as $wpRoleKey => $wpRoleName ) {
                        foreach( $siteGroups as $group ) {
                            if( $group['role'] == $wpRoleKey ) {
                                if( $group['autocreate'] ) {
                                    $autoAdd = true;
                                }

                                if( !$autoRole || (count( $wpRoles->get_role( $wpRoleKey )->capabilities ) > count( $wpRoles->get_role( $autoRole )->capabilities )) ) {
                                    $autoRole = $group['role'];
                                }
                            }
                        }
                    }

                    // only record state if we have an autoRole
                    if( $autoRole ) {
                        $newMauthSiteRoles[ $siteID ] = $autoRole;
                    }

                    if( ($mauthSiteRole || $autoRole) && ($mauthSiteRole != $autoRole) ) {
                        if( $wpSiteRole != $autoRole ) {
                            if( is_multisite() ) {
                                if( $autoRole ) {
                                    // only add if they are allowed or they exist in the system
                                    if( $userIsMember || $autoAdd ) {
                                        // add user to blog with role
                                        add_user_to_blog( $siteID, $user->ID, $autoRole );
                                    }
                                }
                                else if( $userIsMember ) {
                                    // remove user from blog
                                    remove_user_from_blog( $user->ID, $siteID );
                                }
                            }
                            else {
                                wp_update_user(array(
                                    'ID'   => $user->ID,
                                    'role' => $autoRole
                                ));
                            }
                        }
                    }
                }

                // record current autorole state
                update_user_meta( $user->ID, 'umich_mauth_roles', $newMauthSiteRoles );
            }
            else {
                delete_user_meta( $user->ID, 'umich_mauth_roles' );
            }

            update_user_meta( $user->ID, 'umich_mauth_login', true );

            // RETURN WP_User Object
            return $user;
        }
        else if( isset( $_GET['loggedout'] ) ) {
            wp_redirect( '/' );
            exit;
        }
        // send off for authentication
        else if( !self::$_options['wpauth'] || isset( $_GET['mauth'] ) ) {
            $parts = parse_url( self::$_ssoURL );

            $parts['query'] = isset( $parts['query'] ) ? $parts['query'] : '';
            parse_str( $parts['query'], $parts['query'] );
            $parts['query']['service'] = $serviceURL;
            $parts['query'] = http_build_query( $parts['query'] );
            $parts['query'] = $parts['query'] ? '?'. $parts['query'] : '';

            wp_redirect( "{$parts['scheme']}://{$parts['host']}{$parts['path']}{$parts['query']}", 307 );
            exit;
        }
        else if( $password ) {
            $tUser = is_a( $user, 'WP_User' ) ? $user : get_user_by( 'login', $username );
            if( $tUser && get_user_meta( $tUser->ID, 'umich_mauth_login', true ) ) {
                return new WP_Error( 'umich_mauth', 'Account is managed by U-M Weblogin. <a href="'. $ssoAuthURL .'">Login with U-M Weblogin</a>' );
            }
        }

        if( !$_POST || is_a( $user, 'WP_User' ) ) {
            return $user;
        }
    }

    /**
     * Register admin settings as necessary
     */
    static public function adminInit()
    {
        if( !self::$_options['wpauth'] ) {
            add_filter( 'show_password_fields', function(){ return false; } );
            add_action( 'check_passwords', function( $userLogin, &$pass1, &$pass2 ){
                $pass1 = $pass2 = wp_generate_password();
            }, 10, 3);
            add_action( 'user_profile_update_errors', function( &$errors, $update, &$user ){
                if( $update ) {
                    unset( $user->user_pass );
                }
            }, 10, 3);
        }
    }

    /**
     * Add needed Admin settings configuration pages
     */
    static public function adminMenu()
    {
        // validate and save options
        if( $_POST && isset( $_POST['umich_mauth_nonce'] ) && wp_verify_nonce( $_POST['umich_mauth_nonce'], 'umich-mauth' ) ) {
            $_POST['umich_mauth_groups'] = self::validateGroups( $_POST['umich_mauth_groups'] );

            if( is_multisite() ) {
                update_site_option( 'umich_mauth_'. get_current_blog_id() .'_groups', $_POST['umich_mauth_groups'] );
            }
            else {
                $_POST['umich_mauth_options'] = self::validateOptions( $_POST['umich_mauth_options'] );

                update_site_option( 'umich_mauth_options', $_POST['umich_mauth_options'] );
                update_site_option( 'umich_mauth_groups',  $_POST['umich_mauth_groups']  );
            }
        }

        add_submenu_page(
            'options-general.php',
            'U-M: M-Auth',
            'U-M: M-Auth',
            'administrator',
            'umich_mauth',
            function(){
                self::$_options = array_merge(
                    self::$_options,
                    get_site_option( 'umich_mauth_options', self::$_options ) ?: array()
                );
                $mauthOptions = self::$_options;
                $mauthGroups  = get_site_option( 'umich_mauth'. (is_multisite() ? '_'. get_current_blog_id() : null) .'_groups', array() ) ?: array();

                $roles = array();
                $roles = array(
                    '' => 'Select Role'
                );
                foreach( get_editable_roles() as $key => $role ) {
                    $roles[ $key ] = $role['name'];
                }

                include UMICHMAUTH_PATH .'templates'. DIRECTORY_SEPARATOR .'admin_'.( is_multisite() ? 'multisite' : 'singlesite').'.tpl';
            }
        );

        // add custom add user page (no menu link)
        if( self::$_options['mauth'] ) {
            add_submenu_page( null, 'Add U-M User', 'Add User', 'read', 'um-mauth-add-user', array( __CLASS__, 'addUserPage' ) );
        }
    }

    /**
     * Add multisite network admin config page
     */
    static public function networkAdminMenu()
    {
        // validate and save options
        if( $_POST && isset( $_POST['umich_mauth_nonce'] ) && wp_verify_nonce( $_POST['umich_mauth_nonce'], 'umich-mauth' ) ) {
            $_POST['umich_mauth_options'] = self::validateOptions( $_POST['umich_mauth_options'] );
            update_site_option( 'umich_mauth_options', $_POST['umich_mauth_options'] );
        }

        add_submenu_page(
            'settings.php',
            'U-M: M-Auth',
            'U-M: M-Auth',
            'administrator',
            'umich_mauth',
            function(){
                self::$_options = array_merge(
                    self::$_options,
                    get_site_option( 'umich_mauth_options', self::$_options ) ?: array()
                );
                $mauthOptions = self::$_options;

                $roles = array();
                $roles = array(
                    '' => 'Select Role'
                );
                foreach( get_editable_roles() as $key => $role ) {
                    $roles[ $key ] = $role['name'];
                }

                include UMICHMAUTH_PATH .'templates'. DIRECTORY_SEPARATOR .'admin_network.tpl';
            }
        );

        // add custom add user page (no menu link)
        if( self::$_options['mauth'] ) {
            add_submenu_page( null, 'Add U-M User', 'Add User', 'read', 'um-mauth-add-user', array( __CLASS__, 'addUserPage' ) );
        }
    }

    static public function addUserPage()
    {
        $default = array(
            'uname'      => '',

            'user_login' => '',
            'email'      => '',
            'first_name' => '',
            'last_name'  => '',
            'noconfirm'  => '',

            'role'       => 'subscriber'
        );

        if( $_POST && isset( $_POST['umich_mauth_adduser_nonce'] ) && wp_verify_nonce( $_POST['umich_mauth_adduser_nonce'], 'umich-mauth' ) ) {
            $uid             = false;
            $default['role'] = $_POST['role'] ?: 'subscriber';

            if( $_POST['createaction'] == 'um' ) {
                $default['uname'] = $_POST['uname'];

                if( empty( $_POST['uname'] ) ) { // username required
                    add_settings_error(
                        'umich_mauth_adduser_uname',
                        'error',
                        'ERROR: Uniqname is required.',
                        'error'
                    );
                }
                else {
                    // check if users exists
                    if( $user = get_user_by( 'login', $_POST['uname'] ) ) {
                        // add user to blog if multisite
                        if( is_multisite() && !is_network_admin() ) {
                            $default['uname'] = '';

                            add_user_to_blog(
                                get_current_blog_id(),
                                $user->ID,
                                $_POST['role'] ?: 'subscriber'
                            );

                            add_settings_error(
                                'umich_mauth_adduser',
                                'success',
                                'User ('. $_POST['uname'] .') added successfully',
                                'updated'
                            );
                        }
                        else {
                            add_settings_error(
                                'umich_mauth_adduser_uname',
                                'error',
                                'ERROR: User already exists.',
                                'error'
                            );
                        }
                    }
                    // check if valid uniqname
                    else {
                        // get service URL
                        $serviceURL = 'http'. (isset( $_SERVER['HTTPS'] ) ? 's' : '') .'://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

                        // verify groups are valid
                        $parts = parse_url( self::$_ssoURL );
                        $parts['path'] = '/exists';

                        $parts['query'] = isset( $parts['query'] ) ? $parts['query'] : '';
                        parse_str( $parts['query'], $parts['query'] );
                        $parts['query']['service'] = $serviceURL;
                        $parts['query']['uname']   = $_POST['uname'];
                        $parts['query'] = http_build_query( $parts['query'] );
                        $parts['query'] = $parts['query'] ? '?'. $parts['query'] : '';

                        $json = json_decode( file_get_contents(
                            "{$parts['scheme']}://{$parts['host']}{$parts['path']}{$parts['query']}"
                        ));

                        // invalid username
                        if( $json->status != 'success' ) {
                            add_settings_error(
                                'umich_mauth_adduser_uname',
                                'error',
                                'ERROR: Invalid Uniqname. Verify that it is correct and try again.',
                                'error'
                            );
                        }
                        // add user
                        else {
                            $uid = wp_insert_user(
                                array(
                                    'user_login' => $json->user->uname,
                                    'user_pass'  => wp_generate_password(),
                                    'user_email' => $json->user->email ?: $json->user->uname .'@umich.edu',
                                    'first_name' => $json->user->first,
                                    'last_name'  => $json->user->last,
                                    'role'       => @$_POST['role'] ?: 'subscriber'
                                )
                            );

                            if( $uid && !is_a( $uid, 'WP_Error' ) ) {
                                $default['uname'] = '';

                                update_user_meta( $uid, 'umich_mauth_login', true );
                            }
                        }
                    }
                }
            }
            else if( $_POST['createaction'] == 'local' ) {
                $default['user_login'] = $_POST['user_login'];
                $default['email']      = $_POST['email'];
                $default['first_name'] = $_POST['first_name'];
                $default['last_name']  = $_POST['last_name'];
                $default['noconfirm']  = @$_POST['noconfirmation'] ?: '';

                // check if user exists by username
                if( $tUser = get_user_by( 'login', $_POST['user_login'] ) ) {
                    $uid = $tUser->ID;
                }
                // check if user exists by email
                else if( $tUser = get_user_by( 'email', $_POST['email'] ) ) {
                    $uid = $tUser->ID;
                }
                // create account
                else {
                    // skip email to user
                    if( !$_POST['noconfirmation'] ) {
                        $_POST['send_user_notification'] = true;
                    }

                    $_POST['pass1'] = $_POST['pass2'] = wp_generate_password( 24 );

                    // create user
                    $uid = edit_user();
                }

                if( $uid && !is_a( $uid, 'WP_Error' ) ) {
                    $default['user_login'] = '';
                    $default['email']      = '';
                    $default['first_name'] = '';
                    $default['last_name']  = '';
                    $default['noconfirm']  = '';
                }
            }

            // set error if insert/update errored
            if( is_a( $uid, 'WP_Error' ) ) {
                add_settings_error(
                    'umich_mauth_adduser',
                    'error',
                    $uid->get_error_message(),
                    'error'
                );
            }
            // insert/update succeeded
            else if( $uid ) {
                // add user to blog if multisite
                if( !is_network_admin() ) {
                    if( is_multisite() ) {
                        add_user_to_blog(
                            get_current_blog_id(),
                            $uid,
                            $_POST['role'] ?: 'subscriber'
                        );
                    }
                    else {
                        wp_update_user(array(
                            'ID'   => $uid,
                            'role' => $_POST['role'] ?: 'subscriber'
                        ));
                    }
                }

                add_settings_error(
                    'umich_mauth_adduser',
                    'success',
                    'User ('. ($_POST['uname'] ?: $_POST['user_login']) .') added successfully',
                    'updated'
                );
            }
        }

        include UMICHMAUTH_PATH .'templates'. DIRECTORY_SEPARATOR .'admin_adduser-um.tpl';

        if( self::$_options['wpauth'] ) {
            include UMICHMAUTH_PATH .'templates'. DIRECTORY_SEPARATOR .'admin_adduser-local.tpl';
        }
    }

    /**
     * Add link to settings page from the plugins listing admin page
     */
    static public function actionLinks( $links )
    {
        return array_merge(
            $links,
            array(
                '<a href="'. admin_url( 'options-general.php?page=umich_mauth' ) .'">Settings</a>'
            )
        );
    }

    /**
     * Make sure options values are acceptable
     */
    static public function validateOptions( $options )
    {
        // validate settings
        foreach( $options as $key => $val ) {
            switch( $key ) {
                case 'mauth':
                case 'wpauth':
                case 'autocreate':
                    if( !preg_match( '/^[0-1]$/', $val ) ) {
                        $options[ $key ] = 0;
                    }
                    $options[ $key ] = (int) $val;
                    break;

                default:
                    break;
            }
        }

        return $options;
    }

    /**
     * Validate requested groups for if they exist and if their memberlist is public
     */
    static public function validateGroups( $groups )
    {
        $newGroups = array();

        if( !$groups ) {
            return $groups;
        }

        // get available roles
        $roles = array();
        foreach( get_editable_roles() as $key => $role ) {
            $roles[ $key ] = $role['name'];
        }

        // validate groups
        foreach( $groups as $key => $group ) {
            // make sure value is an int
            foreach( array( 'active', 'autocreate' ) as $oKey ) {
                if( !isset( $group[ $oKey ] ) || !preg_match( '/^[0-1]$/', $group[ $oKey ] ) ) {
                    $group[ $oKey ] = 0;
                }
                else {
                    $group[ $oKey ] = (int) $group[ $oKey ];
                }
            }

            // must have group name
            if( !$group['group'] ) {
                continue;
            }

            // make sure there is a role
            if( !isset( $roles[ $group['role'] ] ) ) {
                add_settings_error(
                    'umich_mauth_groups_'. $key,
                    'error',
                    'ERROR: Missing role for group. Group has been deactivated.',
                    'error'
                );

                $group['role']   = null;
                $group['active'] = 0;
            }

            $newGroups[ $group['group'] ] = $group;
        }

        if( !$newGroups ) {
            return array();
        }


        // get service URL
        $serviceURL = 'http'. (isset( $_SERVER['HTTPS'] ) ? 's' : '') .'://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

        // verify groups are valid
        $parts = parse_url( self::$_ssoURL );
        $parts['path'] = '/verify';

        $parts['query'] = isset( $parts['query'] ) ? $parts['query'] : '';
        parse_str( $parts['query'], $parts['query'] );
        $parts['query']['service'] = $serviceURL;
        $parts['query']['groups']  = implode( ',', array_map( 'urlencode', array_keys( $newGroups ) ) );
        $parts['query'] = http_build_query( $parts['query'] );
        $parts['query'] = $parts['query'] ? '?'. $parts['query'] : '';

        $json = json_decode( file_get_contents(
            "{$parts['scheme']}://{$parts['host']}{$parts['path']}{$parts['query']}"
        ));

        if( $json->status != 'success' ) {
            add_settings_error(
                'umich_mauth_groups',
                'error',
                'ERROR: Unable to verify groups. Deactivating all groups.',
                'error'
            );

            foreach( $newGroups as &$group ) {
                $group['active'] = 0;
            }
        }

        foreach( $json->groups as $group => $status ) {
            switch( $status ) {
                case 'ok':
                    break;

                case 'private':
                    add_settings_error(
                        'umich_mauth_groups_'. md5( $group ),
                        'error',
                        'ERROR: The group "'. $group .'" is private and cannot be used.',
                        'error'
                    );
                    $newGroups[ $group ]['active'] = 0;
                    break;

                case 'unknown':
                default:
                    add_settings_error(
                        'umich_mauth_groups_'. md5( $group ),
                        'error',
                        'ERROR: Unable to verify the group "'. $group .'"',
                        'error'
                    );
                    $newGroups[ $group ]['active'] = 0;
                    break;
            }
        }

        $groups = array();
        foreach( $newGroups as $group ) {
            $groups[] = $group;
        }

        return $groups;
    }
}
UMichMauth::init();
