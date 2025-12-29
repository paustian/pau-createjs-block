<?php
/**
 *
 * A Gutenberg Block for handling html5 animations created with CreateJS
 *
 * @package PaustianCreateJSBlock
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly.

?>
<p <?php echo esc_attr( get_block_wrapper_attributes() ); ?>>
</p>
<?php
if ( empty( $attributes['javascriptPath'] ) || empty( $attributes['canvasWidth'] )
	|| empty( $attributes['canvasHeight'] ) || empty( $attributes['initFnc'] ) ) {
	return 'Variables undefined';
}

$pau_javascript_path = $attributes['javascriptPath'];
$pau_canvas_width    = $attributes['canvasWidth'];
$pau_canvas_height   = $attributes['canvasHeight'];
$pau_description     = $attributes['description'];
$pau_init_func       = $attributes['initFnc'];
$pau_init_id         = substr( $pau_init_func, 4, strlen( $pau_init_func ) );

$pau_content_base_url    = content_url() . '/';
$pau_full_javascript_url = esc_url( $pau_content_base_url . $pau_javascript_path );
$pau_assets_base_url     = esc_url( dirname( $pau_full_javascript_url ) . '/' );
$pau_handle              = 'createjs-animation-block-script-' . md5( $pau_full_javascript_url );
if ( ! is_admin() ) {
	if ( ! wp_script_is( $pau_handle, 'enqueued' ) ) {
		// wp_enqueue_script now uses the correct, browser-accessible URL.
		wp_enqueue_script( $pau_handle, $pau_full_javascript_url, array(), 1, true );

		// The inline script uses the correct asset base URL.
		$pau_inline_script = "
            window.addEventListener( 'load', function() {
                // Call the initialization function, passing the required directory path.
                " . esc_js( $pau_init_func ) . "();
            } );
        ";
		wp_add_inline_script( $pau_handle, $pau_inline_script );
	}
}
$pau_ok_html = array(
	'strong' => array(),
	'em'     => array(),
	'b'      => array(),
	'i'      => array(),
	'u'      => array(),
	'a'      => array(),
	'sub'	 => array(),
	'sup'    => array()
)
?>

<div id="animation_container<?php echo esc_attr( $pau_init_id ); ?>">
	<div id="dom_overlay_container<?php echo esc_attr( $pau_init_id ); ?>">
		<canvas id="<?php echo esc_attr( $pau_init_id ); ?>" width="<?php echo esc_attr( $pau_canvas_width ); ?>" height="<?php echo esc_attr( $pau_canvas_height ); ?>" class="default">
		</canvas>
	</div>
</div>
<p class="figure-border-createjs-block"><?php echo wp_kses( $pau_description, $pau_ok_html ); ?></p>

