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
	withState,
} = wp.components;

const {
	RichText,
} = wp.editor;

const {
	registerBlockType, // Import registerBlockType() from wp.blocks
} = wp.blocks;

export const edit = ( props ) => {

	const {
		isSelected,
		editable,
		setState,
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
const accordionBlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="2 2 22 22">
		<path style="fill:#00274C;" d="M1.6,4v16c0,1.1,0.9,2,2,2h22c1.1,0,2-0.9,2-2V4c0-1.1-0.9-2-2-2h-22C2.5,2,1.6,2.9,1.6,4z M25.6,7.8 V20h-22V7.8H25.6z"/>
		<path style="fill:#00274C;" d="M1.6,26v2c0,1.1,0.9,2,2,2h22c1.1,0,2-0.9,2-2v-2c0-1.1-0.9-2-2-2h-22C2.5,24,1.6,24.9,1.6,26z"/>
		<path style="fill:none;stroke:#FFCB05;stroke-width:0.75;stroke-linecap:round;stroke-miterlimit:10;" d="M4.1,27h2 M5.1,28v-2"/>
		<line style="fill:none;stroke:#FFCB05;stroke-width:0.75;stroke-linecap:round;stroke-miterlimit:10;" x1="4.6" y1="5" x2="6.6" y2="5"/>
	</svg>
);
registerBlockType( 'mc-custom-blocks/accordion', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'MC Accordion' ), // Block title.
	icon: accordionBlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'Custom', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'MC Accordion' ),
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
