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
} = wp.compose;

const {
	registerBlockType, // Import registerBlockType() from wp.blocks
} = wp.blocks;

const {
	RichText,
	InspectorControls,
} = wp.editor;

const {
	TextControl,
	PanelBody,
} = wp.components;

export const edit = ( props ) => {
	const {
		isSelected,
		editable,
		setState,
		setAttributes,
	} = props;

	const {
		anchor,
		accordionHeading,
		accordionContent,
	} = props.attributes;

	const onSetActiveEditable = ( newEditable ) => () => {
		setState( { editable: newEditable } );
	};

	return [
		<InspectorControls key={ 'inspector' }>
			<PanelBody title={ __( 'Settings' ) }>
				<TextControl
					label={ __( 'Anchor Attribute' ) }
					help={ __( 'An anchor is a unique text label you can use to link directly to this section inline.' ) }
					value={ anchor }
					onChange={ ( anchor ) => {
						setAttributes( { anchor } );
					} }
				/>
			</PanelBody>
		</InspectorControls>,
		<div key={ 'editable' } className={ 'accredit-accordion' }>
			<RichText
				tagName={ 'h5' }
				value={ accordionHeading }
				placeholder={ __( 'Add Heading Text' ) }
				className={ 'accredit-accordion-heading' }
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
		anchor,
		accordionHeading,
		accordionContent,
	} = props.attributes;

	return (
		<ul className={ 'accordion' } data-accordion data-Options={ 'allowAllClosed:true; deepLink:true; updateHistory:true;' }>
			<li className={ 'accordion-item' } data-accordion-item>
				{ accordionHeading && !! accordionHeading.length && (
					<a className={ 'accordion-title' } href={ '#' + anchor }>
						{ accordionHeading }
					</a>
				) }
				{ accordionContent && !! accordionContent.length && (
					<div className={ 'accordion-content' } id={ anchor } data-tab-content>
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
		<path fill="none" d="M0,0h24v24H0V0z" />
		<rect x="3" y="17" width="18" height="2" />
		<path d="M19,12v1H5v-1H19 M21,10H3v5h18V10L21,10z" />
		<rect x="3" y="6" width="18" height="2" />
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
		},
		accordionContent: {
			type: 'array',
			source: 'children',
			selector: 'div',
		},
		anchor: {
			type: 'string',
			source: 'attribute',
			selector: '.accordion-content',
			attribute: 'id',
		},
	},

	// The "edit" property must be a valid function.
	edit: withState( { editable: 'content' } )( edit ),

	// The "save" property must be specified and must be a valid function.
	save: save,
} );
