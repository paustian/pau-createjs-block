import {useBlockProps} from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {javascriptPath, canvasWidth, canvasHeight, initFnc, description} = attributes;
	let initId      = '';
	let content_dir = '';
	let animCont    = '';
	let domOver     = '';
	if ( ! typeof initFnc !== 'undefined') {
		initId   = initFnc.substring( 4, initFnc.length );
		animCont = "animation_container" + initId;
		domOver  = "dom_overlay_container" + initId
	}
	return (
		< >
			< div { ...useBlockProps.save()} >
				< h2 > Animation Description < / h2 >
				< p > {description} < / p >
			< / div >
		< / >
	);
}
