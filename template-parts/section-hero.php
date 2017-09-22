<?php

/*
Hero
		
*/
	
// Hero
section_hero();
function section_hero() {

	$background_image = get_post_meta( get_the_ID(), 'hero_background_image', true );
	$heading = get_post_meta( get_the_ID(), 'hero_title', true );
	$description = get_post_meta( get_the_ID(), 'hero_description', true );
	$sidebar = get_post_meta( get_the_ID(), 'hero_sidebar', true );
 	$content = '';
	
	if( !empty( $background_image ) ) {
		$attachment_id = $background_image;
		$size = 'hero';
		$background = wp_get_attachment_image_src( $attachment_id, $size );
		$background_image = sprintf( 'background-image: url(%s);', $background[0] );
		}
	
			
	if( !empty( $heading ) ) {
		$content .= sprintf( '<header class="hero-header"><h1>%s</h1></header>', $heading );
	}
	
	if( !empty( $description ) ) {
		$content .= sprintf( '<div class="hero-description">%s</div>', wpautop( $description ) );
	}
	
	$content = sprintf( '<div class="hero-content">%s</div>', $content );
	
		
	// Get sidebar if it exists	
	$sidebar = _s_get_content_sidebar( $sidebar );
	
	if( !empty( $sidebar ) ) {
		$secondary = $sidebar;
	}
	
	if( !empty( $secondary ) ) {
		$secondary = sprintf( '<div class="small-12 large-4 columns">%s</div>', $secondary );	
		$content = sprintf( '<div class="row"><div class="small-12 large-8 columns">%s</div>%s</div>', $content, $secondary );
	}
	else {
		$content = sprintf( '<div class="row"><div class="small-12 columns">%s</div></div>', $content );
	}
		
	
	$attr = array( 'class' => 'section section-hero flex no-margin-bottom', 'style' => $background_image );
	_s_section_open( $attr );
		echo $content;
	_s_section_close();	
}