<?php
/**
 * Author: Michigan Creative | University of Michigan
 * URL: http://creative.umich.edu
 */

/**
 * Register our sidebars and widgetized areas.
 *
 */

function accredit_customize_register( $wp_customize ) {

	//Home Quote
    $wp_customize->add_section( 'accredit_customize_register' , array(
        'title'       => __( 'Home Quote' ),
	    'priority'    => 30,
	    'description' => 'Displays on the home page.',
	) );

	$wp_customize->add_setting( 'accredit_homealert' );
	$wp_customize->add_control( new WP_Customize_Control(
	$wp_customize,
	    'accredit_homealert',
	    array(
	            'label' => __( 'Home Quote' ),
	            'section' => 'accredit_customize_register',
	            'settings' => 'accredit_homealert',
	            'type' => 'text',
	        )
	    )
    );

}
add_action( 'customize_register', 'accredit_customize_register' );

/* No file editing in the admin. */
define( 'DISALLOW_FILE_EDIT', true );

function copyright_bar_init() {

	register_sidebar( array(
		'name'          => 'Footer Copyright bar',
		'id'            => 'copyright_bar',
		'before_widget' => '<div class="copyright-bar">',
		'after_widget'  => '</div>',
	) );

}
add_action( 'widgets_init', 'copyright_bar_init' );

function enqueue_theme_scripts() {
		// Enqueue Polyfill
		wp_enqueue_script( 'polyfill', 'https://cdn.polyfill.io/v2/polyfill.min.js', '', 1, true);
}
add_action( 'wp_enqueue_scripts', 'enqueue_theme_scripts' );

	// remove unused admin menus
function accredit_remove_menus() {
    remove_menu_page( 'edit-comments.php' ); //Comments
}
add_action( 'admin_menu', 'accredit_remove_menus' );

//remove extraneous dashboard widgets
function accredit_remove_dashboard_widgets() {
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side'); // Remove Quick Draft
}
add_action('wp_dashboard_setup', 'accredit_remove_dashboard_widgets' );

// remove posts from admin menu
function accredit_remove_posts() {
    remove_menu_page( 'edit.php' );
}
add_action( 'admin_menu', 'accredit_remove_posts' );

// get current URL for insertion to the meta tags
function the_current_url() {
	echo home_url(add_query_arg(array()));
}
