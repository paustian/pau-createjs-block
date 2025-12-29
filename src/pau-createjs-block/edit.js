/**
 *
 * A Gutenberg Block for handling html5 animations created with CreateJS
 *
 *
 */

import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InspectorControls,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 * This file was updated to properly load the js scripts that are dynamically different
 * for each block
 * @param {Object}   props               The block properties.
 * @param {Object}   props.attributes    Block attractions such as JavaScript path, etc.
 * @param {Function} props.setAttributes The function to update the attributes.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	// This allows us to send messages to the WordPress notice area.
	const { createErrorNotice } = useDispatch( 'core/notices' );
	const containerRef = useRef( null );
	const { javascriptPath, canvasWidth, canvasHeight, initFnc, description } =
		attributes;
	let initId = '';
	let animCont = '';
	let domOver = '';
	if ( initFnc && typeof initFnc === 'string' && initFnc.length > 4 ) {
		initId = initFnc.substring( 4 );
		animCont = 'animation_container' + initId;
		domOver = 'dom_overlay_container' + initId;
	}
	useEffect( () => {
		if ( javascriptPath && initFnc ) {
			// 1. Construct the FULL URL using the localized data.
			// UPLOAD_URL comes from the PAU_BLOCK_DATA object defined in PHP.
			const fullScriptUrl = `${ PAU_BLOCK_DATA.uploadUrl }/${ javascriptPath }`;
			const initializeAnimation = () => {
				const timeoutLimit = 5000; // Stop trying after 5 seconds
				const start = Date.now();
				const waitForElement = setInterval( () => {
					const iframe = document.querySelector(
						'iframe[name="editor-canvas"]'
					);
					const targetDoc = iframe
						? iframe.contentDocument
						: document;
					const targetWindow = iframe ? iframe.contentWindow : window;
					const canvasEl = targetDoc.getElementById( initId );
					const theFunction =
						targetWindow[ initFnc ] || window[ initFnc ];
					const timeElapsed = Date.now() - start;
					if ( canvasEl && 'function' === typeof theFunction ) {
						clearInterval( waitForElement );
						try {
							theFunction( targetDoc );
						} catch ( err ) {
							createErrorNotice(
								`Error executing ${ initFnc }: ${ err.message }`,
								{
									type: 'snackbar',
								}
							);
						}
						return;
					}
					if ( timeElapsed > timeoutLimit ) {
						clearInterval( waitForElement );
						const missing = [];
						if ( ! canvasEl ) {
							missing.push( 'Canvas' );
						}
						if ( ! window[ initFnc ] ) {
							missing.push( `Function ${ initFnc }` );
						}
						createErrorNotice(
							`CreateJS Timeout: Missing ${ missing.join(
								', '
							) }`,
							{
								type: 'snackbar',
							}
						);
					}
				}, 50 );
			};

			const iframe = document.querySelector(
				'iframe[name="editor-canvas"]'
			);
			const injectionDoc = iframe ? iframe.contentDocument : document;

			if ( injectionDoc ) {
				let script = injectionDoc.querySelector(
					`script[src="${ fullScriptUrl }"]`
				);
				if ( ! script ) {
					script = injectionDoc.createElement( 'script' );
					script.src = fullScriptUrl;
					script.type = 'text/javascript';
					script.onload = initializeAnimation;
					injectionDoc.head.appendChild( script );
				} else {
					initializeAnimation();
				}
			}
		}
	}, [ javascriptPath, initFnc, createErrorNotice, initId ] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'pau-createjs-block' ) }>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'JavaScript Path', 'pau-createjs-block' ) }
						value={ javascriptPath || '' }
						onChange={ ( value ) =>
							setAttributes( { javascriptPath: value } )
						}
					/>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Init Function for JavaScript',
							'pau-createjs-block'
						) }
						value={ initFnc || '' }
						onChange={ ( value ) => {
							setAttributes( { initFnc: value } );
						} }
					/>

					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Canvas Width', 'pau-createjs-block' ) }
						value={ canvasWidth || '' }
						onChange={ ( value ) => {
							const numberValue = parseInt( value );
							setAttributes( { canvasWidth: numberValue } );
						} }
						min="100"
						max="1000"
						type="number"
					/>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Canvas Height', 'pau-createjs-block' ) }
						value={ canvasHeight || '' }
						onChange={ ( value ) => {
							const numberValue = parseInt( value );
							setAttributes( { canvasHeight: numberValue } );
						} }
						min="100"
						max="1000"
						type="number"
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<div ref={ containerRef } id={ animCont }>
					<div id={ domOver }>
						<canvas
							id={ initId }
							width={ canvasWidth }
							height={ canvasHeight }
							className="default"
						></canvas>
					</div>
				</div>
				<h2>Animation Description</h2>
				<RichText
					tagName="p"
					value={ description } // Any existing content, either from the database or an attribute default.
					allowedFormats={ [
						'core/bold',
						'core/italic',
						'core/subscript',
						'core/superscript',
						'core/link',
					] } // Allow the content to be made bold or italic, but do not allow other formatting options!
					onChange={ ( value ) =>
						setAttributes( { description: value } )
					} // Store updated content as a block attribute!
					placeholder={ __( 'Type your description here.' ) } // Display this text before any content has been added by the user!
				/>
			</div>
		</>
	);
}
