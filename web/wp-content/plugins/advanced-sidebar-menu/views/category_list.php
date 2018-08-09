<?php

/**
 * The Output of the Advanced Sidebar Categories Widget
 *
 * @since  7.0.0
 *
 * To edit create a file named category_list.php and put in a folder in the your
 * theme called 'advanced-sidebar-menu' copy the contents of the file into that file and edit at will
 *
 * @notice Do NOT edit this file in this location or it will break on update
 */
$menu = Advanced_Sidebar_Menu_Menus_Category::get_current();
$child_terms = $menu->get_child_terms();
$content = '';

//Display parent category
if( $menu->include_parent() ){
	$content .= '<ul class="parent-sidebar-menu">';

	$list_args = $menu->get_list_categories_args( 'parent' );
	$content .= $menu->openListItem( wp_list_categories( $list_args ) );
}

if( !empty( $child_terms ) ){
	$content .= '<ul class="child-sidebar-menu">';

	//Always display child categories
	if( $menu->display_all() ){
		$list_args = $menu->get_list_categories_args( 'display-all' );
		$content .= wp_list_categories( $list_args );

	} else {
		foreach( $child_terms as $_term ){
			//Child terms
			if( $menu->is_first_level_term( $_term ) ){
				$list_args = $menu->get_list_categories_args( 'child', $_term );
				$content .= $menu->openListItem( wp_list_categories( $list_args ) );

				//Grandchild terms
				if( $menu->is_current_term_ancestor( $_term ) && $menu->has_children( $_term ) ){
					$content .= '<ul class="grandchild-sidebar-menu children">';

						$list_args = $menu->get_list_categories_args( 'grandchild', $_term );
						$content .= wp_list_categories( $list_args );

					$content .= '</ul>';
				}

				$content .= '</li>';
			}
		}
	}

	$content .= '</ul><!-- End .child-sidebar-menu -->';
}

if( $menu->include_parent() ){
	$content .= '</li></ul><!-- End .parent-sidebar-menu -->';
}

return $content;