/**
 * BLOCK: Card Block.
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
	Button,
	Toolbar,
} = wp.components;

const {
	withState,
} = wp.compose;

const {
	registerBlockType, // Import registerBlockType() from wp.blocks
} = wp.blocks;

const {
	BlockControls,
	RichText,
	MediaUpload,
} = wp.editor;

export const edit = ( props ) => {
	const {
		isSelected,
		editable,
		setState,
		setAttributes,
	} = props;

	const {
		imgURL,
		heading,
		id,
		des,
		height1,
		width2,
		verticalAlign,
		horizontalAlign,
		full,
	} = props.attributes;

	const imageClass = imgURL ? 'has-image' : '';

	const fullWidth = full ? 'full-width' : '';

	const onSetActiveEditable = ( newEditable ) => () => {
		setState( { editable: newEditable } );
	};

	return [
		isSelected && (
			<BlockControls key={ 'controls' }>
				{ imgURL && (
					<Toolbar>
						<MediaUpload
							onSelect={ ( media ) => setAttributes( { imgURL: media.url, id: media.id } ) }
							type="image"
							value={ id }
							render={ ( { open } ) => (
								<IconButton
									className="components-toolbar__control"
									label={ __( 'Edit image' ) }
									icon="edit"
									onClick={ open }
								/>
							) }
						/>
					</Toolbar>
				) }
			</BlockControls>
		),
		<div key={ 'editable' } className={ 'card' }>
			<div key={ 'editable' }
				className={ `image-box ${ imageClass } ${ fullWidth }` }
				data-url={ imgURL }
				style={ {
					width: width2 + 'px',
					height: height1 + 'px',
					backgroundImage: `url(${ imgURL })`,
					alignItems: horizontalAlign,
					justifyContent: verticalAlign,
				} }
			>
			</div>
			<MediaUpload
				onSelect={ ( media ) => setAttributes( { imgURL: media.url, id: media.id } ) }
				type={ 'image' }
				value={ id }
				render={ function( obj ) {
					return [
						! imgURL && (
							<Button
								className={ id ? '' : 'button button-large' }
								onClick={ obj.open }
							>
								{ __( 'Upload Image' ) }
							</Button>
						),
					];
				} }
			/>
			<RichText
				tagName={ 'h5' }
				value={ heading }
				placeholder={ __( 'Add Heading Text' ) }
				className={ 'card-heading' }
				onChange={ ( value ) => setAttributes( { heading: value } ) }
				isSelected={ isSelected && editable === 'heading' }
				onFocus={ onSetActiveEditable( 'heading' ) }
			/>
			<RichText
				tagName={ 'p' }
				value={ des }
				placeholder={ __( 'Add Content Text' ) }
				className={ 'card-des' }
				onChange={ ( value ) => setAttributes( { des: value } ) }
				isSelected={ isSelected && editable === 'des' }
				onFocus={ onSetActiveEditable( 'des' ) }
			/>
		</div>,
	];
};

export const save = ( props ) => {
	const {
		heading,
		des,
		imgURL,
	} = props.attributes;

	return (
		<div className={ 'card' }>
			<div className={ 'card-divider' }>
				{ heading && !! heading.length && (
					<h5>
						{ heading }
					</h5>
				) }
			</div>
			<img src={ imgURL } alt="the thing that was uploaded" />
			{ des && !! des.length && (
				<div className={ 'card-section' }>
					<p>
						{ des }
					</p>
				</div>
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
const CardIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="2 2 22 22">
		<path fill="#00274c" d="M14,4H6A2,2,0,0,0,4,6v8a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V6A2,2,0,0,0,14,4ZM6,14V6h8v8Z"></path>
		<path fill="#00274c" d="M30,4H22a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V6A2,2,0,0,0,30,4ZM22,14V6h8v8Z"></path>
		<path fill="#00274c" d="M14,20H6a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V22A2,2,0,0,0,14,20ZM6,30V22h8v8Z"></path>
		<path d="M30,20H22a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V22A2,2,0,0,0,30,20ZM22,30V22h8v8Z"></path>
	</svg>
);

registerBlockType( 'mc-custom-blocks/homepage-card', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'MC Card' ), // Block title.
	icon: CardIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'Custom', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'MC Card' ),
	],
	attributes: {
		imgURL: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img',
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
		width1: {
			type: 'number',
			default: '400',
		},
		height2: {
			type: 'number',
			default: '400',
		},
		verticalAlign: {
			type: 'string',
			default: 'center',
		},
		horizontalAlign: {
			type: 'string',
			default: 'center',
		},
		full: {
			type: 'boolean',
			default: false,
		},
	},

	// The "edit" property must be a valid function.
	edit: withState( { editable: 'content' } )( edit ),

	// The "save" property must be specified and must be a valid function.
	save: save,
} );
