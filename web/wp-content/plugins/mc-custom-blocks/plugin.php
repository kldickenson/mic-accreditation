<?php
/**
 * Plugin Name: MC Custom Blocks
 * Description: MC Custom Blocks is a Gutenberg plugin created via create-guten-block.
 * Author: Michigan Creative
 * Author URI: http://creative.umich.edu/
 * Version: 1.0.0
 *
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

/**
 * Custom category for our blocks
*/

function block_categories( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'Custom',
				'title' => __( 'Custom', 'custom-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', 'block_categories', 10, 2 );