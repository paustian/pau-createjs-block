/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { description } = attributes;
	return (
		<>
			<div { ...useBlockProps.save() }>
				<h2> Animation Description </h2>
				<p> { description } </p>
			</div>
		</>
	);
}
