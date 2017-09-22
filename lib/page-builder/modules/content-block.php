<?php

function kr_module_get_content_block( $prefix = '' ) {
		
	$prefix = set_field_prefix( $prefix );
		
	$heading = get_post_meta( get_the_ID(), sprintf( '%sheading', $prefix ), true );
	$heading = _s_get_heading( $heading );
					
	$content = get_post_meta( get_the_ID(), sprintf( '%scontent', $prefix ), true );
	$content = _s_get_textarea( $content );
	
  	$photo = get_post_meta( get_the_ID(), sprintf( '%sphoto', $prefix ), true );
	if( $photo ) {
		$photo = wp_get_attachment_image( $photo, 'full' );
	}
	
	return sprintf( '%s<div class="entry-content">%s%s</div>', $photo, $heading, $content );
}