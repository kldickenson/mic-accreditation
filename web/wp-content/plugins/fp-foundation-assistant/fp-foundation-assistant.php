<?php
/*
 * Plugin Name: FP Foundation Assistant
 * Version: 1.1.2
 * Plugin URI: http://www.fortpandemonium.com/fp-foundation-assistant
 * Description: FP Foundation Assistant combines the powers of the responsive framework Foundation by Zurb and Wordpress. Foundation versions 3 to 6 are supported, including the Flex Grid. The plugin includes 18 shortcodes and Foundation Icons Fonts 3.
 * Author: Fort Pandemonium
 * Author URI: http://www.fortpandemonium.com/
 * Requires at least: 4.3
 * Tested up to: 4.9
 *
 * Text Domain: fp-foundation-assistant
 * Domain Path: /localization/
 *
 * @package WordPress
 * @author Fort Pandemonium
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// Load plugin class files
require_once( 'includes/class-fp-foundation-assistant.php' );
require_once( 'includes/class-fp-foundation-assistant-settings.php' );

// Load plugin libraries
require_once( 'includes/class-fp-foundation-assistant-admin-api.php' );

// Load TinyMCE buttons
require_once( 'includes/class-fp-foundation-assistant-tinymce.php' );

// Load shortcodes
if (( get_option('fp_foundation_versions', 'foundation6') == 'foundation6' ) || ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-rtl' ))  {
	require_once( 'includes/class-wordpress-shortcodes-foundation-6.php' );
}

if (( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-flex' ) || ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-flex-rtl' ))  {
	require_once( 'includes/class-wordpress-shortcodes-foundation-6-flex.php' );
}

if ( get_option('fp_foundation_versions', 'foundation6') == 'foundation5' ) {
	require_once( 'includes/class-wordpress-shortcodes-foundation-5.php' );
}

if ( get_option('fp_foundation_versions', 'foundation6') == 'foundation4' ) {
	require_once( 'includes/class-wordpress-shortcodes-foundation-4.php' );
}

if ( get_option('fp_foundation_versions', 'foundation6') == 'foundation3' ) {
	require_once( 'includes/class-wordpress-shortcodes-foundation-3.php' );
}

// Localize script
require_once ( 'localization/fp-localized-script.php' ); 


/**
 * Returns the main instance of FP_Foundation_Assistant to prevent the need to use globals.
 * @since  1.0.0
 * @return object FP_Foundation_Assistant
 */
function FP_Foundation_Assistant () {
	$instance = FP_Foundation_Assistant::instance( __FILE__, '1.1.2' );

	if ( is_null( $instance->settings ) ) {
		$instance->settings = FP_Foundation_Assistant_Settings::instance( $instance );
	}

	return $instance;
}

FP_Foundation_Assistant();


