<?php
// This file is generated. Do not modify it manually.
return array(
	'pau-createjs-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/pau-createjs-block',
		'version' => '0.1.0',
		'title' => 'CreateJS Block',
		'category' => 'media',
		'icon' => 'layout',
		'description' => 'A block for displaying media created with createJS.',
		'attributes' => array(
			'javascriptPath' => array(
				'type' => 'string',
				'default' => ''
			),
			'initFnc' => array(
				'type' => 'string',
				'default' => ''
			),
			'canvasWidth' => array(
				'type' => 'number',
				'default' => 450
			),
			'canvasHeight' => array(
				'type' => 'number',
				'default' => 360
			),
			'description' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => true,
			'supports' => array(
				'color' => array(
					'background' => false,
					'text' => true
				),
				'typography' => array(
					'fontSize' => true
				)
			)
		),
		'textdomain' => 'pau-createjs-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
