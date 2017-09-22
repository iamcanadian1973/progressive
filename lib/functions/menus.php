<?php

add_filter('nav_menu_css_class', 'clear_nav_menu_item_class', 10, 3);
function clear_nav_menu_item_class($classes, $item, $args) {
    	
	if( is_front_page() && ( $args->theme_location == 'primary' ) ) {
		$classes = array_filter($classes, "remove_parent_classes");
	}
	
	return $classes;
}

add_filter('nav_menu_css_class', 'set_current_menu_class',1,2); 
function set_current_menu_class($classes) {
	global $post;
	
	/*
	if( _s_is_page_template_name( 'find-an-agent' ) || is_post_type_archive( 'agent' ) || is_singular( 'agent' ) ) {
		
		$classes = array_filter($classes, "remove_parent_classes");
		
		if ( in_array('menu-item-206', $classes ) )
			$classes[] = 'current-menu-item';
	}
	*/
			
	return $classes;
}

// check for current page classes, return false if they exist.
function remove_parent_classes($class){
  return in_array( $class, array( 'current_page_item', 'current_page_parent', 'current_page_ancestor', 'current-menu-item' ) )  ? FALSE : TRUE;
}



function _s_is_page_template_name( $template_name ) {
	
	if( is_page() ) {
		$template_found = str_replace( '.php', '', basename( get_page_template_slug( get_queried_object_id() ) ) );
		return $template_name === $template_found ? true : false;
	}
	
}
