<?php

/**
 * Foundation 6 Shortcodes
 * @since FP Foundation Assistant 1.0.0
 * @version 1.1.0
 */ 

if ( ! defined( 'ABSPATH' ) ) exit;

$fp_globals = array( 
	
	//Tabs
	'counter_tabs' => 0, 
	'counter_tab_wraps' => 0, 
	'tab_id' => '', 
	'tab_title'=> '', 

	//Accordion 
	'counter_accordion' => 0, 
	'counter_accordion_wraps' => 0, 
	'accordion_id' => '', 

	//Menu
	'nested_class' => '', 

	//Orbit
	'counter_orbit' => 0, 
	'orbit_container' => '', 

	//Reveal
	'reveal_counter' => '',
	'reveal_id' =>'', 

	//Tooltip
	'counter_tips' => 0, 

	//Dropdown
	'counter_dropdown' => 0,
	'dropdown_id' => '',

	//Equalizer
	'equalizer_watch' => '', 
	'row_equalizer_watch' => '', 

	//Carousel
	'owl_id' =>'', 

	//General
	'open_tab' => 'is-active', 
	'vertical_class' => 'vertical'
 );

new FP_Tabs;
new FP_Accordion;
new FP_Menu;
new FP_Button;
new FP_Callout;
new FP_Dropdown;
new FP_Video;
new FP_Interchange;
new FP_Label;
new FP_Orbit;
new FP_Progress;
new FP_Reveal;
new FP_Tooltip;
new FP_Visible;
new FP_Float;
new FP_Grid;
new FP_Carousel;
new FP_Posts_Query;


/**
 * Tabs Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.0.0
 */

class FP_Tabs { 
	
	public function __construct() { 
		add_shortcode( 'fp-tabs', array( $this, 'fp_tabs' ) );
		add_shortcode( 'fp-tab', array( $this, 'fp_tab' ) );
	 }

	public function fp_tabs( $atts, $content ) { 
		global $fp_globals;
		$content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Place here the shortcode tags for single tab.', 'fp-foundation-assistant' ), 
				'vertical' =>'', 
				'class' => ''
			 ), $atts
		 );
		// extract( $atts );

		$fp_globals[ 'id' ] = 'id-'.uniqid();			
		$fp_globals[ 'counter_tab_wraps' ]++;
		$fp_globals[ 'counter_tabs' ] = 0;
		$fp_globals[ 'tab_title' ] = true;	

		if ( !empty( $atts['class'] ) ) { $html = '<div class="'.esc_html( $atts['class'] ).'">'; } else { $html = ''; }
			
		if ( $atts['vertical'] == 'true' ) { 
			$html .= '<div class="row collapse"><div class="medium-3 columns"><ul id="'.esc_html( $fp_globals[ 'id' ] ).'" class="tabs '.esc_html( $fp_globals[ 'vertical_class' ] ).'" data-tabs >';

		 } else { 
			$html .= '<div class="fp-tabs-wrap"><ul id="'.esc_html( $fp_globals[ 'id' ] ).'" class="tabs" data-tabs>';
		 }

		$html .=  do_shortcode( $atts['content'] );
		$html .= '</ul>';

		if ( $atts['vertical'] == 'true' ) { 
			$html .= '</div><div class="medium-9 columns">';
		 }
		
		$fp_globals[ 'counter_tabs' ] = 0;
		$fp_globals[ 'tab_title' ] = false;

		$html .= '<div class="tabs-content" data-tabs-content="'.esc_html( $fp_globals[ 'id' ] ).'">';
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</div></div>';

		if ( $atts['vertical'] == 'true' ) { 
			$html .= '</div>';
		 }

		if ( !empty( $atts['class'] ) ) { $html .= '</div>'; }

        return $html;
	 }

	public function fp_tab( $atts, $content = null ){ 
        global $fp_globals;
        $content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );

		$fp_globals[ 'counter_tabs' ]++;
		$fp_globals[ 'tab_id' ] = '00'.$fp_globals[ 'counter_tab_wraps' ].'-tab-0'.$fp_globals[ 'counter_tabs' ];

		$atts = shortcode_atts( array( 
				'title' => __( 'Tab Title ', 'fp-foundation-assistant' ).$fp_globals[ 'counter_tabs' ], 
                'open' =>'', 
                'content' => !empty( $content ) ? $content : __( 'Tab Content ', 'fp-foundation-assistant' ).$fp_globals[ 'counter_tabs' ], 
                'class' => ''
			 ), $atts
		 );
		// extract( $atts );

		$class = '';

		if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } 
		
		if ( $fp_globals[ 'tab_title' ] ){ 

			if ( $atts['open'] == 'true' ) { 
				$html = "<li class='tabs-title  ".esc_html( $fp_globals[ 'open_tab' ] )."'><a href=#".esc_html( $fp_globals[ 'tab_id' ] ).">". esc_html( $atts['title'] ) ."</a></li>";
			 } else { 
				$html = "<li class='tabs-title'><a href=#".esc_html( $fp_globals[ 'tab_id' ] ).">". esc_html( $atts['title'] ) ."</a></li>";
			 }	

		 } else { 

			if ( $atts['open'] == 'true' ) { 				
				$html = "<div id='".esc_html( $fp_globals[ 'tab_id' ] )."' class='tabs-panel ".esc_html( $fp_globals[ 'open_tab' ] ).esc_html( $class )."'>". do_shortcode( $atts['content'] )."</div>";
			 } else { 
				$html = "<div id='".esc_html( $fp_globals[ 'tab_id' ] )."' class='tabs-panel".esc_html( $class )."'>". do_shortcode( $atts['content'] )."</div>";
			 }	
		 }
		
                return $html;
        }

 }

/**
 * Accordion Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.0.0
 */

class FP_Accordion { 
	
	public function __construct() { 
		add_shortcode( 'fp-accordion-wrap', array( $this, 'fp_accordion_wrap' ) );
		add_shortcode( 'fp-accordion', array( $this, 'fp_accordion' ) );
	 }

	public function fp_accordion_wrap( $atts, $content ) { 
		global $fp_globals;

		$content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );
		$fp_globals[ 'counter_accordion_wraps' ]++;
		$fp_globals[ 'counter_accordion' ] = 0;

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Place here the shortcode tags for single accordion item.', 'fp-foundation-assistant' ), 
				'multiexpand' => '', 
				'allclosed' =>'', 
				'class' => ''
			 ), $atts
		 );


		if ( !empty( $atts['class'] ) ) { $class = ' ' . $atts['class']; } else { $class = ''; }
		
		if ( $atts['multiexpand'] == 'true' ) { 
			$html = '<ul class="accordion'.esc_html( $class ).'" data-accordion data-multi-expand="true">';	
		 } elseif ( $atts['allclosed'] == 'true' ) { 
			$html = '<ul class="accordion'.esc_html( $class ).'" data-accordion data-allow-all-closed="true">';	
		 } else { 
			$html = '<ul class="accordion'.esc_html( $class ).'" data-accordion>';		
		 }

		$html .=  do_shortcode( $atts['content'] );
		$html .= '</ul>';

        return $html;
	 }

	public function fp_accordion( $atts, $content = null ){ 
        global $fp_globals;
        $content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );

		$fp_globals[ 'counter_accordion' ]++;
		$fp_globals[ 'accordion_id' ] = '00'.$fp_globals[ 'counter_accordion_wraps' ].'-accordion-0'.$fp_globals[ 'counter_accordion' ];

		$atts = shortcode_atts( array( 
				'title' => __( 'Accordion Title ', 'fp-foundation-assistant' ).$fp_globals[ 'counter_accordion' ], 
                'open' =>'', 
                'content' => !empty( $content ) ? $content : __( 'Accordion Content ', 'fp-foundation-assistant' ).$fp_globals[ 'counter_accordion' ], 
                'class' => ''
			 ), $atts
		 );

			if ( !empty( $atts['class'] ) ) { $class = ' ' . $atts['class']; } else { $class = ''; }
		
			if ( $atts['open'] == 'true' ) { 				
				$html = "<li class='accordion-item ".esc_html( $fp_globals[ 'open_tab' ] ).esc_html( $class )."' data-accordion-item>";
			 } else { 
				$html = "<li class='accordion-item".esc_html( $class )."' data-accordion-item>";
			 }	

			$html .= "<a id='".esc_html( $fp_globals[ 'accordion_id' ] ).'-heading'."' class='accordion-title' href='".esc_html( $fp_globals[ 'accordion_id' ] )."'>".esc_html( $atts['title'] )."</a>";
			$html .= "<div id='".esc_html( $fp_globals[ 'accordion_id' ] )."' class='accordion-content' data-tab-content>". do_shortcode( $atts['content'] )."</div>";

			$html .= "</li>";
	
            return $html;
        }


 }

/**
 * Menu Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.0.0
 */

class FP_Menu { 
	
	public function __construct() { 
		add_shortcode( 'fp-menu', array( $this, 'fp_menu' ) );
		add_shortcode( 'fp-menu-item', array( $this, 'fp_menu_item' ) );
		add_shortcode( 'fp-menu-nested', array( $this, 'fp_menu_nested' ) );
		add_shortcode( 'fp-submenu-item', array( $this, 'fp_submenu_item' ) );
	 }


	public function fp_menu( $atts, $content ) { 
		global $fp_globals;
		$content = str_replace( array( '</p>', '<p>' ), array( '', '' ), $content );
		$content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );


		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Menu Wrap', 'fp-foundation-assistant' ), 
				'type' => '', 
				'class' => ''
			 ), $atts
		 );

		if( !empty( $atts['class'] ) ) { $class = ' ' . $atts['class']; } else { $class = ''; }

		if( $atts['type'] =='vertical' ) { 
			$html = '<ul class="menu vertical'.esc_html( $class ).'">';
		 } elseif ( $atts['type'] =='accordion' ) { 
			$html = '<ul class="menu vertical'.esc_html( $class ).'" data-accordion-menu>';
		 } elseif ( $atts['type'] =='dropdown' ) { 
			$html = '<ul class="menu dropdown'.esc_html( $class ).'" data-dropdown-menu>';
		 } elseif ( $atts['type'] =='drilldown' ) { 
			$html = '<ul class="menu vertical'.esc_html( $class ).'" data-drilldown>';
		 } else { 
			$html = '<ul class="menu dropdown'.esc_html( $class ).'" data-dropdown-menu>';
		 }
		
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</ul>';
		

        return $html;
	 }

	public function fp_menu_item( $atts, $content ){ 
        global $fp_globals;

        $content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );
        $content = str_replace( array( '</p>', '<p>' ), array( '', '' ), $content );

		$atts = shortcode_atts( array( 
				'link' => __( 'Place your link here', 'fp-foundation-assistant' ), 
                'content' => !empty( $content ) ? $content : '', 
                'title' => __( 'Menu Title', 'fp-foundation-assistant' ), 
                'class' => ''
			 ), $atts
		 );

		if ( !empty( $atts['class'] ) ) { $class = ' class=' . $atts['class']; } else { $class = ''; }
		
		$html = '<li'.esc_html( $class ).'><a href="'.esc_url( $atts['link'] ).'">'.esc_html( $atts['title'] ).'</a>'. do_shortcode( $atts['content'] ).'</li>';

		return $html;
    }

    public function fp_menu_nested( $atts, $content ) { 
		global $fp_globals;

		$content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );
		$content = str_replace( array( '</p>', '<p>' ), array( '', '' ), $content );

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Submenu Wrap', 'fp-foundation-assistant' ), 
                'class' => ''
			 ), $atts
		 );

		if( !empty( $atts['class'] ) ) { $class = ' ' . $atts['class']; } else { $class = ''; }

		$html = '<ul class="menu vertical'.esc_html( $class ).'">';		
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</ul>';		

        return $html;
	 }

    public function fp_submenu_item( $atts, $content ){ 
        global $fp_globals;
        $content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );
        $content = str_replace( array( '</p>', '<p>' ), array( '', '' ), $content );

		$atts = shortcode_atts( array( 
				'link' => __( 'Place your link here', 'fp-foundation-assistant' ), 
                'content' => !empty( $content ) ? $content : '', 
                'title' => __( 'Submenu Title', 'fp-foundation-assistant' ), 
                'class' => ''
			 ), $atts
		 );

		if ( !empty( $atts['class'] ) ) { $class = ' class='. $atts['class']; } else { $class = ''; }	

		$html = '<li'. esc_html( $class ).'><a href="'. esc_url( $atts['link'] ).'">'.esc_html( $atts['title'] ).'</a>'. do_shortcode( $atts['content'] ) . '</li>';

		return $html;
    }
 }

