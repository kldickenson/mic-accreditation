/**
 * BLOCK: Text Callout Block.
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n

const {
	IconButton,
	Dashicon,
} = wp.components;

const {
	withState,
} = wp.compose;

const {
	registerBlockType, // Import registerBlockType() from wp.blocks
} = wp.blocks;

const {
	RichText,
	URLInput,
} = wp.editor;

export const edit = ( props ) => {
	const {
		isSelected,
		editable,
		setState,
		setAttributes,
	} = props;

	const {
		calloutURL,
		calloutLinkText,
		heading,
		des,
	} = props.attributes;

	const onSetActiveEditable = ( newEditable ) => () => {
		setState( { editable: newEditable } );
	};

	return [
		<div key={ 'editable' } className={ 'accredit-callout' }>
			<RichText
				tagName={ 'h5' }
				value={ heading }
				className={ 'accredit-callout-heading' }
				placeholder={ __( 'Add Heading Text' ) }
				onChange={ ( text ) => setAttributes( { heading: text } ) }
				isSelected={ isSelected && editable === 'heading' }
				onFocus={ onSetActiveEditable( 'heading' ) }
				keepPlaceholderOnFocus
			/>
			<RichText
				tagName={ 'p' }
				value={ des }
				className={ 'accredit-callout-des' }
				placeholder={ __( 'Add Content Text' ) }
				onChange={ ( text ) => setAttributes( { des: text } ) }
				isSelected={ isSelected && editable === 'des' }
				onFocus={ onSetActiveEditable( 'des' ) }
				keepPlaceholderOnFocus
			/>
			<RichText
				tagName={ 'a' }
				placeholder={ __( 'Add Link Text' ) }
				value={ calloutLinkText }
				onChange={ ( text ) => setAttributes( { calloutLinkText: text } ) }
				isSelected={ isSelected && editable === 'calloutLinkText' }
				onFocus={ onSetActiveEditable( 'calloutLinkText' ) }
				keepPlaceholderOnFocus
			/>
		</div>,
		isSelected && (
			<form
				key={ 'form-link' }
				onSubmit={ ( event ) => event.preventDefault() }
				style={ { marginTop: 10 } }
			>
				<Dashicon icon={ 'admin-links' } />
				<URLInput
					value={ calloutURL }
					onChange={ ( value ) => setAttributes( { calloutURL: value } ) }
					onFocus={ onSetActiveEditable( 'calloutURL' ) }
				/>
				<IconButton
					icon={ 'editor-break' }
					label={ __( 'Apply' ) }
					type={ 'submit' }
				/>
			</form>
		),
	];
};

export const save = ( props ) => {
	const {
		calloutURL,
		calloutLinkText,
		heading,
		des,
	} = props.attributes;

	return (
		<div className={ 'callout' }>

			{ heading && !! heading.length && (
				<h5>
					{ heading }
				</h5>
			) }
			{ des && !! des.length && (
				<p>
					{ des }
				</p>
			) }
			{ calloutLinkText && !! calloutLinkText.length && (
				<a href={ calloutURL }>
					{ calloutLinkText }
				</a>
			) }
		</div>
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
const textCalloutBlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666371" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
		<line fill="#666371" x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line>
	</svg>
);
registerBlockType( 'mc-custom-blocks/callout', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'MC Text Callout' ), // Block title.
	icon: textCalloutBlockIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'Custom', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'MC Text Callout' ),
	],
	attributes: {
		calloutURL: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
		},
		calloutLinkText: {
			type: 'string',
			source: 'children',
			selector: 'a',
		},
		heading: {
			type: 'array',
			source: 'children',
			selector: 'h5',
		},
		des: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
	},

	// The "edit" property must be a valid function.
	edit: withState( { editable: 'content' } )( edit ),

	// The "save" property must be specified and must be a valid function.
	save: save,
} );
