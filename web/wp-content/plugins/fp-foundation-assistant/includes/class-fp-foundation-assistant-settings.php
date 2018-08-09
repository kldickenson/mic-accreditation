<?php

if ( ! defined( 'ABSPATH' ) ) exit;

class FP_Foundation_Assistant_Settings {

	/**
	 * @var 	object
	 * @since 	1.0.0
	 */
	private static $_instance = null;	//	The single instance of FP_Foundation_Assistant_Settings
	public $parent = null;				//	The main plugin object

	/**
	 * @var     string
	 * @since   1.0.0
	 */
	public $base = '';					//	Prefix for plugin settings

	/**
	 * @var     array
	 * @since   1.0.0
	 */
	public $settings = array(); 		//	Available settings 

	public function __construct ( $parent ) {
		$this->parent = $parent;

		$this->base = 'fp_';

		// Initialise settings
		add_action( 'init', array( $this, 'init_settings' ), 11 );

		// Register plugin settings
		add_action( 'admin_init' , array( $this, 'register_settings' ) );

		// Add settings page to menu
		add_action( 'admin_menu' , array( $this, 'add_menu_item' ) );

		// Add settings link to plugins page
		add_filter( 'plugin_action_links_' . plugin_basename( $this->parent->file ) , array( $this, 'add_settings_link' ) );
	}

	/**
	 * Initialise settings
	 * @since  1.0.0
	 * @return void
	 */
	public function init_settings () {
		$this->settings = $this->settings_fields();
	}

	/**
	 * Add settings page to admin menu
	 * @since  1.0.0
	 * @return void
	 */
	public function add_menu_item () {
		$page = add_options_page( __( 'FP Foundation Assistant', 'fp-foundation-assistant' ) , __( 'FP Foundation Assistant', 'fp-foundation-assistant' ) , 'manage_options' , $this->parent->_token . '_settings' ,  array( $this, 'settings_page' ) );
		add_action( 'admin_print_styles-' . $page, array( $this, 'settings_assets' ) );
	}

