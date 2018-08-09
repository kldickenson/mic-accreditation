<?php

/**
 * This file runs when the plugin in uninstalled (deleted).
 */

//Check the user's permissions
if ( ! current_user_can( 'activate_plugins' ) ) {
	return;
}
// check_admin_referer( 'bulk-plugins' );

// If plugin is not being uninstalled, exit (do nothing)
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

// Delete Options

$options = array(
	'fp_foundation_assistant_version',
	'fp_load_foundation_checkbox',
	'fp_foundation_versions',
	'fp_load_foundation_icons_checkbox',
	'fp_load_owlcarousel_checkbox',
	'fp_fp_admin_divider_post',
	'fp_posts_query',
	'fp_posts_start_date',
	'fp_posts_end_date',
	'fp_fp_admin_divider_page',
	'fp_pages_query',
	'fp_pages_start_date',
	'fp_pages_end_date',
);

foreach ( $options as $option ) {
	if ( get_option( $option ) ) {
		delete_option( $option );
	}
}