/**
 * Button Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.0.0
 */

class FP_Button { 
	
	public function __construct() { 
		add_shortcode( 'fp-button', array( $this, 'fp_button' ) );
	 }


	public function fp_button( $atts, $content ) { 
		global $fp_globals;

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Button', 'fp-foundation-assistant' ), 
				'type' => '', 
				'size' => '', 
				'color' => '', 
				'hollow' =>'', 
				'dropdown' =>'', 
				'link' => '',   
				'tab' => '',
                'class' => ''
			), $atts
		);

		$button_classes = array();

		if ( in_array( $atts['size'], array( 'tiny', 'small', 'large', 'expanded' ), true ) ) { $button_classes[] = $atts['size'].' '; }
		if ( in_array( $atts['color'], array( 'primary', 'secondary', 'success', 'alert', 'warning', 'disabled' ), true ) ) { $button_classes[] = $atts['color'] . ' '; } 
		if ( $atts['hollow'] == 'true' ) { $button_classes[] = 'hollow '; } 
		if ( $atts['dropdown'] == 'true' ) { $button_classes[] = 'dropdown '; }
		if ( $atts['tab'] == 'true' ) { $tab = ' target="_blank" '; } else { $tab = ''; }
		if ( !empty( $atts['class'] ) ) { $class = $atts['class'] . ' '; } else { $class = ''; }

		if ( is_array( $button_classes ) ) { $button_classes = implode( " ", $button_classes ); }	

		if ( $atts['type'] =='link' ) { 
			$html = '<a href="'.esc_html( esc_url( $atts['link'] ) ).'"'. esc_html( $tab ) .' class="'.esc_html( $button_classes ).esc_html( $class ).'button">';
		} else { 
			$link = '';
			if ( $atts['type'] == 'submit' ) { $type = ' type=submit'; } else if ( $atts['type'] == 'reset' ) { $type = ' type=reset'; } else { $type = ''; }
			$html = '<button class="'.esc_html( $button_classes ).esc_html( $class ).'button"'.esc_html( $type ).'>';
		}
		
		$html .=  do_shortcode( $atts['content'] );

		if ( $atts['type'] =='link' ) { 
			$html .= '</a>';
		 } else { 
			$html .= '</button>';
		 }
		
        return $html;
	 }

 }

/**
 * Callout Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.0.0
 */

class FP_Callout { 
	
	public function __construct() { 
		add_shortcode( 'fp-callout', array( $this, 'fp_callout' ) );
	 }


	public function fp_callout( $atts, $content ) { 
		global $fp_globals;

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Callout', 'fp-foundation-assistant' ), 
				'size' => '', 
				'color' => '', 
				'closable' =>'', 
                'class' => ''
			 ), $atts
		 );

		$callout_classes = array();

		if ( in_array( $atts['color'], array( 'primary', 'secondary', 'success', 'alert', 'warning' ), true ) ) { $callout_classes[] = $atts['color'] . ' '; } 
		if ( in_array( $atts['size'], array( 'small', 'large' ), true ) ) { $callout_classes[] = $atts['size'] . ' '; }
		if ( !empty( $atts['class'] ) ) { $class = $atts['class'] . ' '; }	 else { $class = ''; }

		if ( is_array( $callout_classes ) ) { $callout_classes = implode( " ", $callout_classes ); }	

		if ( $atts['closable'] == 'true' ) { 
			$html = '<div class="'.esc_html( $callout_classes ).esc_html( $class ).'callout" data-closable>';
		 } else { 
			$html = '<div class="'.esc_html( $callout_classes ).esc_html( $class ).'callout">';
		 }

		$html .=  do_shortcode( $atts['content'] );

		if ( $atts['closable'] == 'true' ) { 
			$html .= '<button class="close-button" aria-label="'.__( 'Dismiss alert', 'fp-foundation-assistant' ).'" type="button" data-close><span aria-hidden="true">&times;</span></button></div>';
		 } else { 
			$html .= '</div>';
		 }
		
        return $html;
	 }

 }

/**
 * Dropdown
 * @since FP Foundation Assistant 1.0.0
 * @version 1.1.0
 */

class FP_Dropdown { 
	
	public function __construct() { 
		add_shortcode( 'fp-dropdown', array( $this, 'fp_dropdown' ) );
	 }

	public function fp_dropdown( $atts, $content ) { 

		global $fp_globals;

		$fp_globals[ 'counter_dropdown' ]++;
		$fp_globals[ 'dropdown_id' ] = 'dropdown-00'.$fp_globals[ 'counter_dropdown' ];	

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Dropdown Content', 'fp-foundation-assistant' ), 
				'id' => $fp_globals[ 'dropdown_id' ],
				'title' => __( 'Dropdown Title', 'fp-foundation-assistant' ), 
				'position' => '', 
				'hover'=> '',
                'class' => ''
			 ), $atts
		 );

		if ( $atts['hover'] == 'true' ) { $hover = ' data-hover="true"'; } else { $hover = ''; } 
		if ( in_array( $atts['position'], array( 'top', 'right', 'bottom' ), true ) ) { $position = ' '. $atts['position']; } else { $position = ''; }
		if ( !empty( $atts['class'] ) ) { $class = $atts['class'] .' '; } else { $class = ''; }	

		$html = '<button class="'.esc_html( $class ).'button" type="button" data-toggle="'.esc_html( $atts['id'] ).'">'.esc_html( $atts['title'] ).'</button>';
		$html .= '<div class="dropdown-pane'.esc_html( $position ).'" id="'.esc_html( $atts['id'] ).'" data-dropdown'. esc_html($hover).'>';		
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</div>';
	
        return $html;
	 }

 }

/**
 * Video Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.0.0
 */

class FP_Video { 
	
	public function __construct() { 
		add_shortcode( 'fp-video', array( $this, 'fp_video' ) );
	 }

	public function fp_video( $atts, $content ) { 
		
		global $fp_globals;

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : '', 
				'link' => __( 'Embed Video Link', 'fp-foundation-assistant' ), 
				'width' => 420, 
				'height' => 315, 
				'widescreen' => '', 
				'vimeo' => '', 
                'class' => ''
			 ), $atts
		 );

		$video_classes = array();

		if ( $atts['widescreen'] == 'true' ) { $video_classes[] = 'widescreen'; } 
		if ( $atts['vimeo'] == 'true' ) { $video_classes[] = 'vimeo'; } 
		if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } else { $class = ''; }

		if ( is_array( $video_classes ) ) { $video_classes = ' '. implode( " ", $video_classes ); }

		$html = '<div class="flex-video'.esc_html( $video_classes ).esc_html( $class ).'">';
		$html .= '<iframe width="'.absint( esc_html( $atts['width'] ) ).'" height="'.absint( esc_html( $atts['height'] ) ).'" src="'.esc_url( $atts['link'] ).'" frameborder="0" allowfullscreen></iframe>';		
		$html .= '<p class="fp-video-caption">'.do_shortcode( $atts['content'] ).'</p>';
		$html .= '</div>';
	
        return $html;
	 }
 }

/**
 * Interchange Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.0.0
 */

class FP_Interchange { 
	
	public function __construct() { 
		add_shortcode( 'fp-interchange', array( $this, 'fp_interchange' ) );
	 }

	public function fp_interchange( $atts, $content ) { 
		
		global $fp_globals;

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : '', 
				'alt' => '',
				'small' => __( 'Embed Link for Small Screen', 'fp-foundation-assistant' ), 
				'medium' => __( 'Embed Link for Medium Screen', 'fp-foundation-assistant' ), 
				'large' => __( 'Embed Link for Large Screen', 'fp-foundation-assistant' ), 
                'class' => ''
			 ), $atts
		 );

		$html =  '';

		if ( !empty( $atts['class'] ) ) { 
			$html .= '<img class="'. esc_html( $atts['class'] ).'" alt="'. esc_html( $atts['alt'] ) .'" data-interchange="';
		} else {
			$html .= '<img alt="'. esc_html( $atts['alt'] ) .'" data-interchange="';
		}

		$html .= '[ '.esc_url( $atts['small'] ).', small],';		
		$html .= '[ '.esc_url( $atts['medium'] ).', medium],';	
		$html .= '[ '.esc_url( $atts['large'] ).', large]">';	
		$html .= do_shortcode( $atts['content'] );	
		
        return $html;
	 }

 }

/**
 * Label Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.0.0
 */

class FP_Label { 
	
	public function __construct() { 
		add_shortcode( 'fp-label', array( $this, 'fp_label' ) );
	 }

	public function fp_label( $atts, $content ) { 
		global $fp_globals;

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Label', 'fp-foundation-assistant' ), 
				'color' => '', 
				'id' =>'', 
                'class' => ''
			 ), $atts
		 );


		!empty( $atts['id'] ) ? $id = ' id='.$atts['id'].' ' : $id = '';

		$label_classes = array();

		if ( in_array( $atts['color'], array( 'primary', 'secondary', 'success', 'alert', 'warning' ), true ) ) { $label_classes[] = $atts['color'].' '; } 
		if ( !empty( $atts['class'] ) ) { $class = $atts['class'].' '; } else { $class = ''; }

		if ( is_array( $label_classes ) ) { $label_classes = implode( " ", $label_classes ); }

		$html = '<span'.esc_html( $id ).' class="'.esc_html( $label_classes ).esc_html( $class ).'label">';
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</span>';

        return $html;
	 }

 }

/**
 * Orbit Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.0.0
 */

class FP_Orbit { 
	
	public function __construct() { 
		add_shortcode( 'fp-orbits', array( $this, 'fp_orbits' ) );
		add_shortcode( 'fp-orbit', array( $this, 'fp_orbit' ) );
	 }

	public function fp_orbits( $atts, $content ) { 
		global $fp_globals;
		$content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Place here the shortcode tags for the single orbit slide.', 'fp-foundation-assistant' ), 
				'label' => __( 'orbit-label', 'fp-foundation-assistant' ), 
                'class' => ''
			 ), $atts
		 );

		if ( !empty( $atts['class'] ) ) { $class = ' ' . $atts['class']; } else { $class = ''; }	

		$fp_globals[ 'counter_orbit' ] = 0;
		$fp_globals[ 'orbit_container' ] = true;		

		$html = '<div class="orbit" role="region" aria-label="'.esc_html( $atts['label'] ).'" data-orbit>';
		$html .= '<button class="orbit-previous"><span class="show-for-sr">'.__( 'Previous Slide', 'fp-foundation-assistant' ).'</span> &#9664;&#xFE0E;</button>';
		$html .= '<button class="orbit-next"><span class="show-for-sr">'.__( 'Next Slide', 'fp-foundation-assistant' ).'</span> &#9654;&#xFE0E;</button>';
		$html .= '<ul class="orbit-container'.esc_html( $class ).'">';
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</ul>';
		
		$fp_globals[ 'counter_orbit' ] = 0;
		$fp_globals[ 'orbit_container' ]  = false;

		$html .= '<nav class="orbit-bullets">';
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</nav>';
		$html .= '</div>';

        return $html;		

	 }

	public function fp_orbit( $atts, $content = null ){ 
        global $fp_globals;
        $content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );

		$fp_globals[ 'counter_orbit' ]++;

		$atts = shortcode_atts( array( 
				'title' => __( 'Slide ', 'fp-foundation-assistant' ).$fp_globals[ 'orbit_container' ], 
                'open' =>'', 
                'content' => !empty( $content ) ? $content : __( 'Slide ', 'fp-foundation-assistant' ).$fp_globals[ 'orbit_container' ].__( ' Content', 'fp-foundation-assistant' ), 
                'class' => ''
			 ), $atts
		 );

		if ( !empty( $atts['class'] ) ) { $class = ' ' . $atts['class']; } else { $class = ''; }	
		
		if ( $fp_globals[ 'orbit_container' ] ){ 

			if ( $atts['open'] == 'true' ) { 
				$html = "<li class='orbit-slide ".esc_html( $fp_globals[ 'open_tab' ] ).esc_html( $class )."'>". do_shortcode( $atts['content'] )."</li>";
			} else { 
				$html = "<li class='orbit-slide".esc_html( $class )."'>". do_shortcode( $atts['content'] )."</li>";
			}	

		 } else { 

			if ( $atts['open'] == 'true' ) { 				
				$html = "<button class=".esc_html( $fp_globals[ 'open_tab' ] )." data-slide=".absint( esc_html( $fp_globals[ 'counter_orbit' ] ) ).">";
				$html .= "<span class='show-for-sr'>".esc_html( $atts['title'] )."</span><span class='show-for-sr'>".__( 'Current Slide', 'fp-foundation-assistant' )."</span></button>";
			} else { 
				$html = "<button data-slide=".absint( esc_html( $fp_globals[ 'counter_orbit' ] ) ).">";
				$html .= "<span class='show-for-sr'>".esc_html( $atts['title'] )."</span></button>";				
			}	
		}
		
        return $html;
    }
}