	/**
	 * Load settings JS & CSS
	 * @since  1.0.0
	 * @return void
	 */
	public function settings_assets () {

    	wp_enqueue_script( 'jquery-ui-datepicker' );
    	wp_enqueue_style( 'jquery-style', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/themes/smoothness/jquery-ui.css' );

    	wp_register_script( $this->parent->_token . '-settings-js', $this->parent->assets_url . 'js/settings' . $this->parent->script_suffix . '.js', array( 'farbtastic', 'jquery' ), '1.0.0' );
    	wp_enqueue_script( $this->parent->_token . '-settings-js' );
	}

	/**
	 * Add settings link to plugin list table
	 * @since  1.0.0
	 * @param  array $links Existing links
	 * @return array 		Modified links
	 */
	public function add_settings_link ( $links ) {
		$settings_link = '<a href="options-general.php?page=' . $this->parent->_token . '_settings">' . __( 'Settings', 'fp-foundation-assistant' ) . '</a>';
  		array_push( $links, $settings_link );
  		return $links;
	}

	/**
	 * Build settings fields
	 * @since  1.0.0
	 * @return array Fields to be displayed on settings page
	 */
	private function settings_fields () {

		$settings['standard'] = array(
			'description'			=> '',
			'fields'				=> array(
				array(
					'id' 			=> 'load_foundation_checkbox',
					'label'			=> __( 'Load Foundation', 'fp-foundation-assistant' ),
					'description'	=> __( "Uncheck the box if you don't want Foundation to load. This option is provided, in case you are already using Foundation-based theme, and you only want to use the shortcodes.", 'fp-foundation-assistant' ),
					'type'			=> 'checkbox',
					'default'		=> true
				),
				array(
					'id' 			=> 'foundation_versions',
					'label'			=> __( 'Foundation Version', 'fp-foundation-assistant' ),
					'description'	=> '<div class="callout secondary">'.__( 'Choose the Foundation version you want to use. If you chose not to load Foundation, choose the version you are currently using.', 'fp-foundation-assistant' ).'</div>',
					'type'			=> 'radio',
					'options'		=> array( 'foundation6' => __( 'Foundation 6', 'fp-foundation-assistant' ), 'foundation6-flex' => __( 'Foundation 6 - Flex Grid', 'fp-foundation-assistant' ), 'foundation6-rtl' => __( 'Foundation 6 - RTL', 'fp-foundation-assistant' ), 'foundation6-flex-rtl' => __( 'Foundation 6 - Flex Grid RTL', 'fp-foundation-assistant' ), 'foundation5' => __( 'Foundation 5', 'fp-foundation-assistant' ), 'foundation4' => __( 'Foundation 4', 'fp-foundation-assistant' ), 'foundation3' => __( 'Foundation 3', 'fp-foundation-assistant' ) ),
					'default'		=> 'foundation6'
				),
				array(
					'id' 			=> 'load_foundation_icons_checkbox',
					'label'			=> __( 'Load Foundation Icon Fonts 3', 'fp-foundation-assistant' ),
					'description'	=> __( "Uncheck the box if you don't want Foundation Icon Fonts to load.", 'fp-foundation-assistant' ),
					'type'			=> 'checkbox',
					'default'		=> true
				),
				array(
					'id' 			=> 'load_owlcarousel_checkbox',
					'label'			=> __( 'Load Owl Carousel', 'fp-foundation-assistant' ),
					'description'	=> __( "Uncheck the box if you don't want OwlCarousel to load. In this case, you can't use the [fp-carousel] shortcode.", 'fp-foundation-assistant' ),
					'type'			=> 'checkbox',
					'default'		=> true
				),
				array(
					'id' 			=> 'fp_admin_divider_post',
					'label'			=> '<p class="fp-admin-title">'.__( 'POST SETTINGS', 'fp-foundation-assistant' ).'</p>',
					'description'	=> '',
					'type'			=> 'divider',
					'default'		=> true
				),
				array(
					'id' 			=> 'posts_query',
					'label'			=> __( 'Posts', 'fp-foundation-assistant' ),
					'description'	=> '<div class="callout secondary">'.__( 'Choose on which posts to load the plugin. If you specify a period, the plugin will work only for the posts posted during this time. This is helpful if you want to switch to a different theme but still want to use the Foundation functionality on previous posts.', 'fp-foundation-assistant' ).'</div>',
					'type'			=> 'radio',
					'options'		=> array( 'allposts' => __( 'All Posts', 'fp-foundation-assistant' ), 'periodposts' => __( 'Specified Period <i class="fp-plugin-note">( Please, choose the dates below )</i>', 'fp-foundation-assistant' ), 'noposts' => __( 'No Posts', 'fp-foundation-assistant' ) ),
					'default'		=> 'allposts'
				),
				array(
					'id' 			=> 'posts_start_date',
					'label'			=> __( 'Posts Start Date' , 'fp-foundation-assistant' ),
					'description'	=> '<br>'.__( 'Choose a start date for the posts you want Foundation to work for.', 'fp-foundation-assistant' ),
					'type'			=> 'date',
					'default'		=> '',
					'placeholder'	=> __( 'Start date', 'fp-foundation-assistant' )
				),
				array(
					'id' 			=> 'posts_end_date',
					'label'			=> __( 'Posts End Date' , 'fp-foundation-assistant' ),
					'description'	=> '<br>'.__( 'Choose an end date for the posts you want Foundation to work for.', 'fp-foundation-assistant' ),
					'type'			=> 'date',
					'default'		=> '',
					'placeholder'	=> __( 'End date', 'fp-foundation-assistant' )
				),
				array(
					'id' 			=> 'fp_admin_divider_page',
					'label'			=> '<p class="fp-admin-title">'.__( 'PAGE SETTINGS', 'fp-foundation-assistant' ).'</p>',
					'description'	=> '',
					'type'			=> 'divider',
					'default'		=> true
				),
				array(
					'id' 			=> 'pages_query',
					'label'			=> __( 'Pages', 'fp-foundation-assistant' ),
					'description'	=> '<div class="callout secondary">'.__( 'Choose on which pages to load the plugin. If you specify a period, the plugin will work only for the pages posted during this time. This is helpful if you want to switch to a different theme but still want to use the Foundation functionality on previous pages.', 'fp-foundation-assistant' ).'</div>',
					'type'			=> 'radio',
					'options'		=> array( 'allpages' => __( 'All Pages', 'fp-foundation-assistant' ), 'periodpages' => __( 'Specified Period <i class="fp-plugin-note">( Please, choose the dates below )</i>', 'fp-foundation-assistant' ), 'nopages' => __( 'No Pages', 'fp-foundation-assistant' ) ),
					'default'		=> 'allpages'
				),
				array(
					'id' 			=> 'pages_start_date',
					'label'			=> __( 'Pages Start Date' , 'fp-foundation-assistant' ),
					'description'	=> '<br>'.__( 'Choose a start date for the pages you want Foundation to work for.', 'fp-foundation-assistant' ),
					'type'			=> 'date',
					'default'		=> '',
					'placeholder'	=> __( 'Start date', 'fp-foundation-assistant' )
				),
				array(
					'id' 			=> 'pages_end_date',
					'label'			=> __( 'Pages End Date' , 'fp-foundation-assistant' ),
					'description'	=> '<br>'.__( 'Choose an end date for the pages you want Foundation to work for.', 'fp-foundation-assistant' ),
					'type'			=> 'date',
					'default'		=> '',
					'placeholder'	=> __( 'End date', 'fp-foundation-assistant' )
				)
			)	
		);

		$settings = apply_filters( $this->parent->_token . '_settings_fields', $settings );

		return $settings;
	}

	/**
	 * Register plugin settings
	 * @since  1.0.0
	 * @return void
	 */
	public function register_settings () {
		if ( is_array( $this->settings ) ) {

			// Check posted/selected tab
			$current_section = '';
			if ( isset( $_POST['tab'] ) && $_POST['tab'] ) {
				$current_section = $_POST['tab'];
			} else {
				if ( isset( $_GET['tab'] ) && $_GET['tab'] ) {
					$current_section = $_GET['tab'];
				}
			}

			foreach ( $this->settings as $section => $data ) {

				if ( $current_section && $current_section != $section ) continue;
				$data['title'] ='';
				
				// Add section to page
				add_settings_section( $section, $data['title'], array( $this, 'settings_section' ), $this->parent->_token . '_settings' );

				foreach ( $data['fields'] as $field ) {

					// Validation callback for field
					$validation = '';
					if ( isset( $field['callback'] ) ) {
						$validation = $field['callback'];
					}

					// Register field
					$option_name = $this->base . $field['id'];
					register_setting( $this->parent->_token . '_settings', $option_name, $validation );

					// Add field to page
					add_settings_field( $field['id'], $field['label'], array( $this->parent->admin, 'display_field' ), $this->parent->_token . '_settings', $section, array( 'field' => $field, 'prefix' => $this->base ) );
				}

				if ( ! $current_section ) break;
			}
		}
	}

	public function settings_section ( $section ) {
		$html = '<p> ' . $this->settings[ $section['id'] ]['description'] . '</p>' . "\n";
		echo $html;
	}

	/**
	 * Load settings page content
	 * @since  1.0.0
	 * @return void
	 */
	public function settings_page () {

		// Build page HTML
		$html = '<div class="wrap" id="' . $this->parent->_token . '_settings">' . "\n";
			$html .= '<h2 class="fp-plugin-title">' . __( 'FP Foundation Assistant Settings' , 'fp-foundation-assistant' ) . '</h2>' . "\n";

			$tab = '';
			if ( isset( $_GET['tab'] ) && $_GET['tab'] ) {
				$tab .= $_GET['tab'];
			}

			// Show page tabs
			if ( is_array( $this->settings ) && 1 < count( $this->settings ) ) {

				$html .= '<h2 class="nav-tab-wrapper">' . "\n";

				$c = 0;
				foreach ( $this->settings as $section => $data ) {

					// Set tab class
					$class = 'nav-tab';
					if ( ! isset( $_GET['tab'] ) ) {
						if ( 0 == $c ) {
							$class .= ' nav-tab-active';
						}
					} else {
						if ( isset( $_GET['tab'] ) && $section == $_GET['tab'] ) {
							$class .= ' nav-tab-active';
						}
					}

					// Set tab link
					$tab_link = add_query_arg( array( 'tab' => $section ) );
					if ( isset( $_GET['settings-updated'] ) ) {
						$tab_link = remove_query_arg( 'settings-updated', $tab_link );
					}

					// Output tab
					$html .= '<a href="' . $tab_link . '" class="' . esc_attr( $class ) . '">' . esc_html( $data['title'] ) . '</a>' . "\n";

					++$c;
				}

				$html .= '</h2>' . "\n";
			}

			$html .= '<form method="post" action="options.php" enctype="multipart/form-data">' . "\n";

				// Get settings fields
				ob_start();
				settings_fields( $this->parent->_token . '_settings' );
				do_settings_sections( $this->parent->_token . '_settings' );
				$html .= ob_get_clean();

				$html .= '<p class="submit">' . "\n";
					$html .= '<input type="hidden" name="tab" value="' . esc_attr( $tab ) . '" />' . "\n";
					$html .= '<input name="Submit" type="submit" class="button-primary fp-button-primary" value="' . esc_attr( __( 'Save Settings' , 'fp-foundation-assistant' ) ) . '" />' . "\n";
				$html .= '</p>' . "\n";
			$html .= '</form>' . "\n";
		$html .= '</div>' . "\n";


		$html .= '<h3 class="fp-line">'. esc_attr( __( 'If you like our plugin, please, consider supporting us:', 'fp-foundation-assistant' ) ) . '</h3>' . "\n";	
		
		//Plugin Page Icon
		$html .= '<div class="fp-footer-support"><a class="fp-admin-footer fp-admin-icon" href="http://fortpandemonium.com/fp-foundation-assistant" target="_blank"><img src="'.plugins_url( 'assets/img/site.png',  dirname(__FILE__)).'"></a>' . "\n";	
			
			//PayPall Icon
			$html .= '<form class="fp-admin-footer-pp fp-admin-icon" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">';
				$html .= '<input type="hidden" name="cmd" value="_s-xclick">';
				$html .= '<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----MIIHPwYJKoZIhvcNAQcEoIIHMDCCBywCAQExggEwMIIBLAIBADCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwDQYJKoZIhvcNAQEBBQAEgYCXtwnKh6RPNo7hzZVb5J/lMcdBiTP5797Qt/d5BWxDxcj1Esdahg/D0EClpJecENYuVO4MaX4Myw4jswR9ff9CC0mhZL0FvvP+XZ8rVZX8ObBMcYlwIDM20ML52k6gS+PCJ2ZRuZ+ERBhEkmThZpRPk1w0fkj8bWQzJbwjl2w5jTELMAkGBSsOAwIaBQAwgbwGCSqGSIb3DQEHATAUBggqhkiG9w0DBwQIobh++O+WxdGAgZjpLA3GwyMXtgCGG8liUOga+NorQfa4yjznO3g7gRMcaLCIXHjmNTwWtezab+6qtHV5UFOdldkDhq1AabhoDJ04zE8gHFf7BCjz8gpSBPZoiJ0ED5BUHCJsacUMb5maOo7grT+BiDFjFW1a2P8xtBAMwJVdIcXTT0kjQffrJuKIQ/nyobSIHyKD9opBek/SmBYPeh6tIqTFqaCCA4cwggODMIIC7KADAgECAgEAMA0GCSqGSIb3DQEBBQUAMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbTAeFw0wNDAyMTMxMDEzMTVaFw0zNTAyMTMxMDEzMTVaMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAwUdO3fxEzEtcnI7ZKZL412XvZPugoni7i7D7prCe0AtaHTc97CYgm7NsAtJyxNLixmhLV8pyIEaiHXWAh8fPKW+R017+EmXrr9EaquPmsVvTywAAE1PMNOKqo2kl4Gxiz9zZqIajOm1fZGWcGS0f5JQ2kBqNbvbg2/Za+GJ/qwUCAwEAAaOB7jCB6zAdBgNVHQ4EFgQUlp98u8ZvF71ZP1LXChvsENZklGswgbsGA1UdIwSBszCBsIAUlp98u8ZvF71ZP1LXChvsENZklGuhgZSkgZEwgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tggEAMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADgYEAgV86VpqAWuXvX6Oro4qJ1tYVIT5DgWpE692Ag422H7yRIr/9j/iKG4Thia/Oflx4TdL+IFJBAyPK9v6zZNZtBgPBynXb048hsP16l2vi0k5Q2JKiPDsEfBhGI+HnxLXEaUWAcVfCsQFvd2A1sxRr67ip5y2wwBelUecP3AjJ+YcxggGaMIIBlgIBATCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE2MDYyNDE4MDg1OVowIwYJKoZIhvcNAQkEMRYEFKOBbBAxCGmjMX1L1OfDE6W8NfVhMA0GCSqGSIb3DQEBAQUABIGAr44W9xBJIpZXX3LCSGUjXipjhJnfqk3neGfbMDk0IRlg64+gpvni8QAHCeDJy0y3SPwM7JumF1oZ1Ooc26eBm8xLR6+ahSX4pHGVGeahdFSWN1zr6zQleneGRORELoHW2/8FXFYXMGVrTIQhhXBantxO+KLrynsSLI60mwF9pcs=-----END PKCS7-----
				">';
				$html .= '<input type="image" src="'.plugins_url( 'assets/img/support-us.png',  dirname(__FILE__)).'" border="0" name="submit" alt="'.__('PayPal - The safer, easier way to pay online!' , 'fp-foundation-assistant' ).'">';
				$html .= '<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form>' . "\n";
				
				
				//Subscribe Icon
				$html .= '<img class="fp-admin-footer fp-admin-icon" src="'.plugins_url( 'assets/img/subscribe.png',  dirname(__FILE__)).'"></div>' . "\n";
				$html .= '<div id="mc_embed_signup" class="fp-admin-footer">';
					$html .= '<form action="//fortpandemonium.us13.list-manage.com/subscribe/post?u=eb157553274f37755953bcb2c&amp;id=529e48d1b0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>';
					$html .= '<div id="mc_embed_signup_scroll">';
					$html .= '<label for="mce-EMAIL">'. esc_attr( __('Subscribe to our mailing list', 'fp-foundation-assistant' ) ) .'</label>';
					$html .= '<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="'. esc_attr( __('email address', 'fp-foundation-assistant' ) ) .'" required>';
					$html .= '<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->';
					$html .= '<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_eb157553274f37755953bcb2c_529e48d1b0" tabindex="-1" value=""></div>';
					$html .= '<div class="clear"><input type="submit" value="'. esc_attr( __('Subscribe', 'fp-foundation-assistant' ) ) .'" name="subscribe" id="mc-embedded-subscribe" class="button"></div>';
				$html .= '</div>';
			$html .= '</form>';
		$html .= '</div>' . "\n";

		echo $html;
	}

	/**
	 * Main FP_Foundation_Assistant_Settings Instance
	 * Ensures only one instance of FP_Foundation_Assistant_Settings is loaded or can be loaded.
	 * @since 1.0.0
	 * @static
	 * @see FP_Foundation_Assistant()
	 * @return Main FP_Foundation_Assistant_Settings instance
	 */
	public static function instance ( $parent ) {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self( $parent );
		}
		return self::$_instance;
	} // End instance()

	/**
	 * Cloning is forbidden.
	 * @since 1.0.0
	 */
	public function __clone () {
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?' , 'fp-foundation-assistant'  ), $this->parent->_version );
	} // End __clone()

	/**
	 * Unserializing instances of this class is forbidden.
	 * @since 1.0.0
	 */
	public function __wakeup () {
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?' , 'fp-foundation-assistant'  ), $this->parent->_version );
	} // End __wakeup()

}