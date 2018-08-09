<?php

/**
 * Foundation 4 Shortcodes
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
	'menu_id'=> '', 

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
	'open_tab' => 'active', 
	'vertical_class' => 'vertical', 

	//Block Grid
	'block_grids' => ''
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

		if ( !empty( $atts['class'] ) ) { $html = '<div class="'.esc_html( $atts['class'] ).'">'; } else { $html = ''; }
			
		if ( $atts['vertical'] == 'true' ) {
			$html .= '<div class="section-container vertical-tabs" data-section="vertical-tabs">';
		} else {
			$html .= '<div class="section-container tabs" data-section="tabs">';
		}

		$html .=  do_shortcode( $atts['content'] );
		$html .= '</div>';

		if ( !empty( $atts['class'] ) ) { $html .= '</div>'; }

        return $html;
	}

	public function fp_tab( $atts, $content = null ){
        global $fp_globals;
        $content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );

		$atts = shortcode_atts( array( 
				'title' => __( 'Tab Title ', 'fp-foundation-assistant' ).$fp_globals[ 'counter_tabs' ], 
                'open' =>'', 
                'content' => !empty( $content ) ? $content : __( 'Tab Content ', 'fp-foundation-assistant' ).$fp_globals[ 'counter_tabs' ], 
                'class' => ''
			), $atts
		);
			
		if ( $atts['open'] == 'true' ) {
			if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } else { $class = ''; }
			$html = "<section class='".esc_html( $fp_globals[ 'open_tab' ] ).esc_html( $class )."'>";
		} else {
			if ( !empty( $atts['class'] ) ) { $class = ' class='.$atts['class']; } else { $class = ''; } 
			$html = "<section".esc_html( $class ).">";				
		}	

		$html .= "<h3 class='title' data-section-title><a href='#'>". esc_html( $atts['title'] ) ."</a></h3>";
		$html .= "<div class='content'><div class='fp-tab-content'>". do_shortcode( $atts['content'] )."</div></div>";
		$html .= "</section>";

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

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Place here the shortcode tags for single accordion item.', 'fp-foundation-assistant' ), 
                'class' => ''
			 ), $atts
		 );

		if ( !empty( $atts['class'] ) ) { $class = $atts['class'] . ' '; } else { $class = ''; }
		
		$html = '<div class="section-container accordion" data-section="accordion">';		
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</div>';

        return $html;
	}

	public function fp_accordion( $atts, $content = null ){
        global $fp_globals;
        $content = str_replace( array( '<br />', '<br>' ), array( '', '' ), $content );

		$fp_globals[ 'counter_accordion' ]++;
		$fp_globals[ 'accordion_id' ] = 'panel'.$fp_globals[ 'counter_accordion_wraps' ].$fp_globals[ 'counter_accordion' ];

		$atts = shortcode_atts( array( 
				'title' => __( 'Accordion Title ', 'fp-foundation-assistant' ).$fp_globals[ 'counter_accordion' ], 
                'open' =>'', 
                'content' => !empty( $content ) ? $content : __( 'Accordion Content ', 'fp-foundation-assistant' ).$fp_globals[ 'counter_accordion' ], 
                'class' => ''
			 ), $atts
		 );

			if ( $atts['open'] == 'true' ) {	
				if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } else { $class = ''; }		
				$html = "<section class='".esc_html( $fp_globals[ 'open_tab' ] ).esc_html( $class )."'>";
			} else {
				if ( !empty( $atts['class'] ) ) { $class = ' class='.$atts['class']; } else { $class = ''; } 
				$html = "<section".esc_html( $class ).">";
			}	

			$html .= "<h3 class='title' data-section-title><a href='#'>".esc_html( $atts['title'] )."</a></h3>";
			$html .= "<div class='content' data-section-content>";
			$html .= do_shortcode( $atts['content'] );
			$html .= "</div>";
			$html .= "</section>";
		
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
                'class' => ''
			 ), $atts
		 );

		if ( !empty( $atts['class'] ) ) { $class = $atts['class'].' '; } else { $class = ''; }

		$html = '<ul class="'.esc_html( $class ).'sub-nav">';		
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

			if ( !empty( $atts['class'] ) ) { $class = ' class='.$atts['class']; } else { $class = ''; } 

			$fp_globals[ 'menu_id' ] = 'menu-'.uniqid();	
			$html = '<li'.esc_html( $class ).'><a href="'.esc_url( $atts['link'] ).'" data-dropdown="'.esc_html( $fp_globals[ 'menu_id' ] ).'" data-options="is_hover:true; hover_timeout:5000">'.esc_html( $atts['title'] ).'</a>'. do_shortcode( $atts['content'] ).'</li>';
	
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

		if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } else { $class = ''; }

		$html = '<ul id="'.esc_html( $fp_globals[ 'menu_id' ] ).'" class="f-dropdown'.esc_html( $class ).'" data-dropdown-content tabindex="-1">';
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
			
		if ( !empty( $atts['class'] ) ) { $class = ' class='.$atts['class']; } else { $class = ''; }
	
		$html = '<li'.esc_html( $class ).'><a href="'.esc_url( $atts['link'] ).'">'.esc_html( $atts['title'] ).'</a>'. do_shortcode( $atts['content'] ).'</li>';

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
				'shape' => '', 
				'size' => '', 
				'color' => '', 
				'link' => '', 
				'dropdown' =>'',  
				'tab' => '',
                'class' => ''
			 ), $atts
		 );
		
		$button_classes = array();

		if ( in_array( $atts['size'], array( 'tiny', 'small', 'medium', 'large', 'expand' ), true ) )  { $button_classes[] = $atts['size'].' '; } 
		if ( in_array( $atts['color'], array( 'secondary', 'success', 'alert', 'disabled' ), true ) ) { $button_classes[] = $atts['color'].' '; } 
		if ( in_array( $atts['shape'], array( 'round', 'radius' ), true ) ) { $button_classes[] = $atts['shape'].' '; }
		if ( $atts['dropdown'] == 'true' ) { $button_classes[] = 'dropdown '; }    
		if ( $atts['tab'] == 'true' ) { $tab = ' target="_blank" '; } else { $tab = ''; }
		if ( is_array( $button_classes ) ) { $button_classes = implode( " ", $button_classes ); }	
		if ( !empty( $atts['class'] ) ) { $class = $atts['class'].' ';} else { $class = ''; }	

		if ( $atts['type'] =='link' ) { 
			$html = '<a href="'.esc_html( esc_url( $atts['link'] ) ).'"'. esc_html( $tab ) .' class="'.esc_html( $button_classes ).esc_html( $class ).'button">';
		} else { 
			$link = '';
			if ( $atts['type'] == 'submit' ) { $type = ' type=submit'; } else if ( $atts['type'] == 'reset' ) { $type = ' type=reset'; } else { $type = ''; }
			$html = '<button class="'.esc_html( $button_classes ).esc_html( $class ).'button"'.esc_html( $type ).'>';
		}
		
		$html .= do_shortcode( $atts['content'] );

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
				'color' => '', 
				'closable' =>'', 
				'shape' => '', 
                'class' => ''
			 ), $atts
		 );
		
		$callout_classes = array();

		if ( in_array( $atts['color'], array( 'secondary', 'success', 'alert', 'primary' ), true ) ) { $callout_classes[] = $atts['color'].' '; } 
		if ( $atts['shape'] == 'radius' ) { $callout_classes[] = 'radius '; } elseif ( $atts['shape'] == 'round' ) { $callout_classes[] = 'round '; } 
		if ( !empty( $atts['class'] ) ) { $class = $atts['class'].' '; } else { $class = ''; }	

		if ( is_array( $callout_classes ) ) { $callout_classes = implode( " ", $callout_classes ); }
		
		$html = '<div class="'.esc_html( $callout_classes ).esc_html( $class ).'alert-box" data-alert>';		
		$html .=  do_shortcode( $atts['content'] );

		if ( $atts['closable'] == 'true' ) {
			$html .= '<a href="#" class="close">&times;</a></div>';
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
				'hover' => '', 
                'class' => ''
			 ), $atts
		 );

		$fp_globals[ 'dropdown_id' ] = 'dd-'.uniqid();

		if ( $atts['hover'] == 'true' ) { $hover = 'is_hover:true; hover_timeout:500'; } else { $hover = ''; }
		if ( !empty( $atts['class'] ) ) { $class = $atts['class'].' '; } else { $class = ''; }

		$html = '<a data-dropdown="'.esc_html( $fp_globals[ 'dropdown_id' ] ).'" class="fp-dropdown-button" data-options="'.esc_html( $hover ).'" aria-controls="'.esc_html( $fp_globals[ 'dropdown_id' ] ).'" aria-expanded="false" >'.esc_html( $atts['title'] ).'</a>';
		$html .= '<div id="'.esc_html( $fp_globals[ 'dropdown_id' ] ).'" data-dropdown-content class="'.esc_html( $class ).'f-dropdown content" aria-hidden="true" tabindex="-1">';		
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</div>';
	
        return $html;

        $fp_globals[ 'dropdown_id' ] = 'dd-'.uniqid();
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
		$html .= '<div class="fp-video-caption">'.do_shortcode( $atts['content'] ).'</div>';
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
				'small' => '', 
				'default' => '', 
				'large' => '', 
                'class' => '',
                
			 ), $atts
		 );
	
		$html =  '';

		if ( !empty( $atts['class'] ) ) { 
			$html .= '<img class="'. esc_html( $atts['class'] ).'" alt="'. esc_html( $atts['alt'] ) .'" data-interchange="';
		} else {
			$html .= '<img alt="'. esc_html( $atts['alt'] ) .'" data-interchange="';
		}
		
		$html .= '[ '.esc_url( $atts['default'] ).',( default )],';		
		$html .= '[ '.esc_url( $atts['small'] ).',( small )],';	
		$html .= '[ '.esc_url( $atts['large'] ).',( large )]">';	
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
				'shape' => '', 
                'class' => ''
			 ), $atts
		 );
		
		!empty( $atts['id'] ) ? $id = ' id='.$atts['id'].' ' : $id = '';

		$label_classes = array();

		if ( in_array( $atts['color'], array( 'secondary', 'success', 'alert' ), true ) ) { $label_classes[] = $atts['color'].' '; } 
		if ( in_array( $atts['shape'], array( 'round', 'radius' ), true ) ) { $label_classes[] = $atts['shape'].' '; } 
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
		
		if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } else { $class = ''; }

		$html = '<ul class="orbit'.esc_html( $class ).'" data-orbit>';
		$html .=  do_shortcode( $atts['content'] );
		$html .= '</ul>';

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
				
		if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } else { $class = ''; }

		if ( $atts['open'] == 'true' ) {
			$html = "<li class='orbit-slide ".esc_html( $fp_globals[ 'open_tab' ] ).esc_html( $class )."'>". do_shortcode( $atts['content'] )."</li>";
		} else {
			$html = "<li class='orbit-slide".esc_html( $class )."'>". do_shortcode( $atts['content'] )."</li>";
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
				'width' => 50, 
				'text' =>'', 
				'size' => '', 
				'shape' => '', 
                'class' => ''
			 ), $atts
		 );
		
		$progress_classes = array();

		if ( in_array( $atts['color'], array( 'secondary', 'success', 'alert' ), true ) ) { $progress_classes[] = $atts['color'].' '; } 
		if ( in_array( $atts['shape'], array( 'radius', 'round' ), true ) ) { $progress_classes[] = $atts['shape'].' '; } 
		if ( in_array( $atts['size'], array( 'small', 'large' ), true ) ) { if ( $atts['size'] == 'small' ) { $progress_classes[] = $atts['size'].'-8 ';} else { $progress_classes[] = $atts['size'].'-12 ';} } 
		if ( !empty( $atts['class'] ) ) { $class = $atts['class'].' '; } else { $class = ''; }		

		if ( is_array( $progress_classes ) ) { $progress_classes = implode( " ", $progress_classes ); }	

		$html = '<div class="'.esc_html( $progress_classes ).esc_html( $class ).'progress">';
		$html .= '<div class="meter" style="width:'.intval( esc_html( $atts['width'] ) ).'%">';
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
				'title' => __( 'Click here for a modal', 'fp-foundation-assistant' ), 
				'id' =>$fp_globals[ 'reveal_id' ], 
                'class' => ''
			 ), $atts
		 );

		if ( in_array( $atts['size'], array( 'tiny', 'small', 'medium', 'large', 'xlarge' ), true ) ) { $size = $atts['size'].' '; } else { $size = ''; }
		if ( !empty( $atts['title'] ) ) { $title = $atts['title']; } else { $title = __( 'Click here for a modal', 'fp-foundation-assistant' ); }
		if ( !empty( $atts['class'] ) ) { $class = $atts['class'].' '; } else { $class = ''; }

		$html = '<div class="'.esc_html( $size ).esc_html( $class ).'reveal-modal" id="'.esc_html( $atts['id'] ).'" data-reveal>';
		$html .=  do_shortcode( $atts['content'] );
		$html .= '<a class="close-reveal-modal" aria-label="'.__( 'Close', 'fp-foundation-assistant' ).'">&#215;</a></div>';
		$html .= '<a class="fp-reveal-link" data-reveal-id="'.esc_html( $atts['id'] ).'">'.esc_html( $title ).'</a>';

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
				'shape' => '', 
                'class' => ''
			 ), $atts
		 );
		
		$tooltip_classes = array();

		if ( in_array( $atts['position'], array( 'top', 'right', 'left', 'bottom' ), true ) ) { $tooltip_classes[] = ' tip-'.$atts['position']; } 
		if ( !empty( $atts['title'] ) ) { $title = $atts['title']; } else { $title = __( 'Place the description text here.', 'fp-foundation-assistant' ); }
		if ( in_array( $atts['shape'], array( 'radius', 'round' ), true ) ) { $tooltip_classes[] = ' '.$atts['shape']; }  
		if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } else { $class = ''; }

		if ( is_array( $tooltip_classes ) ) { $tooltip_classes = implode( " ", $tooltip_classes ); }

		$html = '<span data-tooltip aria-haspopup="true" class="has-tip'.esc_html( $tooltip_classes ).esc_html( $class ).'"  title="'.esc_html( $title ).'">';
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
				'show_medium_down' => '', 
				'hide_medium' => '', 
				'hide_medium_only' => '',   
				'hide_medium_down' => '', 
				'show_large' => '', 
				'show_large_only' => '', 
				'show_large_down' => '', 
				'hide_large' => '', 
				'hide_large_only' => '', 
				'hide_large_down' => '', 
				'show_xlarge' => '', 
				'hide_xlarge' => '', 
				'show_landscape' => '', 
				'hide_landscape' => '', 
				'show_portrait' => '', 
				'hide_portrait' => '', 
                'class' => ''
			 ), $atts
		 );

		$visibility_class = array();

		if ( $atts['show_small_only'] 	== 'true' )  { $show_small_only = 	array( 'size' => 'show_small_only', 	'class' => 'show-for-small' );		} else { $show_small_only = '';}
		if ( $atts['hide_small_only'] 	== 'true' )  { $hide_small_only = 	array( 'size' => 'hide_small_only', 	'class' => 'hide-for-small' );		} else { $hide_small_only = '';}
		if ( $atts['show_medium'] 		== 'true' )  { $show_medium = 		array( 'size' => 'show_medium', 		'class' => 'show-for-medium-up' );	} else { $show_medium = '';}
		if ( $atts['show_medium_only'] 	== 'true' )  { $show_medium_only = 	array( 'size' => 'show_medium_only', 	'class' => 'show-for-medium' );		} else { $show_medium_only = '';}
		if ( $atts['show_medium_down'] 	== 'true' )  { $show_medium_down = 	array( 'size' => 'show_medium_down', 	'class' => 'show-for-medium-down' );} else { $show_medium_down = '';}
		if ( $atts['hide_medium'] 		== 'true' )  { $hide_medium = 		array( 'size' => 'hide_medium', 		'class' => 'hide-for-medium-up ' );	} else { $hide_medium = '';}
		if ( $atts['hide_medium_only'] 	== 'true' )  { $hide_medium_only = 	array( 'size' => 'hide_medium_only', 	'class' => 'hide-for-medium' );		} else { $hide_medium_only = '';}  
		if ( $atts['hide_medium_down'] 	== 'true' )  { $hide_medium_down = 	array( 'size' => 'hide_medium_down', 	'class' => 'hide-for-medium-down' );} else { $hide_medium_down = '';}
		if ( $atts['show_large'] 		== 'true' )  { $show_large = 		array( 'size' => 'show_large', 			'class' => 'show-for-large-up' );	} else { $show_large = '';} 
		if ( $atts['show_large_only'] 	== 'true' )  { $show_large_only = 	array( 'size' => 'show_large_only', 	'class' => 'show-for-large' );		} else { $show_large_only = '';}   
		if ( $atts['show_large_down'] 	== 'true' )  { $show_large_down = 	array( 'size' => 'show_large_down', 	'class' => 'show-for-large-down' );	} else { $show_large_down = '';}
		if ( $atts['hide_large'] 		== 'true' )  { $hide_large =		array( 'size' => 'hide_large', 			'class' => 'hide-for-large-up' );	} else { $hide_large = '';}  
		if ( $atts['hide_large_only'] 	== 'true' )  { $hide_large_only =	array( 'size' => 'hide_large_only', 	'class' => 'hide-for-large' );		} else { $hide_large_only = '';}
		if ( $atts['hide_large_down'] 	== 'true' )  { $hide_large_down = 	array( 'size' => 'hide_large_down', 	'class' => 'hide-for-large-down' );	} else { $hide_large_down = '';}
		if ( $atts['show_xlarge'] 		== 'true' )  { $show_xlarge =		array( 'size' => 'show_xlarge', 		'class' => 'show-for-xlarge' );		} else { $show_xlarge = '';}
		if ( $atts['hide_xlarge'] 		== 'true' )  { $hide_xlarge =		array( 'size' => 'hide_xlarge', 		'class' => 'hide-for-xlarge' );		} else { $hide_xlarge = '';}
		if ( $atts['show_landscape'] 	== 'true' )  { $show_landscape =	array( 'size' => 'show_landscape', 		'class' => 'show-for-landscape' );	} else { $show_landscape = '';}
		if ( $atts['hide_landscape'] 	== 'true' )  { $hide_landscape =	array( 'size' => 'hide_landscape', 		'class' => 'hide-for-landscape' );	} else { $hide_landscape = '';} 
		if ( $atts['show_portrait'] 	== 'true' )  { $show_portrait =		array( 'size' => 'show_portrait', 		'class' => 'show-for-portrait' );	} else { $show_portrait = '';}
		if ( $atts['hide_portrait'] 	== 'true' )  { $hide_portrait =		array( 'size' => 'hide_portrait', 		'class' => 'hide-for-portrait' );	} else { $hide_portrait = '';}  				

		$options = array( 
			$show_small_only, $hide_small_only, 																					// Small Visibility Classes
			$show_medium, $show_medium_only, $hide_medium, $hide_medium_only, $show_medium_down, $hide_medium_down, 				// Medium Visibility Classes
			$show_large, $show_large_only, $hide_large, $hide_large_only, $show_large_down, $hide_large_down, 						// Large Visibility Classes
			$show_xlarge, $hide_xlarge, 																							// XLarge Visibility Classes
			$show_landscape, $hide_landscape, 																						// Landscape Visibility Classes
			$show_portrait, $hide_portrait, 																						// Portrait Visibility Classes
		 );

		foreach ( $options as $option ) {
			if ( isset( $option[ 'class' ] ) ) {
				$visibility_class[] = $option[ 'class' ].' ';
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

		if ( in_array( $atts['float'], array( 'left', 'right' ), true ) ) { $float = $atts['float']; } else { $float = ''; }
		if ( !empty( $atts['class'] ) ) { $class = ' '. $atts['class']; } else { $class = ''; }

		$html = '<div class="'.esc_html( $float ).esc_html( $class ).'">'.do_shortcode( $atts['content'] ).'</div>';

        return $html;
	}

}

/**
 * Grid Shortcode
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
                'class' => '', 
                'collapse' => '',	 
				'image' => '',	 

				// Not Supported in F4; Included to support compatibility between the versions;
				'small_up' => '', 
				'medium_up' => '', 
				'large_up' => '', 
			 ), $atts
		 );
		
		if (  !empty( $atts['image'] ) && getimagesize( $atts['image'] ) != false ) { $background = $atts['image']; } else { $background = ''; }
		if ( !empty( $atts['class'] ) ) { $class = $atts['class'] .' '; } else { $class = ''; }

		$grid_class = array();	
		$bool_class = array();	

		$bool_options = array( 
			array( 'bool' => $atts['collapse'], 'class' => 'collapse ' ), 
		 );

		foreach ( $bool_options as $bool_option ) {

			if ( $bool_option[ 'bool' ] == 'true' ) { $bool_class[] = $bool_option[ 'class' ]; } else { $bool_option[ 'bool' ] = ''; }
		}	

		if ( is_array( $bool_class ) ) { $bool_class = implode( " ", $bool_class );}

		( int ) $max = 12;
		( int ) $min = 1;

		// Not Supported in F4; Included to support compatibility between the versions;
		$options = array( 
			array( 'size' => $atts['small_up'], 'class' => 'small-block-grid-' ),  			 
			array( 'size' => $atts['large_up'], 'class' => 'large-block-grid-' )
		 );

		if( empty( $atts['small_up'] ) && empty( $atts['large_up'] ) ) {
			$options[] = array( 'size' => $atts['medium_up'], 'class' => 'large-block-grid-' );
		}


		foreach ( $options as $option ) {

			if ( ( !is_numeric( $option[ 'size' ] ) ) ||( $max < $option[ 'size' ] || $option[ 'size' ] < $min ) ) { $option[ 'size' ] = ''; }

			if ( $min <= $option[ 'size' ] && $option[ 'size' ] <= $max ) {

				$grid_class[] = $option[ 'class' ].absint( esc_html( $option[ 'size' ] ) ).' ';
			}
		}

		if ( is_array( $grid_class ) ) { $grid_class = implode( " ", $grid_class ); } 

		if ( empty( $atts['small_up'] ) && empty( $atts['medium_up'] ) && empty( $atts['large_up'] ) ) {

			$fp_globals[ 'block_grids' ] = 'false';

			if ($background) {
				$html = '<div class="'.esc_html( $class ).esc_html( $bool_class ).'row" style="background-image:url('.esc_url($background).');background-size:cover;">';
			} else {
				$html = '<div class="'.esc_html( $class ).esc_html( $bool_class ).'row">';
			}
			$html .=  do_shortcode( $atts['content'] );
			$html .= '</div>';

		} else {

			$fp_globals[ 'block_grids' ] = 'true';

			if ($background) {
				$html = '<ul class="'.esc_html( $class ).esc_html( $grid_class ).'" style="background-image:url('.esc_url($background).');background-size:cover;">';
			} else {
				$html = '<ul class="'.esc_html( $class ).esc_html( $grid_class ).'">';
			}

			$html .=  do_shortcode( $atts['content'] );
			$html .= '</ul>';
		}	

		$html = str_replace( array( '></p>', '<p><' ), array( '>', '<' ), $html );
		$html = str_replace( array( '<br />', '<br>' ), array( '', '' ), $html );			

        return $html;		

	}

	public function fp_columns( $atts, $content ){
        global $fp_globals;

		//Set Defaults						
		$atts = shortcode_atts( array( 
				'content' => !empty( $content ) ? $content : __( 'Place Content Here', 'fp-foundation-assistant' ), 					
				'small' => '', 			
				'large'=>'', 
				'small_offset' => '', 
				'large_offset' => '', 	
				'small_centered' => '', 
				'large_centered' => '', 	
				'small_uncentered' => '', 
				'large_uncentered' => '', 
				'push' => '', 
				'pull' => '', 
				'end' => '', 
                'class' => '', 


                // Not Supported in F4; Included to support compatibility between the versions;
                'column' => '', 				
                'medium' => '', 				
                'offset' => '', 				
                'medium_offset' => '', 		
                'centered' => '', 			
                'medium_centered' => '', 		
                'medium_uncentered' => '', 		
			 ), $atts
		 );

		( int ) $max = 12;
		( int ) $min = 1;

		$grid_class = array();		
		$bool_class = array();

		$options = array( 
			
			array( 'size' => $atts['small'], 'class' => 'small-' ), 
			array( 'size' => $atts['small_offset'], 'class' => 'small-offset-' ), 
			array( 'size' => $atts['large'], 'class' => 'large-' ), 
			array( 'size' => $atts['large_offset'], 'class' => 'large-offset-' ), 
			array( 'size' => $atts['push'], 'class' => 'push-' ), 
			array( 'size' => $atts['pull'], 'class' => 'pull-' ), 

			// Not Supported in F4; Included to support compatibility between the versions;
			array( 'size' => $atts['column'], 'class' => 'large-' ), 
			array( 'size' => $atts['medium'], 'class' => 'large-' ), 
			array( 'size' => $atts['offset'], 'class' => 'large-offset-' ), 
			array( 'size' => $atts['medium_offset'], 'class' => 'large-offset-' ), 
		 );


		foreach ( $options as $option ) {

			if ( ( !is_numeric( $option[ 'size' ] ) ) ||( $max < $option[ 'size' ] || $option[ 'size' ] < $min ) ) { $option[ 'size' ] = ''; }

			if ( $min <= $option[ 'size' ] && $option[ 'size' ] <= $max ) {

				$grid_class[] = $option[ 'class' ].absint( esc_html( $option[ 'size' ] ) ).' ';
			}
		}
		
		if ( empty( $atts['small'] ) && empty( $atts['medium'] ) && empty( $atts['large'] ) ) { $grid_class[] = 'small-12 '; }
		if ( is_array( $grid_class ) ) { $grid_class = implode( " ", $grid_class ); } 


		$bool_options = array( 
			array( 'bool' => $atts['small_centered'], 'class' => 'small-centered ' ), 
			array( 'bool' => $atts['large_centered'], 'class' => 'large-centered ' ), 
			array( 'bool' => $atts['small_uncentered'], 'class' => 'small-uncentered ' ), 
			array( 'bool' => $atts['large_uncentered'], 'class' => 'large-uncentered ' ), 
			array( 'bool' => $atts['end'], 'class' => 'end ' ), 

			// Not Supported in F4; Included to support compatibility between the versions;
			array( 'bool' => $atts['centered'], 'class' => 'small-centered ' ), 
			array( 'bool' => $atts['medium_centered'], 'class' => 'small-centered ' ), 
			array( 'bool' => $atts['medium_uncentered'], 'class' => 'small-uncentered ' ), 
		 );

		foreach ( $bool_options as $bool_option ) {
			if ( $bool_option[ 'bool' ] == 'true' ) { $bool_class[] = $bool_option[ 'class' ]; } else { $bool_option[ 'bool' ] = ''; }
		}	

		if ( is_array( $bool_class ) ) { $bool_class = implode( " ", $bool_class );}	

		if ( $fp_globals[ 'block_grids' ] == 'true' ) {

			if ( !empty( $atts['class'] ) ) { $class = ' class='.$atts['class']; } else { $class = ''; }
			$html = '<li'.esc_html( $class ).'>';
			$html .=  do_shortcode( $atts['content'] );
			$html .= '</li>';

		} elseif ( $fp_globals[ 'block_grids' ] == 'false' ) {

			if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } else { $class = ''; }
			$html = '<div class="'.esc_html( $bool_class ).esc_html( $grid_class ).esc_html( $class ).' columns">';
			$html .=  do_shortcode( $atts['content'] );
			$html .= '</div>';
		}		
	
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
				'id' => $fp_globals[ 'owl_id' ], 
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
		
		if ( $atts['style'] =='two' ) { $style = 'box-layout-two'; } elseif ( $atts['style'] =='three' ) { $style = 'box-layout-three'; } else { $style = 'box-layout-one'; } 		
		if ( !empty( $atts['alt'] ) ) { $alt = $atts['alt']; } else { $alt = 'image'; }
		if ( !empty( $atts['class'] ) ) { $class = ' '.$atts['class']; } else { $class = ''; }

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
			array( 'att' => 'order', 								'name' => 'order',					'q' => 'main_query', 	'arr' => false,		'arg_arr' => false,		'int' => false, 	'string' => true, 	'bool' => false, 'parent' => '', 		 'period' => '' ),
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
