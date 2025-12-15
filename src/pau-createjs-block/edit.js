/**
 *
 * A Gutenberg Block for handling html5 animations created with CreateJS
 *
 * @package Paustian
 * @subpackage CreateJSBlock
 */

import { useEffect } from '@wordpress/element';
import {__} from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {InspectorControls, useBlockProps, RichText} from '@wordpress/block-editor';
import {PanelBody, TextControl} from '@wordpress/components';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of t.he
 * editor. This represents what the editor will render when the block is used.
 * This file was updated to properly load the js scripts that are dynamically different
 * for each block
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( {attributes, setAttributes} )
{
	const {javascriptPath, canvasWidth, canvasHeight, initFnc, description} = attributes;
	let initId 	= '';
	let content_dir = '';
	let animCont = '';
	let domOver 	= '';
	if ( initFnc && typeof initFnc === 'string' && initFnc.length > 4 ) {
		initId   = initFnc.substring( 4 );
		animCont = "animation_container" + initId;
		domOver  = "dom_overlay_container" + initId
	}
	useEffect(
		( ) => {
			if ( javascriptPath && initFnc ) {
				// 1. Construct the FULL URL using the localized data.
				// UPLOAD_URL comes from the PAU_BLOCK_DATA object defined in PHP.
				const fullScriptUrl = `${PAU_BLOCK_DATA.uploadUrl}/${javascriptPath}`;
				// 2. Create the < script > tag natively ( or using React's method for external scripts ).
				const script 	= document.createElement( 'script' );
				script.src 		= fullScriptUrl;
				script.async 	= true;
				// 3. Attach the load listener BEFORE appending the script.
				script.onload = ( ) => {
					try {
						// Once the script is loaded, execute the initialization function.
						if ( window[initFnc] ) {
							window[initFnc]( '' ); // Pass whatever parameters your init function needs.
						} else {
							console.error( `Initialization function ${initFnc} not found after loading script.` );
						}
					} catch ( error ) {
						console.error( 'Error calling initialization function:', error );
					}
				};

				// 4. Append the script to the animation container.
				const container = document.getElementById( animCont ); // You need to make sure animCont is defined correctly.
				if ( container ) {
					container.appendChild( script );
				}

				// Cleanup function to remove the script when the block unmounts or path changes.
				return ( ) => {
					if ( container && script ) {
						container.removeChild( script );
					}
				};
			}
		},
		[
			javascriptPath,
			initFnc
		]
	);

	return (
		<>
			<InspectorControls >
				<PanelBody title = {__( 'Settings', 'pau-createjs-block' )} >
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label = {__(
							'JavaScript Path',
							'pau-createjs-block'
						)}
						value = {javascriptPath || ''}
						onChange = {( value ) =>
							setAttributes( {javascriptPath: value} )
						}
					/>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label = {__(
							'Init Function for JavaScript',
							'pau-createjs-block'
						)}
						value = {initFnc || ''}
						onChange = {( value ) =>{
							setAttributes( {initFnc: value} )
						}}
					/>

					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label = {__(
							'Canvas Width',
							'pau-createjs-block'
						)}
						value = {canvasWidth || ''}
						onChange = {( value ) =>{
							const numberValue = parseInt( value );
							setAttributes( {canvasWidth: numberValue} )
						}}
						min = '100'
						max = '1000'
						type = 'number'
					/>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label = {__(
							'Canvas Height',
							'pau-createjs-block'
						)}
						value = {canvasHeight || ''}
						onChange = {( value ) => {
							const numberValue = parseInt( value );
							setAttributes( {canvasHeight: numberValue} )
						}}
						min = '100'
						max = '1000'
						type = 'number'
					/>

				< /PanelBody >
			</InspectorControls >
			<div {...useBlockProps( )} >
				<div id = {animCont} >
					<div id = {domOver} >
						<canvas id = {initId} width = {canvasWidth} height = {canvasHeight} className = "default" >
						</canvas >
					</div >
					<script >
						window.addEventListener( "load", {initFnc + "(" + content_dir + ");"} )
					</script >
				</div>
				<h2>Animation Description</h2>
				< RichText
					tagName = "p"
					value = {description} // Any existing content, either from the database or an attribute default.
					allowedFormats = { [ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/link' ] } // Allow the content to be made bold or italic, but do not allow other formatting options!
					onChange = { ( value ) => setAttributes( { description:value } ) } // Store updated content as a block attribute!
					placeholder = { __( 'Type your description here.' ) } // Display this text before any content has been added by the user!
				/>
			</div>
		</>
	);
}
