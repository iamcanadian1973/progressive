<?php

/**
*  Creates ACF Options Page(s)
*/


if( function_exists('acf_add_options_sub_page') ) {
	
	acf_add_options_page(array(
		'page_title' 	=> 'Theme Settings',
		'menu_title' 	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-settings',
		'capability' 	=> 'edit_posts',
		'position' => 40,
		'redirect' 	=> true
	));
	
	
	acf_add_options_sub_page(array(
		'parent' 		=> 'theme-settings',
		'page_title' 	=> 'Social Profiles',
		'menu_title' 	=> 'Social Profiles',
		'menu_slug' 	=> 'social',
		'capability' 	=> 'edit_posts',
	));
	
}


/**
 * Hide Advanced Custom Fields to Users
 */
//add_filter('acf/settings/show_admin', 'remove_acf_menu');
function remove_acf_menu( $show ){
    // provide a list of usernames who can edit custom field definitions here
    $admins = array( 'admin', 'kyle' );
 
    // get the current user
    $current_user = wp_get_current_user();
	
	return in_array( $current_user->user_login, $admins );
}


function get_acf_image( $field, $size, $background = FALSE ) {
				
	if( empty( $field ) )
		return FALSE;
		
	var_dump($field);
			
	$url = $field['url'];
	$alt = $field['alt'];
						
					
	if( wp_is_mobile() ) {
						
		$size = 'large';
	}
				
	$thumb = $field['sizes'][ $size ];
	$width = $field['sizes'][ $size . '-width' ];
	$height = $field['sizes'][ $size . '-height' ];
	
	if( $background )
		return $thumb;	
	
	return sprintf('<img src="%s" width="%s" height="%s" alt="%s" />', $thumb, $width, $height, $alt );
}


function acf_oembed( $iframe ) {
	
	
	// use preg_match to find iframe src
	preg_match('/src="(.+?)"/', $iframe, $matches);
	$src = $matches[1];
	
	
	// add extra params to iframe src
	$params = array(
		'controls'    => 1,
		'hd'        => 1,
		'autohide'    => 1,
		'rel' => 0
	);
	
	$new_src = add_query_arg($params, $src);
	
	$iframe = str_replace($src, $new_src, $iframe);
	
	
	// add extra attributes to iframe html
	$attributes = 'frameborder="0"';
	
	$iframe = str_replace('></iframe>', ' ' . $attributes . '></iframe>', $iframe);
	
	$iframe = sprintf( '<div class="embed-container">%s</div>', $iframe );
	
	
	// echo $iframe
	return $iframe;	
}