/**
 * Progress Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.0.0
 */

class FP_Progress { 
	
	public function __construct() { 
		add_shortcode( 'fp-progress', array( $this, 'fp_progress' ) );
	 }

	public function fp_progress( $atts, $content ) { 
		global $fp_globals;

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : '', 
				'color' => '', 
				'current' => 0, 
				'max' => 100, 
				'min' => 0, 
				'text' =>'', 
				'aria_text' =>'', 
				'width' => 50, 
				// 'progress' =>'', 
                'class' => ''
			 ), $atts
		 );


		!empty( $atts['aria_text'] ) ? $aria_text= ' aria-valuetext="'.$atts['aria_text'].'"' : $aria_text = '';
		!empty( $atts['text'] ) ? $text = $atts['text'] : $text = ''; 

		$progress_classes = array();

		if ( in_array( $atts['color'], array( 'primary', 'secondary', 'success', 'alert', 'warning' ), true ) ) { $progress_classes[] = $atts['color'].' '; } 
		if ( !empty( $atts['class'] ) ) { $class = $atts['class'].' '; } else { $class = ''; }		

		if ( is_array( $progress_classes ) ) { $progress_classes = implode( " ", $progress_classes ); }	

		$html = '<div class="'.esc_html( $progress_classes ).esc_html( $class ).'progress" role="progressbar" tabindex="0" aria-valuenow="'.intval( esc_html( $atts['current'] ) ).'" aria-valuemin="'.intval( esc_html( $atts['min'] ) ).'" aria-valuemax="'.intval( esc_html( $atts['max'] ) ).'"'.esc_html( $aria_text ).'>';
		$html .= '<div class="progress-meter" style="width:'.intval( esc_html( $atts['width'] ) ).'%">';
		$html .=  "<p class='progress-meter-text'>".esc_html( $text )."</p>";
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</div></div>';

        return $html;
	 }

 }

/**
 * Reveal Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.0.0
 */

class FP_Reveal { 
	
	public function __construct() { 
		add_shortcode( 'fp-reveal', array( $this, 'fp_reveal' ) );
	 }

	public function fp_reveal( $atts, $content ) { 

		global $fp_globals;
		$fp_globals[ 'counter_dropdown' ]++;
		$fp_globals[ 'reveal_id' ] = 'reveal_id_'.uniqid().'_'.$fp_globals[ 'counter_dropdown' ];

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : '', 
				'size' =>'', 
				'overlay' => '', 
				'title' => __( 'Click here for a modal', 'fp-foundation-assistant' ), 
				'id' =>$fp_globals[ 'reveal_id' ], 
                'class' => ''
			), $atts
		);
		
		if ( in_array( $atts['size'], array( 'tiny', 'small', 'large', 'full' ), true ) ) { $size = $atts['size'].' '; } else { $size = ''; }
		if ( !empty( $atts['title'] ) ) { $title = $atts['title']; } else { $title = __( 'Click here for a modal', 'fp-foundation-assistant' ); }
		if ( $atts['overlay'] == 'false' ) { $overlay = ' data-overlay=false'; } else { $overlay = ''; }
		if ( !empty( $atts['class'] ) ) { $class = $atts['class'].' '; } else { $class = ''; }	

		$html = '<div class="'.esc_html( $size ).esc_html( $class ).'reveal" id="'.esc_html( $atts['id'] ).'" data-reveal'.esc_html( $overlay ).'>';
		$html .=  do_shortcode( $atts['content'] );
		$html .= '<button class="close-button" data-close aria-label="'.__( 'Close modal', 'fp-foundation-assistant' ).'" type="button"><span aria-hidden="true">&times;</span></button></div>';
		$html .= '<a class="fp-reveal-link" data-open="'.esc_html( $atts['id'] ).'">'.esc_html( $title ).'</a>';

        return $html;
	}

}

/**
 * Tooltip Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.0.0
 */

class FP_Tooltip { 
	
	public function __construct() { 
		add_shortcode( 'fp-tooltip', array( $this, 'fp_tooltip' ) );
	 }

	public function fp_tooltip( $atts, $content ) { 

		global $fp_globals;

		$fp_globals[ 'counter_tips' ]++;

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Place Content Here', 'fp-foundation-assistant' ), 				
				'title' =>__( 'Place the description text here.', 'fp-foundation-assistant' ), 
				'position'=>'', 
				'hover'=>'', 
                'class' => ''
			 ), $atts
		 );

		$tooltip_classes = array();

		if ( in_array( $atts['position'], array( 'top', 'right', 'left' ), true ) ) { $tooltip_classes[] = ' '.$atts['position']; } 
		if ( !empty( $atts['title'] ) ) { $title = $atts['title']; } else { $title = __( 'Place the description text here.', 'fp-foundation-assistant' ); }
		if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } else { $class = ''; }

		if ( is_array( $tooltip_classes ) ) { $tooltip_classes = implode( " ", $tooltip_classes ); }

		if( $atts['hover'] =='true' ) { 
			$html = '<span data-tooltip aria-haspopup="true" class="has-tip'.esc_html( $tooltip_classes ).esc_html( $class ).'" data-disable-hover="false" tabindex="'.absint( esc_html( $fp_globals[ 'counter_tips' ] ) ).'" title="'.esc_html( $title ).'">';
		 } else { 
			$html = '<span data-tooltip aria-haspopup="true" class="has-tip'.esc_html( $tooltip_classes ).esc_html( $class ).'" data-disable-hover="true" tabindex="'.absint( esc_html( $fp_globals[ 'counter_tips' ] ) ).'" title="'.esc_html( $title ).'">';
		 }

		$html .=  do_shortcode( $atts['content'] );
		$html .= '</span>';

        return $html;
	 }

 }

/**
 * Visible Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.0.0
 */

class FP_Visible { 
	
	public function __construct() { 
		add_shortcode( 'fp-visible', array( $this, 'fp_visible' ) );
	 }

	public function fp_visible( $atts, $content ) { 

		global $fp_globals;

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Place Content Here', 'fp-foundation-assistant' ), 	
				'show_small_only' => '', 
				'hide_small_only' => '', 
				'show_medium' => '', 
				'show_medium_only' => '', 
				'hide_medium' => '', 
				'hide_medium_only' => '',    
				'show_large' => '', 
				'show_large_only' => '', 
				'hide_large' => '', 
				'hide_large_only' => '', 
				'show_xlarge' => '', 
				'hide_xlarge' => '', 
				'show_xlarge_only' => '', 
				'hide_xlarge_only' => '', 
				'show_xxlarge' => '', 
				'hide_xxlarge' => '', 
				'show_landscape' => '', 
				'hide_landscape' => '', 
				'show_portrait' => '', 
				'hide_portrait' => '', 
				'show_sr' => '', 
                'class' => ''
			 ), $atts
		 );

		$visibility_class = array();


		if ( $atts['show_small_only']  == 'true' )  { $show_small_only  = 	array( 'size' => 'show_small_only', 	'class' => 'show-for-small-only' ); } else { $show_small_only = ''; }
		if ( $atts['hide_small_only']  == 'true' )  { $hide_small_only  = 	array( 'size' => 'hide_small_only', 	'class' => 'hide-for-small-only' ); } else { $hide_small_only = ''; }
		if ( $atts['show_medium']  	   == 'true' ) 	{ $show_medium      = 	array( 'size' => 'show_medium', 		'class' => 'show-for-medium' );     } else { $show_medium = ''; 	}
		if ( $atts['show_medium_only'] == 'true' ) 	{ $show_medium_only = 	array( 'size' => 'show_medium_only', 	'class' => 'show-for-medium-only' );} else { $show_medium_only = '';}
		if ( $atts['hide_medium']      == 'true' ) 	{ $hide_medium 		= 	array( 'size' => 'hide_medium', 		'class' => 'hide-for-medium' );     } else { $hide_medium = ''; 	}
		if ( $atts['hide_medium_only'] == 'true' ) 	{ $hide_medium_only = 	array( 'size' => 'hide_medium_only', 	'class' => 'hide-for-medium-only' );} else { $hide_medium_only = '';}  
		if ( $atts['show_large'] 	   == 'true' ) 	{ $show_large 		= 	array( 'size' => 'show_large', 			'class' => 'show-for-large' );      } else { $show_large = ''; 		} 
		if ( $atts['show_large_only']  == 'true' )  { $show_large_only  = 	array( 'size' => 'show_large_only', 	'class' => 'show-for-large-only' ); } else { $show_large_only = ''; }   
		if ( $atts['hide_large'] 	   == 'true' ) 	{ $hide_large 		=	array( 'size' => 'hide_large', 			'class' => 'hide-for-large' );      } else { $hide_large = ''; 		}  
		if ( $atts['hide_large_only']  == 'true' )  { $hide_large_only  =	array( 'size' => 'hide_large_only', 	'class' => 'hide-for-large-only' ); } else { $hide_large_only = ''; }
		if ( $atts['show_xlarge'] 	   == 'true' ) 	{ $show_xlarge 		=	array( 'size' => 'show_large', 			'class' => 'show-for-large' );      } else { $show_xlarge = ''; 	}
		if ( $atts['show_xlarge_only'] == 'true' ) 	{ $show_xlarge_only =	array( 'size' => 'show_large_only', 	'class' => 'show-for-large-only' ); } else { $show_xlarge_only = '';}
		if ( $atts['hide_xlarge'] 	   == 'true' ) 	{ $hide_xlarge 		=	array( 'size' => 'hide_large', 			'class' => 'hide-for-large' );      } else { $hide_xlarge = ''; 	}
		if ( $atts['hide_xlarge_only'] == 'true' ) 	{ $hide_xlarge_only =	array( 'size' => 'hide_large_only', 	'class' => 'hide-for-large-only' ); } else { $hide_xlarge_only = '';}
		if ( $atts['show_xxlarge'] 	   == 'true' ) 	{ $show_xxlarge 	=	array( 'size' => 'show_large', 			'class' => 'show-for-large' );	    } else { $show_xxlarge = ''; 	}
		if ( $atts['hide_xxlarge'] 	   == 'true' ) 	{ $hide_xxlarge 	=	array( 'size' => 'hide_large', 			'class' => 'hide-for-large' ); 	    } else { $hide_xxlarge = ''; 	}
		if ( $atts['show_landscape']   == 'true' ) 	{ $show_landscape 	=	array( 'size' => 'show_landscape', 		'class' => 'show-for-landscape' );  } else { $show_landscape = '';  }
		if ( $atts['show_portrait']    == 'true' ) 	{ $show_portrait 	=	array( 'size' => 'show_portrait', 		'class' => 'show-for-portrait' );   } else { $show_portrait = ''; 	}
		if ( $atts['hide_landscape']   == 'true' ) 	{ $hide_landscape 	=	array( 'size' => 'hide_landscape', 		'class' => 'hide-for-landscape' );  } else { $hide_landscape = '';  }
		if ( $atts['hide_portrait']    == 'true' ) 	{ $hide_portrait 	=	array( 'size' => 'hide_portrait', 		'class' => 'hide-for-portrait' );   } else { $hide_portrait = ''; 	}	
		if ( $atts['show_sr']          == 'true' ) 	{ $show_sr 			=	array( 'size' => 'show_for_sr', 		'class' => 'show-for-sr' );  		} else { $show_sr = '';  }			

		$options = array( 
			$show_small_only, $hide_small_only, 									// Small Visibility Classes
			$show_medium, $show_medium_only, $hide_medium, $hide_medium_only, 		// Medium Visibility Classes
			$show_large, $show_large_only, $hide_large, $hide_large_only, 			// Large Visibility Classes
			$show_xlarge, $hide_xlarge, $show_xlarge_only, $hide_xlarge_only, 		// XLarge Visibility Classes
			$show_xxlarge, $hide_xxlarge, 											// XXLarge Visibility Classes
			$show_landscape, $hide_landscape, 										// Landscape Visibility Classes
			$show_portrait, $hide_portrait, 										// Portrait Visibility Classes
			$show_sr, 																// Accessibiltiy Classes
		 );

		foreach ( $options as $option ) { 
			if ( isset( $option[ 'class' ] ) ) { 
				$visibility_class[] = $option[ 'class' ];
			 }
		 }

		if ( is_array( $visibility_class ) ) { $visibility_class = implode( " ", $visibility_class ); } 
		if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } else { $class = ''; }	

		$html = '<div class="'.esc_html( $visibility_class ).esc_html( $class ).'">'.do_shortcode( $atts['content'] ).'</div>';
			
        return $html;
	 }

 }

