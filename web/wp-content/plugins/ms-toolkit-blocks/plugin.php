<?php
/**
 * Plugin Name: my MSToolkit Blocks
 * Description: my MSToolkit Blocks is a Gutenberg plugin created via create-guten-block.
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
