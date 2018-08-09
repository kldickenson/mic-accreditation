<?php

/**
 * TinyMCE Plugins
 * @since FP Foundation Assistant 1.0.0
 * @version 1.1.0
 */


/*********************************************************/

if ( !class_exists( 'fp_foundation_assistant_tinymce_templates' ) ) {
	class fp_foundation_assistant_tinymce_templates {

		function __construct() {
			add_action( 'admin_head',array(&$this, 'tinymce_templates_init'));
		}

		function tinymce_templates_init() {
			if (get_user_option('rich_editing') == 'true') {
				add_filter('mce_external_plugins',array(&$this,'fp_foundation_assistant_plugins'));
				add_filter('mce_buttons',array(&$this,'fp_foundation_assistant_tinymce_buttons'));
			}
		}

		/* Add the TinyMCE Plugins */
		public function fp_foundation_assistant_plugins ( $plugins_array ) {

			$plugins = array(); 

			if ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6' )  { $fp_foundation_version = 'fp_foundation_6_button';}
			elseif ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-rtl' )  { $fp_foundation_version = 'fp_foundation_6_button';}
			elseif ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-flex' )  { $fp_foundation_version = 'fp_foundation_6_flex_button';}
			elseif ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-flex-rtl' )  { $fp_foundation_version = 'fp_foundation_6_flex_button';}
			elseif ( get_option('fp_foundation_versions', 'foundation6') == 'foundation5' )  { $fp_foundation_version = 'fp_foundation_5_button';}
			elseif ( get_option('fp_foundation_versions', 'foundation6') == 'foundation4' )  { $fp_foundation_version = 'fp_foundation_4_button';}
			elseif ( get_option('fp_foundation_versions', 'foundation6') == 'foundation3' )  { $fp_foundation_version = 'fp_foundation_3_button';}

			if ( get_option('fp_load_foundation_icons_checkbox', true) == true ) { $plugins[] = 'foundation_icons';  }

		     $plugins[] = $fp_foundation_version; 

		     foreach ($plugins as $plugin ) {
		          $plugins_array[ $plugin ] = plugins_url( '/assets/tinymce/plugins/', dirname(__FILE__) ) . $plugin . '/plugin.js';         
		     }
		     return $plugins_array;
		}

		public function fp_foundation_assistant_tinymce_buttons($buttons) {

			if ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6' )  { $fp_foundation_version = 'fp_foundation_6_button';}
			elseif ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-rtl' )  { $fp_foundation_version = 'fp_foundation_6_button';}
			elseif ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-flex' )  { $fp_foundation_version = 'fp_foundation_6_flex_button';}
			elseif ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-flex-rtl' )  { $fp_foundation_version = 'fp_foundation_6_flex_button';}
			elseif ( get_option('fp_foundation_versions', 'foundation6') == 'foundation5' )  { $fp_foundation_version = 'fp_foundation_5_button';}
			elseif ( get_option('fp_foundation_versions', 'foundation6') == 'foundation4' )  { $fp_foundation_version = 'fp_foundation_4_button';}
			elseif ( get_option('fp_foundation_versions', 'foundation6') == 'foundation3' )  { $fp_foundation_version = 'fp_foundation_3_button';}

			if ( get_option('fp_load_foundation_icons_checkbox', true) == true ) { $fp_foundation_icons = 'foundation_icons';  } else { $fp_foundation_icons = '';  }

		    array_unshift($buttons, $fp_foundation_version, $fp_foundation_icons);
		    return $buttons;
		 }

	}

	$tinymce_templates = new fp_foundation_assistant_tinymce_templates();	
}