/**
 * Float Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.0.0
 */

class FP_Float { 
	
	public function __construct() { 
		add_shortcode( 'fp-float', array( $this, 'fp_float' ) );
	 }

	public function fp_float( $atts, $content ) { 

		global $fp_globals;

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Place Content Here', 'fp-foundation-assistant' ), 	
				'float' => '', 
                'class' => ''			
			 ), $atts
		 );

		if ( in_array( $atts['float'], array( 'left', 'right', 'center' ), true ) ) { $float = 'float-'.$atts['float']; } else { $float = ''; }
		if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } else { $class = ''; }	

		$html = '<div class="'.esc_html( $float ).esc_html( $class ).'">'.do_shortcode( $atts['content'] ).'</div>';

        return $html;
	 }

 }

/**
 * Flex Grid Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.1.0
 */

class FP_Grid { 
	
	public function __construct() { 
		add_shortcode( 'fp-rows', array( $this, 'fp_rows' ) );
		add_shortcode( 'fp-columns', array( $this, 'fp_columns' ) );
	 }

	public function fp_rows( $atts, $content ) { 
		global $fp_globals;
		$content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Place here the shortcode tags for the column content.', 'fp-foundation-assistant' ), 
				'expanded' =>'', 
				'collapse' => '', 
				'horizontal_align' => '', 
				'vertical_align' => '', 
				'medium_unstack' => '', 
				'large_unstack' => '', 
				'small_collapse' => '', 
				'medium_collapse' => '', 
				'large_collapse' => '', 	
				'small_uncollapse' => '', 
				'medium_uncollapse' => '', 
				'large_uncollapse' => '', 					
				'small_up' => '', 
				'medium_up' => '', 
				'large_up' => '', 
				'equalizer' => '', 
				'row_equalizer' => '', 
				'image' => '',
                'class' => ''	
			 ), $atts
		 );
		
		if ( !empty( $atts['image'] ) && getimagesize( $atts['image'] ) != false ) { $background = $atts['image']; } else { $background = ''; }

		$fp_globals[ 'equalizer_watch' ] = '';
		if ( $atts['equalizer'] == 'true' ) { $equalizer = 'data-equalizer '; $fp_globals[ 'equalizer_watch' ] = 'data-equalizer-watch '; } else { $equalizer = ''; $fp_globals[ 'equalizer_watch' ] = ''; }

		$fp_globals[ 'row_equalizer_watch' ] = '';
		if ( $atts['row_equalizer'] == 'true' ) { $row_equalizer = ' data-equalizer data-equalize-by-row=true'; $fp_globals[ 'row_equalizer_watch' ] = 'data-equalizer-watch '; } else { $row_equalizer = ''; $fp_globals[ 'row_equalizer_watch' ] = ''; }

		if ( $atts['horizontal_align'] == 'right' ) { $horizontal_align = 'align-right '; } 
		elseif ( $atts['horizontal_align'] == 'left' ) { $horizontal_align = 'align-left '; } 
		elseif ( $atts['horizontal_align'] == 'center' ) { $horizontal_align = 'align-center '; } 
		elseif ( $atts['horizontal_align'] == 'justify' ) { $horizontal_align = 'align-justify '; } 
		elseif ( $atts['horizontal_align'] == 'spaced' ) { $horizontal_align = 'align-spaced '; }
		else { $horizontal_align = ''; } 

		if ( $atts['vertical_align'] == 'top' ) { $vertical_align = 'align-top '; } 
		elseif ( $atts['vertical_align'] == 'middle' ) { $vertical_align = 'align-middle '; } 
		elseif ( $atts['vertical_align'] == 'bottom' ) { $vertical_align = 'align-bottom '; } 
		elseif ( $atts['vertical_align'] == 'stretch' ) { $vertical_align = 'align-stretch '; } 
		else { $vertical_align = ''; } 

		( int ) $max = 12;
		( int ) $min = 1;

		$grid_class = array();	
		$bool_class = array();	

		$options = array( 
			array( 'size' => $atts['small_up'], 'class' => 'small-up-' ),  
			array( 'size' => $atts['medium_up'], 'class' => 'medium-up-' ),  
			array( 'size' => $atts['large_up'], 'class' => 'large-up-' ), 
		 );

		foreach ( $options as $option ) { 

			if ( ( !is_numeric( $option[ 'size' ] ) ) ||( $max < $option[ 'size' ] || $option[ 'size' ] < $min ) ) { $option[ 'size' ] = ''; }

			if ( $min <= $option[ 'size' ] && $option[ 'size' ] <= $max ) { 

				$grid_class[] = $option[ 'class' ].absint( esc_html( $option[ 'size' ] ) ).' ';
			 }
		 }

		if ( is_array( $grid_class ) ) { $grid_class = implode( " ", $grid_class ); } 

		$bool_options = array( 
			array( 'bool' => $atts['expanded'], 'class' => 'expanded ' ), 
			array( 'bool' => $atts['collapse'], 'class' => 'collapse ' ), 
			array( 'bool' => $atts['small_collapse'], 'class' => 'small-collapse ' ), 
			array( 'bool' => $atts['medium_collapse'], 'class' => 'medium-collapse ' ), 
			array( 'bool' => $atts['large_collapse'], 'class' => 'large-collapse ' ), 
			array( 'bool' => $atts['small_uncollapse'], 'class' => 'small-uncollapse ' ), 
			array( 'bool' => $atts['medium_uncollapse'], 'class' => 'medium-uncollapse ' ), 
			array( 'bool' => $atts['large_uncollapse'], 'class' => 'large-uncollapse ' ), 
			array( 'bool' => $atts['medium_unstack'], 'class' => 'medium-unstack ' ), 
			array( 'bool' => $atts['large_unstack'], 'class' => 'large-unstack ' ), 
		 );

		foreach ( $bool_options as $bool_option ) { 

			if ( $bool_option[ 'bool' ] == 'true' ) { $bool_class[] = $bool_option[ 'class' ]; } else { $bool_option[ 'bool' ] = ''; }
		}	

		if ( is_array( $bool_class ) ) { $bool_class = implode( " ", $bool_class ); }
		if ( !empty( $atts['class'] ) ) { $class = $atts['class'].' '; } else { $class = ''; }	

		if ($background) {
			$html = '<div class="'.esc_html( $grid_class ).esc_html( $bool_class ).esc_html( $horizontal_align ).esc_html( $vertical_align ).esc_html( $class ).'row" '.esc_html( $equalizer ).esc_html( $row_equalizer ).' style="background-image:url('.esc_url($background).');background-size:cover;">';
		} else {
			$html = '<div class="'.esc_html( $grid_class ).esc_html( $bool_class ).esc_html( $horizontal_align ).esc_html( $vertical_align ).esc_html( $class ).'row" '.esc_html( $equalizer ).esc_html( $row_equalizer ).'>';
		}
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</div>';

		$html = str_replace( array( '></p>', '<p><' ), array( '>', '<' ), $html );
		$html = str_replace( array( '<br />', '<br>' ), array( '', '' ), $html );

        return $html;		

	 }

	public function fp_columns( $atts, $content ){ 
        global $fp_globals;

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Place Content Here', 'fp-foundation-assistant' ), 
				'shrink' => '', 	
				'medium_expand' => '', 
				'large_expand' => '', 
				'vertical_align' => '', 
				'small' => '', 			
				'medium' =>'', 
				'large'=>'', 
				'small_offset' => '', 
				'medium_offset' => '', 
				'large_offset' => '', 	
				'small_order' => '', 
				'medium_order' => '', 
				'large_order' => '', 
                'class' => '', 

                // Not Supported in F6 Flex; Included to support compatibility between the versions;
				'column' => '', 				
				'offset' => '', 				
			 ), $atts
		 );

		if ( $atts['vertical_align'] == 'top' ) { $vertical_align = 'align-self-top '; } 
		elseif ( $atts['vertical_align'] == 'middle' ) { $vertical_align = 'align-self-middle '; } 
		elseif ( $atts['vertical_align'] == 'bottom' ) { $vertical_align = 'align-self-bottom '; } 
		elseif ( $atts['vertical_align'] == 'stretch' ) { $vertical_align = 'align-self-stretch '; } 
		else { $vertical_align = ''; } 

		( int ) $max = 12;
		( int ) $min = 1;

		$grid_class = array();		
		$bool_class = array();		

		$options = array( 

			array( 'size' => $atts['small'], 'class' => 'small-' ), 
			array( 'size' => $atts['small_offset'], 'class' => 'small-offset-' ), 
			array( 'size' => $atts['small_order'], 'class' => 'small-order-' ), 
			array( 'size' => $atts['medium'], 'class' => 'medium-' ), 
			array( 'size' => $atts['medium_offset'], 'class' => 'medium-offset-' ), 
			array( 'size' => $atts['medium_order'], 'class' => 'medium-order-' ), 
			array( 'size' => $atts['large'], 'class' => 'large-' ), 
			array( 'size' => $atts['large_offset'], 'class' => 'large-offset-' ), 
			array( 'size' => $atts['large_order'], 'class' => 'large-order-' ), 

			// Not Supported in F6 Flex; Included to support compatibility between the versions;
			array( 'size' => $atts['column'], 'class' => 'large-' ), 
			array( 'size' => $atts['offset'], 'class' => 'large-offset-' ), 
		 );

		foreach ( $options as $option ) { 

			if ( ( !is_numeric( $option[ 'size' ] ) ) ||( $max < $option[ 'size' ] || $option[ 'size' ] < $min ) ) { $option[ 'size' ] = ''; }

			if ( $min <= $option[ 'size' ] && $option[ 'size' ] <= $max ) { 

				$grid_class[] = $option[ 'class' ].absint( esc_html( $option[ 'size' ] ) ).' ';
			 }
		 }

		if ( is_array( $grid_class ) ) { $grid_class = implode( " ", $grid_class ); } 

		$bool_options = array( 
			array( 'bool' => $atts['shrink'], 'class' => 'shrink ' ), 
			array( 'bool' => $atts['medium_expand'], 'class' => 'medium-expand ' ), 
			array( 'bool' => $atts['large_expand'], 'class' => 'large-expand ' )
		 );

		foreach ( $bool_options as $bool_option ) { 

			if ( $bool_option[ 'bool' ] == 'true' ) { $bool_class[] = $bool_option[ 'class' ]; } else { $bool_option[ 'bool' ] = ''; }
		}	

		if ( is_array( $bool_class ) ) { $bool_class = implode( " ", $bool_class ); }
		if ( !empty( $atts['class'] ) ) { $class = $atts['class'].' '; } else { $class = ''; }	

		$html = '<div class="'.esc_html( $bool_class ).esc_html( $grid_class ).esc_html( $vertical_align ).esc_html( $class ).'columns" '.esc_html( $fp_globals[ 'equalizer_watch' ] ).esc_html( $fp_globals[ 'row_equalizer_watch' ] ).'>';
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</div>';
	
        return $html;

    }

 }


/**
 * Carousel Shortcode
 * @since FP Foundation Assistant 1.0.0
 * @version 1.1.0
 */

class FP_Carousel { 
	
	public function __construct() { 
		add_shortcode( 'fp-carousel', array( $this, 'fp_carousel' ) );
		add_shortcode( 'fp-carousel-item', array( $this, 'fp_carousel_item' ) );
	 }

