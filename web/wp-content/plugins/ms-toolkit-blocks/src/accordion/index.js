/**
 * BLOCK: Accordion Block.
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n

const {
	dashIcons,
	withState,
} = wp.components;

const {
	registerBlockType, // Import registerBlockType() from wp.blocks
	RichText,
} = wp.blocks;

export const edit = ( props ) => {

	const {
		isSelected,
		editable,
		setState,
		className,
		setAttributes,
	} = props;

	const {
		accordionHeading,
		accordionContent,
	} = props.attributes;

	const onSetActiveEditable = ( newEditable ) => () => {
		setState( { editable: newEditable } )
	};

	return [
		<div key={ 'editable' } className={ `accredit-accordion` }>
			<RichText
				tagName={ 'h5' }
				value={ accordionHeading }
				placeholder={ __( 'Add Heading Text' ) }
				className={ 'accredit-callout-heading' }
				onChange={ ( text ) => setAttributes( { accordionHeading: text } ) }
				isSelected={ isSelected && editable === 'accordionHeading' }
				onFocus={ onSetActiveEditable( 'accordionHeading' ) }
				keepPlaceholderOnFocus
			/>
			<RichText
				tagName={ 'div' }
				value={ accordionContent }
				placeholder={ __( 'Add Content Text' ) }
				className={ 'accredit-accoridion-content' }
				onChange={ ( text ) => setAttributes( { accordionContent: text } ) }
				isSelected={ isSelected && editable === 'accordionContent' }
				onFocus={ onSetActiveEditable( 'accordionContent' ) }
				keepPlaceholderOnFocus
			/>
		</div>,
	];
};

export const save = ( props ) => {
	const {
		accordionHeading,
		accordionContent,
	} = props.attributes;

	return (
		<ul className={ 'accordion' } data-accordion data-allow-all-closed="true">
			<li className={ 'accordion-item' } data-accordion-item>
				{ accordionHeading && !! accordionHeading.length && (
					<a className={ 'accordion-title' } href="#">
						{ accordionHeading }
					</a>
				) }
				{ accordionContent && !! accordionContent.length && (
					<div className={ 'accordion-content' } data-tab-content>
						{ accordionContent }
					</div>
				) }
			</li>
		</ul>
	);
};

/**
 * Register: Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'ms-toolkit-blocks/accordion', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'MSToolkit Accordion' ), // Block title.
	icon: 'plus', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'MSToolkit Accordion' ),
	],
	attributes: {
		accordionHeading: {
			type: 'array',
			source: 'children',
			selector: 'a',
			default: __( 'Please enter accordion heading' )
		},
		accordionContent: {
			type: 'array',
			source: 'children',
			selector: 'div',
			default: __( 'Please enter accordion content' )
		},
	},

	// The "edit" property must be a valid function.
	edit: withState( { editable: 'content' } )( edit ),

	// The "save" property must be specified and must be a valid function.
	save: save,
} );
