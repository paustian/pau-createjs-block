<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

?>
<p <?php echo get_block_wrapper_attributes(); ?>>
</p>
<?php

if(!empty($attributes['javascriptPath']) && !empty($attributes['canvasWidth'])
	&& !empty($attributes['canvasHeight']) && !empty($attributes['initFnc'])) {
	$javascript_path = $attributes['javascriptPath'];
	$canvas_width = $attributes['canvasWidth'];
	$canvas_height = $attributes['canvasHeight'];
	$description = $attributes['description'];
	$init_func = $attributes['initFnc'];
	$init_id = substr($init_func, 4, strlen($init_func));
	$content_dir = preg_replace('|http://.*?/|', '/',content_url()) . "/";
	$javascript_path =  $content_dir . $javascript_path;
	$content_dir = dirname($javascript_path) . "/";
}

?>

<div id="animation_container<?php echo $init_id; ?>">
	<div id="dom_overlay_container<?php echo $init_id; ?>">
	<canvas id="<?php echo $init_id ?>" width="<?php echo $canvas_width ?>" height="<?php echo $canvas_height ?>" class="default">
	</canvas>
	<script src="<?php echo $javascript_path ?>"></script>
	<script>window.addEventListener("load", <?php echo $init_func ?>("<?php echo $content_dir ?>"))</script>
	</div>
</div>
<p class="figure-border-createjs-block"><?php echo $description ?></p>

