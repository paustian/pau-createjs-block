<?php
/**
 * Plugin Name:       Pau CreateJS Block
 * Description:       A Gutenberg Block for the display of animations created in CreateJS.
 * Version:           0.2.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Timothy Paustian
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pau-createjs-block
 *
 * @package PaustianCreateJSBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function pau_create_block_pau_createjs_block_block_init(): void {
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/{$block_type}" );
	}
}

add_action( 'init', 'pau_create_block_pau_createjs_block_block_init' );

/**
 * Adds the createjs library to the page and adds the content_url, which will both be used by edit.js
 * to find the path to the JavaScript that controls the HTML5 animation.
 */
function pau_createjs_block_editor_localize_data(): void {

	// Safety check to ensure we are in the admin block editor.
	global $current_screen;
	// Check if the current screen is the block editor (post/page editor).
	if ( ! is_a( $current_screen, 'WP_Screen' ) || ! $current_screen->is_block_editor() ) {
		return;
	}

	wp_enqueue_script(
		'createjs-lib', // Unique handle for the script.
		'https://code.createjs.com/1.0.0/createjs.min.js', // Full CDN URL.
		array(), // It has no dependencies, so the array is empty.
		'1.0.0', // Version number.
		true
	);

	$editor_script_handle = 'create-block-pau-createjs-block-editor-script';
	// Check if the script handle has been registered.
	if ( wp_script_is( $editor_script_handle, 'registered' ) ) {
		$script_data   = array( 'uploadUrl' => content_url());
		$json_data     = wp_json_encode( $script_data );
		$inline_script = "const PAU_BLOCK_DATA = {$json_data};";

		wp_add_inline_script(
			$editor_script_handle,
			$inline_script,
			'before'
		);
	}
}
// Run on 'init' with a later priority (99) to ensure registration is complete.
add_action( 'enqueue_block_editor_assets', 'pau_createjs_block_editor_localize_data', 99 );

/**
 * Registers the createjs library and enqueues the createjs library. CreateJS controls the HTML5 animation.
 * That the block creates
 */
function pau_createjs_register_scripts() {
	wp_register_script(
		'createjs',
		'https://code.createjs.com/1.0.0/createjs.min.js',
			array(),
		'1.0.0',
		true
	);
	wp_enqueue_script( 'createjs' );
}
add_action( 'wp_enqueue_scripts', 'pau_createjs_register_scripts' );

