<?php
/**
 *
 * A Gutenberg Block for handling html5 animations created with CreateJS
 *
 * @package PaustianCreateJSBlock
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

?>
<p <?php echo esc_attr( get_block_wrapper_attributes() ); ?>>
</p>
<?php
if ( empty( $attributes['javascriptPath'] ) || empty( $attributes['canvasWidth'] )
	|| empty( $attributes['canvasHeight'] ) || empty( $attributes['initFnc'] ) ) {
	return 'Variables undefined';
}

$javascript_path = $attributes['javascriptPath'];
$canvas_width    = $attributes['canvasWidth'];
$canvas_height   = $attributes['canvasHeight'];
$description     = $attributes['description'];
$init_func       = $attributes['initFnc'];
$init_id         = substr( $init_func, 4, strlen( $init_func ) );

$content_base_url    = content_url() . '/';
$full_javascript_url = esc_url( $content_base_url . $javascript_path );
$assets_base_url     = esc_url( dirname( $full_javascript_url ) . '/' );
$handle              = 'createjs-animation-block-script-' . md5( $full_javascript_url );
if ( ! is_admin() ) {
	if ( ! wp_script_is( $handle, 'enqueued' ) ) {
		// wp_enqueue_script now uses the correct, browser-accessible URL.
		wp_enqueue_script( $handle, $full_javascript_url, array(), 1, true );

		// The inline script uses the correct asset base URL.
		$inline_script = "
            window.addEventListener( 'load', function() {
                // Call the initialization function, passing the required directory path.
                " . esc_js( $init_func ) . "('" . esc_js( $assets_base_url ) . "');
            } );
        ";
		wp_add_inline_script( $handle, $inline_script );
	}
}
?>

<div id="animation_container<?php echo esc_attr( $init_id ); ?>">
	<div id="dom_overlay_container<?php echo esc_attr( $init_id ); ?>">
		<canvas id="<?php echo esc_attr( $init_id ); ?>" width="<?php echo esc_attr( $canvas_width ); ?>" height="<?php echo esc_attr( $canvas_height ); ?>" class="default">
		</canvas>
	</div>
</div>
<p class="figure-border-createjs-block"><?php echo esc_attr( $description ); ?></p>

