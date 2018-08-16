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
	Dashicon,
	withState,
	SelectControl,
} = wp.components;

const {
	registerBlockType, // Import registerBlockType() from wp.blocks
	InspectorControls,
	RichText,
	UrlInput,
} = wp.blocks;

export const edit = ( props ) => {
	const {
		isSelected,
		editable,
		setState,
		setAttributes,
	} = props;

	const {
		cardURL,
		heading,
		des,
		cardID,
		iconID,
	} = props.attributes;

	const onSetActiveEditable = ( newEditable ) => () => {
		setState( { editable: newEditable } );
	};

	const cardIDOptions = [
		{ value: ' ', label: __( 'Please select one' ) },
		{ value: 'compass-card', label: __( 'Getting Started card' ) },
		{ value: 'target-card', label: __( 'Goal Setting card' ) },
		{ value: 'sun-card', label: __( 'Relaxation card' ) },
		{ value: 'battery-card', label: __( 'Energy Management card' ) },
		{ value: 'thoughts-card', label: __( 'Working with Thoughts card' ) },
		{ value: 'human-card', label: __( 'Managing Emotions card' ) },
		{ value: 'moon-card', label: __( 'Sleep card' ) },
		{ value: 'chatty-chat-card', label: __( 'Communication card' ) },
		{ value: 'heart-card', label: __( 'Being Active card' ) },
	];

	const iconIDOptions = [
		{ value: ' ', label: __( 'Please select an icon' ) },
		{ value: 'compass', label: __( 'Getting Started icon' ) },
		{ value: 'target', label: __( 'Goal Setting icon' ) },
		{ value: 'sun', label: __( 'Relaxation icon' ) },
		{ value: 'battery', label: __( 'Energy Management icon' ) },
		{ value: 'thought', label: __( 'Working with Thoughts icon' ) },
		{ value: 'human', label: __( 'Managing Emotions icon' ) },
		{ value: 'moon', label: __( 'Sleep icon' ) },
		{ value: 'chatty-chat', label: __( 'Communication icon' ) },
		{ value: 'heart', label: __( 'Being Active icon' ) },
	];
	return [

		<InspectorControls key={ 'inspector' }>
			<SelectControl
				label={ __( 'Card ID' ) }
				value={ cardID }
				options={ cardIDOptions.map( ( { value, label } ) => ( {
					value: value,
					label: label,
				} ) ) }
				onChange={ ( newCardID ) => {
					setAttributes( { cardID: newCardID } );
				} }
			/>
			<SelectControl
				label={ __( 'Icon Image' ) }
				value={ iconID }
				options={ iconIDOptions.map( ( { value, label } ) => ( {
					value: value,
					label: label,
				} ) ) }
				onChange={ ( newIconID ) => {
					setAttributes( { iconID: newIconID } );
				} }
			/>
		</InspectorControls>,
		<div key={ 'editable' } className={ 'accredit-card' }>
			<RichText
				tagName={ 'h5' }
				value={ heading }
				className={ 'accredit-card-heading' }
				onChange={ ( text ) => setAttributes( { heading: text } ) }
				isSelected={ isSelected && editable === 'heading' }
				onFocus={ onSetActiveEditable( 'heading' ) }
				keepPlaceholderOnFocus
			/>
			<RichText
				tagName={ 'p' }
				value={ des }
				className={ 'accredit-card-des' }
				onChange={ ( text ) => setAttributes( { des: text } ) }
				isSelected={ isSelected && editable === 'des' }
				onFocus={ onSetActiveEditable( 'des' ) }
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
				<UrlInput
					value={ cardURL }
					onChange={ ( value ) => setAttributes( { cardURL: value } ) }
					onFocus={ onSetActiveEditable( 'cardURL' ) }
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
		cardURL,
		heading,
		des,
		cardID,
		iconID,
	} = props.attributes;

	return (
		<div className={ 'cell' }>
			<a href={ cardURL } id={ cardID }>
				<div className={ 'card' }>
					<div className={ 'card-divider row collapse align-middle' }>
						<div className={ 'column small-4 medium-2 large-2 xlarge-3' } id={ iconID }></div>
						{ heading && !! heading.length && (
							<div className={ 'column shrink' }>
								<h5>
									{ heading }
								</h5>
							</div>
						) }
					</div>
					{ des && !! des.length && (
						<div className={ 'card-section' }>
							<p>
								{ des }
							</p>
						</div>
					) }
				</div>
			</a>
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
registerBlockType( 'mc-custom-blocks/card', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'MC Card' ), // Block title.
	icon: 'grid-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'Custom', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'MC Card' ),
	],
	attributes: {
		cardURL: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
		},
		heading: {
			type: 'array',
			source: 'children',
			selector: 'h5',
			default: __( 'Please enter a Card Title' ),
		},
		des: {
			type: 'array',
			source: 'children',
			selector: 'p',
			default: __( 'Please enter a Card Description' ),
		},
		cardID: {
			type: 'string',
			default: '',
		},
		iconID: {
			type: 'string',
			default: null,
		},
	},

	// The "edit" property must be a valid function.
	edit: withState( { editable: 'content' } )( edit ),

	// The "save" property must be specified and must be a valid function.
	save: save,
} );