	public function fp_carousel( $atts, $content ) { 

		global $fp_globals;
		$content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );
		$fp_globals[ 'owl_id' ] = 'owl_id_'.uniqid();

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : '', 
				'columns' =>'', 
				'id' =>$fp_globals[ 'owl_id' ], 
                'class' => ''
			 ), $atts
		 );

		if ( $atts['columns'] =='one' ) { $columns = ' one-column'; } 
		elseif ( $atts['columns'] =='two' ) { $columns = ' two-columns'; } 
		elseif ( $atts['columns'] =='four' ) { $columns = ' four-columns'; } 
		elseif ( $atts['columns'] =='five' ) { $columns = ' five-columns'; } 
		elseif ( $atts['columns'] =='six' ) { $columns = ' six-columns'; } 
		else { $columns = ' three-columns'; } 

		if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } else { $class = ''; }

		$html = '<div id="'.esc_html( $atts['id'] ).'" class="owl-carousel'.esc_html( $columns ).esc_html( $class ).'">';
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</div>';

        return $html;
        $fp_globals[ 'owl_id' ] = 'owl_id_'.uniqid();
	 }

	public function fp_carousel_item( $atts, $content ) { 

		global $fp_globals;
		$content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : '', 
				'image' =>'', 
				'title' => '', 
				'style' => '', 
                'class' => '',
                'alt' => '',
			 ), $atts
		 );

		if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } else { $class = ''; }
		if ( $atts['style'] =='two' ) { $style = 'box-layout-two'; } elseif ( $atts['style'] =='three' ) { $style = 'box-layout-three'; } else { $style = 'box-layout-one'; } 		
		if ( !empty( $atts['alt'] ) ) { $alt = $atts['alt']; } else { $alt = 'image'; }

		$html = '<div><div class="'.esc_html( $style ).esc_html( $class ).'">';

		if ( !empty( $atts['image'] ) ) { $html .= '<div class="box-image"><img src="'.esc_html( $atts['image'] ).'" alt='.esc_html( $alt ).'></div>'; }
		if ( !empty( $atts['title'] ) ) { $html .= '<div class="box-title">'.esc_html( $atts['title'] ).'</div>'; }

		$html .= '<div class="box-text">';
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</div></div></div>';
        return $html;
	 }

 }



/**
 * Posts Query Shortcode
 * @since FP Foundation Assistant 1.1.0
 * @version 1.1.0
 */

class FP_Posts_Query {

	public $p;								// Single parameter array from the wp_query paramters array
	public $args;							// Arguments accepted by the query
	public $atts;							// Shortcode Attributes
	public $parameters;						// WP_Query parameters
	public $fp_post_query; 					// Loop query
	public $query_relation;					// Query relation value

	public $value_arr;						// Exploded variables of the values filled in the shortcode
	public $value_arr_str;					// String values from $value_arr cast into a string array
	public $value_arr_int;					// Integer values from $value_arr cast into an int array	
		
	public $tax_query_arr;					// Tax query array
	public $tax_query_relation_arr;			// Second array in the tax query (in case we use relation)
	public $tax_query_type;					// Type of value accepted by the tax query terms parameter (int or string)
	public $tax_query_relation_type;		// Type of value accepted by the tax query terms parameter for the second array (int or string)

	public $date_query_arr;					// Date query array
	public $date_query_relation_arr;		// Second array in the date query (in case we use relation)
	public $date_query_type;				// Type of value accepted by the date query terms parameter (int or string)
	public $date_query_relation_type;		// Type of value accepted by the date query terms parameter for the second array (int or string)
	public $after_query_empty;				// Checks whether data_query_after is empty
	public $before_query_empty;				// Checks whether data_query_before is empty
	public $after_query_relation_empty;		// Checks whether data_query_relation_after is empty
	public $before_query_relation_empty;	// Checks whether data_query_relation_before is empty

	public $meta_query_arr;					// Meta query array
	public $meta_query_relation_arr;		// Second array in the meta query (in case we use relation)
	public $meta_query_type;				// Type of value accepted by the meta query terms parameter (int or string)
	public $meta_query_relation_type;		// Type of value accepted by the meta query terms parameter for the second array (int or string)
	public $meta_query_value;				// Checks whether the parameter meta_query_value is an array or a string


	public function __construct() { 
		add_shortcode( 'fp-posts', array( $this, 'fp_posts' ) );
	}


	/**
	 * Initialise the post query shortcode
	 * @since  1.1.0
	 * @version 1.1.0
	 */

	public function fp_posts( $atts ) {

		global $fp_globals;

		//Set Defaults

		$atts = shortcode_atts( array( 
				'medium' =>'', 
				'large' =>'', 
				'column' => '',
				'columns' => '',
				'style' => '',
				'screen' => '', 
				'display_title' => 'true', 
				'display_date' => 'true', 
				'display_cat' => 'true', 
				'display_tags' => 'true', 
				'display_author' => 'true', 
				'display_excerpt' => 'true', 
				'display_thumb' => 'true', 
				'display_comments' => 'true', 
                'class' => '',
 
                // WP_QUERY PARAMETERS

                // Author Parameters
                'author' => '', 
                'author_name' => '', 
                'author__in' => '', 
                'author__not_in' => '', 

                // Category Parameters
				'cat' => '', 
				'category_name' => '', 
				'category__and' => '', 
				'category__in' => '', 
				'category__not_in' => '', 

                // Tag Parameters
				'tag' => '', 
				'tag_id' => '', 
				'tag__and' => '', 
				'tag__in' => '', 
				'tag__not_in' => '', 
				'tag_slug__and' => '', 
				'tag_slug__in' => '', 

                // Taxonomy Parameters
				'tax_query_taxonomy' => '', 
				'tax_query_field' => '', 
				'tax_query_terms' => '', 
				'tax_query_include_children' => '', 
				'tax_query_operator' => '',
				'tax_query_relation' => '', 
				'tax_query_relation_taxonomy' => '', 
				'tax_query_relation_field' => '', 
				'tax_query_relation_terms' => '', 
				'tax_query_relation_include_children' => '', 
				'tax_query_relation_operator' => '',

				// Search Parameter
				's' => '', 

                // Post & Page Parameters
				'p' => '', 
				'name' => '', 
				'title' => '',
				'page_id' => '', 
				'pagename' => '', 
				'post_parent' => '', 
				'post_parent__in' => '', 
				'post_parent__not_in' => '', 
				'post__in' => '', 
				'post__not_in' => '', 
				'post_name__in' => '',

                // Password Parameters
				'has_password' => '', 
				'post_password' => '',

                // Type Parameters
				'post_type' => '', 

                // Status Parameters
				'post_status' => '', 

                // Pagination Parameters
				'nopaging' => '', 
				'posts_per_page' => '', 
				'posts_per_archive_page' => '', 
				'offset' => '', 
				'paged' => '', 
				'page' => '', 
				'ignore_sticky_posts' => '', 

                // Order & Orderby Parameters
				'order' => '', 
				'orderby' => '', 

                // Date Parameters
				'year' => '', 
				'monthnum' => '', 
				'w' => '', 
				'day' => '', 
				'hour' => '', 
				'minute' => '', 
				'second' => '', 
				'm' => '', 
				'date_query_year' => '', 
				'date_query_month' => '', 
				'date_query_week' => '', 	
				'date_query_day' => '', 
				'date_query_hour' => '', 
				'date_query_minute' => '', 
				'date_query_second' => '', 
				'date_query_after' => '', 
				'date_query_after_year' => '', 
				'date_query_after_month' => '', 
				'date_query_after_day' => '', 	
				'date_query_before' => '', 			
				'date_query_before_year' => '', 
				'date_query_before_month' => '', 
				'date_query_before_day' => '',  
				'date_query_inclusive' => '', 
				'date_query_compare' => '', 
				'date_query_column' => '', 
				'date_query_relation' => '',
				'date_query_relation_year' => '', 
				'date_query_relation_month' => '', 
				'date_query_relation_week' => '', 	
				'date_query_relation_day' => '', 
				'date_query_relation_hour' => '', 
				'date_query_relation_minute' => '', 
				'date_query_relation_second' => '', 
				'date_query_relation_after' => '', 
				'date_query_relation_after_year' => '', 
				'date_query_relation_after_month' => '', 
				'date_query_relation_after_day' => '', 	
				'date_query_relation_before' => '', 			
				'date_query_relation_before_year' => '', 
				'date_query_relation_before_month' => '', 
				'date_query_relation_before_day' => '',  
				'date_query_relation_inclusive' => '', 
				'date_query_relation_compare' => '', 
				'date_query_relation_column' => '', 

                // Custom Field Parameters
				'meta_key' => '', 
				'meta_value' => '', 
				'meta_value_num' => '', 
				'meta_compare' => '',
				'meta_query_key' => '', 
				'meta_query_value' => '', 
				'meta_query_compare' => '', 
				'meta_query_type' => '',  
				'meta_query_relation' => '', 
				'meta_query_relation_key' => '', 
				'meta_query_relation_value' => '', 
				'meta_query_relation_compare' => '', 
				'meta_query_relation_type' => '', 

                // Permission Parameters
				'perm' => '', 
				'post_mime_type' => '', 
				'cache_results' => '', 

                // Mime Type Parameters
				'update_post_meta_cache' => '', 
				'update_post_term_cache' => '', 

				// Return Fields Parameter
				'fields' => '', 

			 ), $atts
		 );

		$this->atts = $atts;


		// WP_Query Filter 
		$this->queryMain();


		// Define grid size for the queried posts
		( int ) $max = 12;
		( int ) $min = 1;

		$grid_class = array();		

		$options = array( 

			array( 'size' => $atts['medium'], 'class' => 'medium-' ),  
			array( 'size' => $atts['large'], 'class' => 'large-' ), 

			// Not Supported in F6; Included to support compatibility between the versions;
			array( 'size' => $atts['column'], 'class' => 'large-' ), 
		 );


		foreach ( $options as $option ) { 

			if ( ( !is_numeric( $option[ 'size' ] ) ) ||( $max < $option[ 'size' ] || $option[ 'size' ] < $min ) ) { $option[ 'size' ] = ''; }

			if ( $min <= $option[ 'size' ] && $option[ 'size' ] <= $max ) { 

				$grid_class[] = $option[ 'class' ].absint( esc_html( $option[ 'size' ] ) ).' ';
			 }
		 }

		if ( is_array( $grid_class ) ) { $grid_class = implode( " ", $grid_class ); } 
		
		if ( !empty( $atts['class'] ) ) { $class = ' '. $atts['class']; } else { $class = ' fp-custom-class'; }
		if ( $atts['screen'] == 'expanded' ) { $screen = ' ' . $atts['screen']; } else { $screen = ''; } 	


		// DISPLAY OPTIONS

		// Standard Grid Display
		if ( empty( $atts['style'] ) || ( $atts['style'] == 'standard' ) ) {

			$count = $this->fp_post_query->post_count;
        	$i = 0;

        	// The Loop
			if ( $this->fp_post_query->have_posts() ) :

				$html = "<div class='".esc_html($class)."'><div class='row fp-post-item".esc_html($screen)."'>";

			while ( $this->fp_post_query->have_posts() ) : $this->fp_post_query->the_post();
				
				$i++;

				if ( $i === $count ) { $end = ' end'; } else { $end = ''; }

				$html .= '<div class="columns small-12 '.esc_html( $grid_class ).esc_html( $end ).'">';

				$html .= "<article class='". implode( " ", get_post_class() )."'>";

				if ( $atts['display_thumb'] == 'true' ) { $html .= '<div class="blog-image-container"><a href="'.get_the_permalink().'">'.get_the_post_thumbnail().'</a></div>'; }
				if ( $atts['display_cat'] == 'true' ) { $html .= '<div class="post-cateogry-wrap">'.get_the_category_list().'</div>'; }	

				$html .= '<div class="blog-post-content">';
					if ( $atts['display_title'] == 'true' ) { $html .= '<h4 class="entry-title"><a href="'.get_the_permalink().'">'.get_the_title().'</a></h4>'; }	
					if ( $atts['display_date'] == 'true' ) { $html .= '<div class="blog-post-date">'.get_the_date( get_option( 'date_format' ) ).'</div>'; }	
					if ( $atts['display_author'] == 'true' ) { $html .= '<div class="blog-post-author"><a href='.get_the_author_link().'>'.get_the_author().'</a></div>'; }
					if ( $atts['display_comments'] == 'true' ) { $html .= '<div class="blog-post-comments">'.get_comments_number().' Comments</div>'; }
					if ( $atts['display_excerpt'] == 'true' ) { $html .= '<div class="blog-post-excerpt">'.get_the_excerpt().'</div>'; }
					if ( $atts['display_tags'] == 'true' ) { $html .= '<div class="blog-post-tags">'.get_the_tag_list('<ul><li>','</li><li>','</li></ul>').'</div>'; }
				$html .= '</div>';

				$html .= '</article></div>';
				
			endwhile;

				$html .= "</div></div>";

				wp_reset_postdata();
				wp_reset_query();

			else :
				$html =  _e( 'Sorry, no posts matched your criteria.' ); 		
			endif;	

		
		// Carousel Display	
		} elseif ( $atts['style'] == 'carousel' ) {

			$fp_globals[ 'owl_id' ] = 'owl_id_'.uniqid();

			if ( $atts['columns'] =='one' ) { $columns = ' one-column'; } 
			elseif ( $atts['columns'] =='two' ) { $columns = ' two-columns'; } 
			elseif ( $atts['columns'] =='four' ) { $columns = ' four-columns'; } 
			elseif ( $atts['columns'] =='five' ) { $columns = ' five-columns'; } 
			elseif ( $atts['columns'] =='six' ) { $columns = ' six-columns'; } 
			elseif ( $atts['columns'] =='center' ) { $columns = ' full-blog-column'; }
			else { $columns = ' three-columns'; } 
	        
			// The Loop
			if ( $this->fp_post_query->have_posts() ) :

			
			$html = "<div class='" . esc_html( $class ) . "'><div id=" . esc_html( $fp_globals[ 'owl_id' ] ) ." class='owl-carousel".esc_html( $columns ) . "'>";

			while ( $this->fp_post_query->have_posts() ) : $this->fp_post_query->the_post();

				$html .= '<div class="fp-post-carousel-item item">';

				$html .= "<article class='". implode( " ", get_post_class() )."'>";

				if ( $atts['display_thumb'] == 'true' ) { $html .= '<div class="blog-image-container"><a href="'.get_the_permalink().'">'.get_the_post_thumbnail().'</a></div>'; }
				if ( $atts['display_cat'] == 'true' ) { $html .= '<div class="post-cateogry-wrap">'.get_the_category_list().'</div>'; }	

				$html .= '<div class="blog-post-content">';
					if ( $atts['display_title'] == 'true' ) { $html .= '<h4 class="entry-title"><a href="'.get_the_permalink().'">'.get_the_title().'</a></h4>'; }	
					if ( $atts['display_date'] == 'true' ) { $html .= '<div class="blog-post-date">'.get_the_date( get_option( 'date_format' ) ).'</div>'; }	
					if ( $atts['display_author'] == 'true' ) { $html .= '<div class="blog-post-author"><a href='.get_the_author_link().'>'.get_the_author().'</a></div>'; }
					if ( $atts['display_comments'] == 'true' ) { $html .= '<div class="blog-post-comments">'.get_comments_number().' Comments</div>'; }
					if ( $atts['display_excerpt'] == 'true' ) { $html .= '<div class="blog-post-excerpt">'.get_the_excerpt().'</div>'; }
					if ( $atts['display_tags'] == 'true' ) { $html .= '<div class="blog-post-tags">'.get_the_tag_list('<ul><li>','</li><li>','</li></ul>').'</div>'; }
				$html .= '</div>';

				$html .= '</article></div>';

			endwhile;

				$html .= '</div></div>';

				wp_reset_postdata();
				wp_reset_query();

			else :
				$html = _e( 'Sorry, no posts matched your criteria.' ); 		
			endif;	

		} 

		return $html;

        $fp_globals[ 'owl_id' ] = 'owl_id_'.uniqid();	
	}

