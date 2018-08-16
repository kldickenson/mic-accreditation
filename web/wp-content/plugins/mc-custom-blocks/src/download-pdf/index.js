/**
 * BLOCK: Button Block.
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n

const {
	registerBlockType, // Import registerBlockType() from wp.blocks
	BlockControls,
	RichText,
	MediaUpload,
	UrlInput,
} = wp.blocks;

const {
	Toolbar,
	Button,
	Dashicon,
	IconButton,
} = wp.components;


export const edit = ( props ) => {

	const { isSelected, className, setAttributes } = props;

	const { mediaURL, text, size } = props.attributes;

	return [
		<span key={ 'button' }
			className={ `accredit-block-button` }>
			<RichText
				tagName={ 'span' }
				placeholder={ __( 'Enter Text' ) }
				value={ text }
				onChange={ (text) => setAttributes( { text: text } ) }
				className={`${size}`}
				isSelected={ isSelected }
				keepPlaceholderOnFocus
			/>
		</span>,
		isSelected && (
			<form
				key={ 'form-link' }
				onSubmit={ ( event ) => event.preventDefault() }
				className={ `blocks-button__inline-link`}
				style={ { marginTop: 10 } }
			>
				<Dashicon icon={ 'admin-links' } />
				<UrlInput
					value={ mediaURL }
					onChange={ ( value ) => setAttributes( { mediaURL: value } ) }
				/>
				<IconButton
					icon={ 'editor-break' }
					label={ __( 'Apply' ) }
					type={ 'submit' }
				/>
			</form>
		),
	];
}

export const save = ( props ) => {

	const {
		mediaURL,
		text,
		size
		} = props.attributes;

	return (
		<div className={ 'accredit-block-button' }>
			<a href={ mediaURL } className={ 'button secondary expanded' } >
				{ text }
			</a>
		</div>
	);
}


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
registerBlockType( 'mc-custom-blocks/download', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'MC Download PDF Button' ), // Block title.
	icon: 'download', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'Custom', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Button' ),
		__( 'Stackable' ),
	],
	attributes: {
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
		},
		text: {
			type: 'array',
			source: 'children',
			selector: 'a',
		}
	},

	// The "edit" property must be a valid function.
	edit: edit,

	// The "save" property must be specified and must be a valid function.
	save: save
} );