	/**
	 * Main WP_Query
	 * @since  1.1.0
	 * @version 1.1.0
	 */

	private function queryMain() {

		// WP_Query Parameters
		$this->parameters = array(
			array( 'att' => 'author', 								'name' => 'author', 				'q' => 'main_query', 	'arr' => false,		'arg_arr' => false,  	'int' => true,		'string' => false,	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'author_name', 							'name' => 'author_name', 			'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false,		'string' => true,	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'author__in', 							'name' => 'author__in', 			'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => true, 		'string' => false,	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'author__not_in', 						'name' => 'author__not_in',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => true, 		'string' => false,	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'cat', 									'name' => 'cat',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false,	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'category_name', 						'name' => 'category_name',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false,		'string' => true,	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'category__and', 						'name' => 'category__and',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => true,		'string' => false,	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'category__in', 						'name' => 'category__in',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'category__not_in', 					'name' => 'category__not_in',		'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'tag', 									'name' => 'tag',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'tag_id', 								'name' => 'tag_id',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'tag__and', 							'name' => 'tag__and',				'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'tag__in', 								'name' => 'tag__in',				'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'tag__not_in', 							'name' => 'tag__not_in',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'tag_slug__and', 						'name' => 'tag_slug__and',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'tag_slug__in', 						'name' => 'tag_slug__in',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'tax_query_taxonomy', 					'name' => 'taxonomy',				'q' => 'tax_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'tax_query_field', 						'name' => 'field',					'q' => 'tax_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'tax_query_terms', 						'name' => 'terms',					'q' => 'tax_query', 	'arr' => true,		'arg_arr' => true, 		'int' => true, 		'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'tax_query_include_children', 			'name' => 'include_children',		'q' => 'tax_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => false, 	'bool' => true,  'parent' => '', 		 'period' => '' ),
			array( 'att' => 'tax_query_operator', 					'name' => 'operator',				'q' => 'tax_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'tax_query_relation', 					'name' => 'relation',				'q' => 'tax_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'tax_query_relation_taxonomy', 			'name' => 'taxonomy',				'q' => 'tax_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'tax_query_relation_field', 			'name' => 'field',					'q' => 'tax_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'tax_query_relation_terms', 			'name' => 'terms',					'q' => 'tax_query', 	'arr' => true,		'arg_arr' => true, 		'int' => true, 		'string' => true, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'tax_query_relation_include_children', 	'name' => 'include_children',		'q' => 'tax_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => false, 	'bool' => true,  'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'tax_query_relation_operator', 			'name' => 'operator',				'q' => 'tax_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 's', 									'name' => 's',						'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'p', 									'name' => 'p',						'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'name', 								'name' => 'name',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'title', 								'name' => 'title',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'page_id', 								'name' => 'page_id',				'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'pagename', 							'name' => 'pagename',				'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'post_parent', 							'name' => 'post_parent',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'post_parent__in', 						'name' => 'post_parent__in',		'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'post_parent__not_in', 					'name' => 'post_parent__not_in',	'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'post__in', 							'name' => 'post__in',				'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'post__not_in', 						'name' => 'post__not_in',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'post_name__in', 						'name' => 'post_name__in',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'has_password', 						'name' => 'has_password',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => false, 	'bool' => true,  'parent' => '', 		 'period' => '' ),
			array( 'att' => 'post_password', 						'name' => 'post_password',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'post_type', 							'name' => 'post_type',				'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'post_status', 							'name' => 'post_status',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => true, 		'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'nopaging', 							'name' => 'nopaging',				'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => false, 	'bool' => true,  'parent' => '', 		 'period' => '' ),
			array( 'att' => 'posts_per_page', 						'name' => 'posts_per_page',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'posts_per_archive_page', 				'name' => 'posts_per_archive_page',	'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'offset', 								'name' => 'offset',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'paged', 								'name' => 'paged',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'page', 								'name' => 'page',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'ignore_sticky_posts', 					'name' => 'ignore_sticky_posts',	'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => false, 	'bool' => true,  'parent' => '', 		 'period' => '' ),
			array( 'att' => 'order', 								'name' => 'order',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'orderby', 								'name' => 'orderby',				'q' => 'main_query', 	'arr' => false,		'arg_arr' => false,		'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'year', 								'name' => 'year',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'monthnum', 							'name' => 'monthnum',				'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'w', 									'name' => 'w',						'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'day', 									'name' => 'day',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'hour',									'name' => 'hour',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'minute', 								'name' => 'minute',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'second', 								'name' => 'second',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'm', 									'name' => 'm',						'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'year', 								'name' => 'year',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'month', 								'name' => 'month',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'week', 								'name' => 'week',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'day', 									'name' => 'day',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'hour', 								'name' => 'hour',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'minute', 								'name' => 'minute',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'second', 								'name' => 'second',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'date_query_year', 						'name' => 'year',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'date_query_month', 					'name' => 'month',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'date_query_week', 						'name' => 'week',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'date_query_day', 						'name' => 'day',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'date_query_hour', 						'name' => 'hour',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'date_query_minute ', 					'name' => 'minute ',				'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'date_query_second', 					'name' => 'second',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '',		 'period' => '' ),
			array( 'att' => 'date_query_after', 					'name' => 'after',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => true, 		'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'date_query_after_year', 				'name' => 'year',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => 'after' ),
			array( 'att' => 'date_query_after_month', 				'name' => 'month',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => 'after' ),
			array( 'att' => 'date_query_after_day', 				'name' => 'day',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => 'after' ),
			array( 'att' => 'date_query_before', 					'name' => 'before',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => true, 		'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'date_query_before_year', 				'name' => 'year',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => 'before' ),
			array( 'att' => 'date_query_before_month', 				'name' => 'month',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => 'before' ),
			array( 'att' => 'date_query_before_day', 				'name' => 'day',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => 'before' ),
			array( 'att' => 'date_query_inclusive',					'name' => 'inclusive',				'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => false, 	'bool' => true,  'parent' => '', 		 'period' => '' ),
			array( 'att' => 'date_query_compare',					'name' => 'compare',				'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'date_query_column',					'name' => 'column',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'date_query_relation',					'name' => 'relation',				'q' => 'date_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'date_query_relation_year', 			'name' => 'year',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'date_query_relation_month', 			'name' => 'month',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'date_query_relation_week', 			'name' => 'week',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'date_query_relation_day', 				'name' => 'day',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'date_query_relation_hour', 			'name' => 'hour',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'date_query_relation_minute ', 			'name' => 'minute ',				'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'date_query_relation_second', 			'name' => 'second',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'date_query_relation_after', 			'name' => 'after',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => true, 		'int' => false, 	'string' => true, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'date_query_relation_after_year', 		'name' => 'year',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => 'relation', 'period' => 'after' ),
			array( 'att' => 'date_query_relation_after_month', 		'name' => 'month',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => 'relation', 'period' => 'after' ),
			array( 'att' => 'date_query_relation_after_day', 		'name' => 'day',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => 'relation', 'period' => 'after' ),
			array( 'att' => 'date_query_relation_before', 			'name' => 'before',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => true, 		'int' => false, 	'string' => true, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'date_query_relation_before_year', 		'name' => 'year',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => 'relation', 'period' => 'before' ),
			array( 'att' => 'date_query_relation_before_month', 	'name' => 'month',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => 'relation', 'period' => 'before' ),
			array( 'att' => 'date_query_relation_before_day', 		'name' => 'day',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => 'relation', 'period' => 'before' ),
			array( 'att' => 'date_query_relation_inclusive',		'name' => 'inclusive',				'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => false, 	'bool' => true,  'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'date_query_relation_compare',			'name' => 'compare',				'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'date_query_relation_column',			'name' => 'column',					'q' => 'date_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => 'relation', 'period' => '' ),
			array( 'att' => 'meta_key',								'name' => 'meta_key',				'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'meta_value',							'name' => 'meta_value',				'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'meta_value_num',						'name' => 'meta_value_num',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => true, 		'string' => false, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'meta_compare',							'name' => 'meta_compare',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),		
			array( 'att' => 'meta_query_key',						'name' => 'key',					'q' => 'meta_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),			
			array( 'att' => 'meta_query_compare',					'name' => 'compare',				'q' => 'meta_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'meta_query_value',						'name' => 'value',					'q' => 'meta_query', 	'arr' => true,		'arg_arr' => true, 		'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'meta_query_type',						'name' => 'type',					'q' => 'meta_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'meta_query_relation',					'name' => 'relation',				'q' => 'meta_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'meta_query_relation_key',				'name' => 'key',					'q' => 'meta_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'meta_query_relation_value',			'name' => 'value',					'q' => 'meta_query', 	'arr' => true,		'arg_arr' => true, 		'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'meta_query_relation_compare',			'name' => 'compare',				'q' => 'meta_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'meta_query_relation_type',				'name' => 'type',					'q' => 'meta_query', 	'arr' => true,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'perm',									'name' => 'perm',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'post_mime_type',						'name' => 'post_mime_type',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
			array( 'att' => 'cache_results',						'name' => 'cache_results',			'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => false, 	'bool' => true,  'parent' => '', 		 'period' => '' ),
			array( 'att' => 'update_post_meta_cache',				'name' => 'update_post_meta_cache',	'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => false, 	'bool' => true,  'parent' => '', 		 'period' => '' ),
			array( 'att' => 'update_post_term_cache',				'name' => 'update_post_term_cache',	'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => false, 	'bool' => true,  'parent' => '', 		 'period' => '' ),
			array( 'att' => 'fields',								'name' => 'fields',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false, 	'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),		
		);

		//Set default relation value if empty
		if ( empty( $this->atts['tax_query_relation'] ) && ( 
				!empty( $this->atts['tax_query_relation_taxonomy'] ) || 
				!empty( $this->atts['tax_query_relation_field'] ) || 
				!empty( $this->atts['tax_query_relation_terms'] ) || 
				!empty( $this->atts['tax_query_relation_include_children'] ) || 
				!empty( $this->atts['tax_query_relation_operator'] ) 
			) ) { 

			$this->atts['tax_query_relation'] = 'AND'; 
		}

		if ( empty( $this->atts['date_query_relation'] ) && ( 
				!empty( $this->atts['date_query_relation_year'] ) || 
				!empty( $this->atts['date_query_relation_month'] ) || 
				!empty( $this->atts['date_query_relation_week'] ) || 
				!empty( $this->atts['date_query_relation_day'] ) || 
				!empty( $this->atts['date_query_relation_hour'] ) || 
				!empty( $this->atts['date_query_relation_minute'] ) || 
				!empty( $this->atts['date_query_relation_second'] ) || 
				!empty( $this->atts['date_query_relation_after'] ) || 
				!empty( $this->atts['date_query_relation_after_year'] ) || 
				!empty( $this->atts['date_query_relation_after_month'] ) || 
				!empty( $this->atts['date_query_relation_after_day'] ) || 
				!empty( $this->atts['date_query_relation_before'] ) || 
				!empty( $this->atts['date_query_relation_before_year'] ) || 
				!empty( $this->atts['date_query_relation_before_month'] ) || 
				!empty( $this->atts['date_query_relation_before_day'] ) || 
				!empty( $this->atts['date_query_relation_inclusive'] ) || 
				!empty( $this->atts['date_query_relation_compare'] ) || 
				!empty( $this->atts['date_query_relation_column'] ) 
			) ) { 

			$this->atts['date_query_relation'] = 'AND'; 
		}

		if ( empty( $this->atts['meta_query_relation'] ) && (
				!empty($this->atts['meta_query_relation_key'] ) ||
				!empty($this->atts['meta_query_relation_value'] ) ||
				!empty($this->atts['meta_query_relation_compare'] ) ||
				!empty($this->atts['meta_query_relation_type'] )				
			) ) {

			$this->atts['meta_query_relation'] = 'AND'; 
		}



		foreach ($this->parameters as $this->p) {

			// Assign value from a shortcode attribute to the corresponding WP_Query parameter
			if ( !empty($this->atts[ $this->p['att'] ] ) ) { $this->p['value'] = html_entity_decode($this->atts[ $this->p['att'] ]); }	

			// Filter only paramters that have been filled in the shortcode
			if ( !empty($this->p['value'] ) ) {

				// Define array values as int or string depending on the parameter
				$this->value_arr = explode(',',$this->p['value']);
				if ( isset( $this->value_arr ) && ( $this->p['arg_arr'] === true ) && ( $this->p['string'] === true ) && ( $this->p['int'] === false ) && ( $this->p['bool'] === false ) ) { 
					$this->value_arr_str = array_map('strval', $this->value_arr); 
				}
				if ( isset( $this->value_arr ) && ( $this->p['arg_arr'] === true ) && ( $this->p['string'] === false ) && ( $this->p['int'] === true ) && ( $this->p['bool'] === false ) ) {
				 $this->value_arr_int = array_map('intval', $this->value_arr); 
				}
				
				if ( $this->p['q'] == 'main_query' ) {

					// Filter parameters from the main query that accept strings
					if ( !$this->p['arg_arr'] ) {

						// Filter parameters from the main query with single values
						if ( count( $this->value_arr ) === 1 ) {

							if ( $this->p['int'] ) {
								$this->args[$this->p['name']] = (int) $this->p['value'];
							} elseif ( $this->p['string'] ) {
								$this->args[$this->p['name']] = (string) $this->p['value'];
							} elseif ( [$this->p['bool']] ) {
								if ( $this->p['value'] == 'true' ) {
									$this->args[$this->p['name']] = true;
								} else {
									$this->args[$this->p['name']] = false;
								}
							}

						// Filter parameters from the main query with multiple values cast into string (not an array) 
						} elseif ( count( $this->value_arr ) > 1 ) {
							$this->args[$this->p['name']] =  (string) $this->p['value'];
						}
					}

					// Filter parameters from the main query that accepts arrays
					if ( $this->p['arg_arr'] ) {
						if ( $this->p['int'] ) {
							$this->args[$this->p['name']] = $this->value_arr_int;
						} elseif ( $this->p['string'] ) {
							$this->args[$this->p['name']] = $this->value_arr_str;
						} 
					}					
				} 

				// Filter parameters from the tax, date and meta queries
				if ( $this->p['q'] != 'main_query' ) {
					if ( $this->p['q'] == 'tax_query' ) {
						$this->queryTax();				
					}	

					if ( $this->p['q'] == 'date_query' ) {
						$this->queryDate();				
					}	

					if ( $this->p['q'] == 'meta_query' ) {
						$this->queryMeta();				
					}
				} 
			}
		}

		// If shortcode parameters are empty return the last five posts (ignore sticky posts and the current post that has the shortcode)
		if (empty($this->args)) { $this->args['posts_per_page'] = 5; $this->args['ignore_sticky_posts'] = true;  $this->args['post__not_in'] = array(get_the_ID()); }

		// WP_Query
		$this->fp_post_query = new WP_Query( $this->args );
		
		$this->args = '';
	}

	/**
	 * Query for tax parameters
	 * @since  1.1.0
	 * @version 1.1.0
	 */

	private function queryTax() {

		// Parameters that accept single values in the tax query
		if ( ( $this->p['arr'] === true ) && ( $this->p['arg_arr'] === false ) && ( $this->p['parent'] != 'relation' ) ) {

			// Filter parameters in the tax query with single values
			if (count( $this->value_arr ) === 1 )   {

				if ( $this->p['int'] ) {
					$this->tax_query_arr[$this->p['name']] = (int) $this->p['value']; 
				} elseif ( $this->p['string'] ) {
					$this->tax_query_arr[$this->p['name']] = (string) $this->p['value'];
				} elseif ( $this->p['bool'] ) {
					if ( $this->p['value'] == 'true' ) {
						$this->tax_query_arr[$this->p['name']] = true;
					} else {
						$this->tax_query_arr[$this->p['name']] = false;
					}
				}

			// Filter parameters in the tax query with multiple values cast into string (not an array)	
			} elseif ( count( $this->value_arr ) > 1 ) {	
				$this->tax_query_arr[$this->p['name']] = (string) $this->p['value'];
			}	

			// Check whether the tax_query_field value requires an integer or string array for the tax_query_terms
			if ( ( $this->p['att'] == 'tax_query_field' ) && ( in_array( $this->p['value'], array( 'term_id', 'term_taxonomy_id' ) ) ) ) {
				$this->tax_query_type = 'int';
			} elseif ( ( $this->p['att'] == 'tax_query_field' ) && ( empty($this->p['value'] ) ) ) {
				$this->tax_query_type = 'int';
			} else {
				$this->tax_query_type = 'str';
			}

		// Parameters that accept arrays in the tax query	
		} elseif ( ( $this->p['arr'] === true ) && ( $this->p['arg_arr'] === true ) && ($this->p['parent'] != 'relation') ) {

			// If tax_query_field is not defined, the array values for the tax_query_terms are integers
			if ( !isset( $this->tax_query_type ) && ( $this->p['att']  == 'tax_query_terms' ) && !empty( $this->p['value'] ) ) {
				$this->tax_query_type = 'int';
			} else if ( !isset( $this->tax_query_type ) ) {
				$this->tax_query_type = 'str';
			}
			
			if ( $this->tax_query_type == 'int' ) {
				$this->tax_query_arr[$this->p['name']] = array_map( 'intval', $this->value_arr );
			} elseif ( $this->tax_query_type == 'str' ) {
				$this->tax_query_arr[$this->p['name']] = array_map( 'strval', $this->value_arr );
			}

		// Relation parameter in the tax query	
		} elseif ( ( $this->p['arr'] === false ) && ( $this->p['arg_arr'] === false ) && ($this->p['parent'] != 'relation') ) {	

			$this->query_relation = $this->p['value'];

		// Parameters for the second array in case the relation option is used	
		} elseif ( $this->p['parent'] == 'relation' ) {

			// Parameters that accept single values for the second relation array in the tax query
			if ( ( $this->p['arr'] === true ) && ( $this->p['arg_arr'] === false ) ) {

				// Filter parameters for the second relation array in the tax query with single values
				if ( count( $this->value_arr ) === 1 ) {
					if ( $this->p['int'] ) {
						$this->tax_query_relation_arr[$this->p['name']] = (int) $this->p['value'];
					} elseif ( $this->p['string'] ) {
						$this->tax_query_relation_arr[$this->p['name']] = (string) $this->p['value'];
					} elseif ( $this->p['bool'] ) {
						if ( $this->p['value'] == 'true' ) {
							$this->tax_query_relation_arr[$this->p['name']] = true;
						} else {
							$this->tax_query_relation_arr[$this->p['name']] = false;
						}
					}

				// Filter parameters for the second relation array in the tax query multiple values cast into string (not an array) 
				} elseif ( count( $this->value_arr ) > 1 ) {				
					$this->tax_query_relation_arr[$this->p['name']] = (string) $this->p['value'];
				}

				// Check whether the tax_query_relation_field value requires an integer or string array for the tax_query_relation_terms
				if ( ( $this->p['att'] == 'tax_query_relation_field' ) && ( in_array( $this->p['value'], array( 'term_id', 'term_taxonomy_id' ) ) ) ) {
					$this->tax_query_relation_type = 'int';
				} elseif ( ( $this->p['att'] == 'tax_query_relation_field' ) && ( empty($this->p['value'] ) ) ) {
					$this->tax_query_relation_type = 'int';
				} elseif ( ( $this->p['att'] == 'tax_query_relation_field' ) && ( !empty($this->p['value'] ) ) ) {
					$this->tax_query_relation_type = 'str';
				}
			}	

			// Parameters that accept arrays for the second relation array in the tax query
			if ( ( $this->p['arr'] === true ) && ( $this->p['arg_arr'] === true ) ) {	

				// If tax_query_relation_field is not defined, the array values for the tax_query_relation_terms are integers 		
				if ( !isset( $this->tax_query_relation_type ) && ( $this->p['att'] = 'tax_query_relation_terms' ) && !empty( $this->p['value'] ) ) {
					$this->tax_query_relation_type = 'int';
				} elseif ( !isset( $this->tax_query_relation_type ) ) {
					$this->tax_query_relation_type = 'str';
				}		
				
				if ($this->tax_query_relation_type == 'int') {
					$this->tax_query_relation_arr[$this->p['name']] = array_map( 'intval', $this->value_arr );
				} elseif ($this->tax_query_relation_type == 'str') {
					$this->tax_query_relation_arr[$this->p['name']] = array_map( 'strval', $this->value_arr );
				}
			}
		}	

		// Tax_query parameters 
		if ( !empty( $this->tax_query_relation_arr ) ) {
			$this->args[$this->p['q']] = array( $this->tax_query_arr, $this->tax_query_relation_arr );
			$this->args[$this->p['q']]['relation'] = $this->query_relation;
		} else {
			$this->args[$this->p['q']] = array( $this->tax_query_arr );
		}
	}

	/**
	 * Query for date parameters
	 * @since  1.1.0
	 * @version 1.1.0
	 */

	private function queryDate() {

		// Filter the date query before and after parameters separately
		$exclude_date_values = array( 
			'date_query_after_year', 'date_query_after_month', 'date_query_after_day', 'date_query_before_year', 'date_query_before_month', 'date_query_before_day', 
			'date_query_relation_after_year', 'date_query_relation_after_month', 'date_query_relation_after_day', 'date_query_relation_before_year', 'date_query_relation_before_month', 'date_query_relation_before_day' 
			);

		// Filter before and after date parameters
		if ( $this->p['parent'] != 'relation' ) {

			// Filter the date query for the exlcluded parameters
			if ( ( ( $this->p['att'] == 'date_query_after' ) && ( !empty( $this->p['value'] ) ) ) ) {
				$this->date_query_arr[$this->p['name']] = (string) $this->p['value'];
				$this->after_query_empty = 'empty';
			} elseif ( ( $this->p['period'] == 'after' ) && ( $this->after_query_empty != 'empty' ) ) {				
				$this->date_query_arr['after'][$this->p['name']] = (string) $this->p['value'];	
			}
			
			if ( ( ( $this->p['att'] == 'date_query_before' ) && ( !empty( $this->p['value'] ) ) ) ) {
				$this->date_query_arr[$this->p['name']] = (string) $this->p['value'];
				$this->before_query_empty = 'empty';
			} elseif ( ( $this->p['period'] == 'before' ) && ( $this->before_query_empty != 'empty' ) ) {				
				$this->date_query_arr['before'][$this->p['name']] = (string) $this->p['value'];	
			}
		} elseif ( $this->p['parent'] == 'relation' ) {

			// Filter the second array for the before and after date parameters (when the realtion option is used)
			if ( ( ( $this->p['att'] == 'date_query_relation_after' ) && ( !empty( $this->p['value'] ) ) ) ) {
				$this->date_query_relation_arr[$this->p['name']] = (string) $this->p['value'];
				$this->after_query_relation_empty = 'empty';
			} elseif ( ( $this->p['period'] == 'after' ) && ( $this->after_query_relation_empty != 'empty' ) ) {				
				$this->date_query_relation_arr['after'][$this->p['name']] = (string) $this->p['value'];	
			}

			if ( ( ( $this->p['att'] == 'date_query_relation_before' ) && ( !empty( $this->p['value'] ) ) ) ) {
				$this->date_query_relation_arr[$this->p['name']] = (string) $this->p['value'];
				$this->before_query_relation_empty = 'empty';
			} elseif ( ( $this->p['period'] == 'before' ) && ( $this->before_query_relation_empty != 'empty' ) ) {				
				$this->date_query_relation_arr['before'][$this->p['name']] = (string) $this->p['value'];	
			}
		}

		// Filter date query ( exluding before and after date parameters )
		if ( ( $this->p['arr'] === true ) && ( $this->p['arg_arr'] === false ) && ( $this->p['parent'] != 'relation' ) && ( !in_array( $this->p['att'], $exclude_date_values ) ) ) {

			// Filter parameters in the date query with single values
			if ( count( $this->value_arr ) === 1 ) {

				if ( $this->p['int'] ) {
					$this->date_query_arr[$this->p['name']] = (int) $this->p['value']; 
				} elseif ( $this->p['string'] ) {
					// Characters converted to uppercase for data_query_compare
					if ( $this->p['att'] == 'date_query_compare') {
						$this->date_query_arr[$this->p['name']] = strtoupper($this->p['value']);
					} else {
						$this->date_query_arr[$this->p['name']] = (string) $this->p['value'];
					}	
				} elseif ( $this->p['bool'] ) {
					if ( $this->p['value'] == 'true' ) {
						$this->date_query_arr[$this->p['name']] = true;
					} else {
						$this->date_query_arr[$this->p['name']] = false;
					}
				}

			// Filter parameters in the date query with multiple values cast into string (not an array)		
			} elseif ( count( $this->value_arr ) > 1 ) {
				$this->date_query_arr[$this->p['name']] = (string) $this->p['value'];
			}
		// Parameters that accept arrays in the date query
		} elseif ( ( $this->p['arr'] === true ) && ( $this->p['arg_arr'] === true ) && ( $this->p['parent'] != 'relation' ) && ( ( $this->p['att'] != 'date_query_after' ) && ( $this->p['att'] != 'date_query_before' ) ) ) {
			
			$this->date_query_arr[$this->p['name']] = (string) $this->p['value'];
		// Relation parameter in the date query		
		} elseif ( ( $this->p['arr'] === false ) && ( $this->p['arg_arr'] === false ) && ( $this->p['parent'] != 'relation' ) ) { 
			
			$this->date_query_relation = $this->p['value'];
		// Parameters for the second array in case the relation option is used		
		} elseif ( $this->p['parent'] == 'relation') {

			// Parameters that accept single values for the second relation array in the date query
			if ( ( $this->p['arr'] === true ) && ( $this->p['arg_arr'] === false )  && ( !in_array( $this->p['att'], $exclude_date_values ) ) ) {

				// Filter parameters for the second relation array in the date query with single values
				if ( count( $this->value_arr ) === 1 )   {		
					if ( $this->p['int'] ) {
						$this->date_query_relation_arr[$this->p['name']] = (int) $this->p['value'];
					} elseif ($this->p['string']) {
						// Characters converted to uppercase for data_query_relation_compare
						if ( $this->p['att'] == 'date_query_relation_compare') {
							$this->date_query_relation_arr[$this->p['name']] = strtoupper($this->p['value']);
						} else {
							$this->date_query_relation_arr[$this->p['name']] = (string) $this->p['value'];
						}
					} elseif ( $this->p['bool'] ) {
						if ( $this->p['value'] == 'true' ) {
							$this->date_query_relation_arr[$this->p['name']] = true;
						} else {
							$this->date_query_relation_arr[$this->p['name']] = false;
						}
					}
				// Filter parameters for the second relation array in the date query multiple values cast into string (not an array)
				} elseif ( count( $this->value_arr ) > 1 ) {		

					$this->date_query_relation_arr[$this->p['name']] = (string) $this->p['value'];
				}
			}
			// Parameters that accept arrays for the second relation array in the date query
			if ( ( $this->p['arr'] === true ) && ( $this->p['arg_arr'] === true ) && ( ( $this->p['att'] != 'date_query_relation_after' ) && ( $this->p['att'] != 'date_query_relation_before' ) ) ) {
				
				$this->date_query_relation_arr[$this->p['name']] = (string) $this->p['value'];
			}							
		}

		// Date_query parameters
		if ( !empty($this->date_query_relation_arr ) ) {
			$this->args[$this->p['q']] = array( $this->date_query_arr, $this->date_query_relation_arr );
			$this->args[$this->p['q']]['relation'] = $this->date_query_relation;
		} else {
			$this->args[$this->p['q']] = array( $this->date_query_arr );
		}	
	}

	/**
	 * Query for meta parameters 
	 * @since  1.1.0
	 * @version 1.1.0
	 */

	private function queryMeta() {

		// Check whether the meta_query_compare value requires an integer or string array for the meta_query_value
		if ( ( $this->p['att'] == 'meta_query_compare' ) && ( in_array( strtoupper( $this->p['value'] ), array( 'IN', 'NOT IN', 'BETWEEN', 'NOT BETWEEN' ) ) ) ) {
			
			$this->meta_query_value = 'array';
		} elseif ( ( $this->p['att'] == 'meta_query_compare' ) && ( !in_array( strtoupper( $this->p['value'] ), array( 'IN', 'NOT IN', 'BETWEEN', 'NOT BETWEEN' ) ) ) ) {
			
			$this->meta_query_value = 'str';
		} elseif ( ( $this->p['att'] == 'meta_query_compare' ) && ( empty($this->p['value'] ) ) ) {
			
			$this->meta_query_value = 'str';
		}

		// Filter through the meta_query_value parameters depnding on the meta_query_compare value
		if  ( $this->p['att'] == 'meta_query_value' ) {
			if ( $this->meta_query_value == 'array' ) {
				$this->meta_query_arr[$this->p['name']] = array( $this->p['value'] ); 
			} else {
				$this->meta_query_arr[$this->p['name']] = (string) $this->p['value'];
			}
		}

		// Check whether the meta_query_relation_compare value requires an integer or string array for the meta_query_relation_value
		if ( ( $this->p['att'] == 'meta_query_relation_compare' ) && ( in_array( strtoupper( $this->p['value'] ), array( 'IN', 'NOT IN', 'BETWEEN', 'NOT BETWEEN' ) ) ) ) {
			
			$this->meta_query_value = 'array';
		} elseif ( ( $this->p['att'] == 'meta_query_relation_compare' ) && ( !in_array( strtoupper( $this->p['value'] ), array( 'IN', 'NOT IN', 'BETWEEN', 'NOT BETWEEN' ) ) ) ) {
			
			$this->meta_query_value = 'str';
		} elseif ( ( $this->p['att'] == 'meta_query_relation_compare' ) && ( empty($this->p['value'] ) ) ) {
			
			$this->meta_query_value = 'str';
		}

		// Filter through the meta_query_relation_value parameters depnding on the meta_query_relation_compare value
		if  ( $this->p['att'] == 'meta_query_relation_value' ) {
			if ( $this->meta_query_value == 'array' ) {
				$this->meta_query_arr[$this->p['name']] = array( $this->p['value'] ); 
			} else {
				$this->meta_query_arr[$this->p['name']] = (string) $this->p['value'];
			}
		}

		// Filter meta query ( exluding meta_query_value parameter )
		if ( ( $this->p['arr'] === true ) && ( $this->p['arg_arr'] === false ) && ( $this->p['parent'] != 'relation' ) ) {

			// Filter parameters in the meta query with single values
			if ( count( $this->value_arr ) === 1 ) {
		
				if ( $this->p['int'] ) {
					$this->meta_query_arr[$this->p['name']] = (int) $this->p['value']; 
				} elseif ($this->p['string']) {
					$this->meta_query_arr[$this->p['name']] = (string) $this->p['value'];
				} elseif ( $this->p['bool'] ) {
					if ( $this->p['value'] == 'true' ) {
						$this->meta_query_arr[$this->p['name']] = true;
					} else {
						$this->meta_query_arr[$this->p['name']] = false;
					}
				}
			// Filter parameters for the second relation array in the meta query multiple values cast into string (not an array)
			}	elseif (count($this->value_arr) > 1 ) {	

					$this->meta_query_arr[$this->p['name']] = (string) $this->p['value'];
			}
		// Parameters that accept arrays in the meta query	
		} elseif ( ( $this->p['arr'] === true ) && ( $this->p['arg_arr'] === true ) && ($this->p['parent'] != 'relation') && ( $this->p['att'] != 'meta_query_value' ) ) {				
			
			$this->meta_query_arr[$this->p['name']] = (string) $this->p['value'];
		// Relation parameter in the meta query	
		} elseif ( ( $this->p['arr'] === false ) && ( $this->p['arg_arr'] === false ) && ( $this->p['parent'] != 'relation') ) {
			
			$this->query_relation = $this->p['value'];
		// Parameters for the second array in case the relation option is used	
		} elseif ( $this->p['parent'] == 'relation') {

			// Parameters that accept single values for the second relation array in the meta query
			if ( ( $this->p['arr'] === true ) && ( $this->p['arg_arr'] === false ) ) {

				// Filter parameters for the second relation array in the meta query with single values
				if ( count( $this->value_arr ) === 1 )   {
					if ( $this->p['int'] ) {
						$this->meta_query_relation_arr[$this->p['name']] = (int) $this->p['value'];
					} elseif ( $this->p['string'] ) {
						$this->meta_query_relation_arr[$this->p['name']] = (string) $this->p['value'];
					} elseif ( $this->p['bool'] ) {
						if ( $this->p['value'] == 'true' ) {
							$this->meta_query_relation_arr[$this->p['name']] = true;
						} else {
							$this->meta_query_relation_arr[$this->p['name']] = false;
						}
					}

				// Filter parameters for the second relation array in the meta query multiple values cast into string (not an array)
				} elseif ( count( $this->value_arr ) > 1 ) {				
					$this->meta_query_relation_arr[$this->p['name']] = (string) $this->p['value'];
				}

			}							
			// Parameters that accept arrays for the second relation array in the meta query
			if ( ( $this->p['arr'] === true ) && ( $this->p['arg_arr'] === true ) ) {
				$this->meta_query_relation_arr[$this->p['name']] = (string) $this->p['value'];
			}
		}

		// Meta_query parameters
		if ( !empty( $this->meta_query_relation_arr ) ) {
			$this->args[$this->p['q']] = array( $this->meta_query_arr, $this->meta_query_relation_arr );
			$this->args[$this->p['q']]['relation'] = $this->query_relation;
		} else {
			$this->args[$this->p['q']] = array( $this->meta_query_arr );
		}	
	}
}
