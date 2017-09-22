<?php

// Content Block
section_content_block();
function section_content_block() {
			
	$prefix = 'content_block';
	$prefix = set_field_prefix( $prefix );
	
 	$content = get_post_meta( get_the_ID(), sprintf( '%scontent', $prefix ), true );
	
	if( empty( $content ) ) {
		return false;
	}
	
 	$content = sprintf( '<div class="entry-content">%s</div>', apply_filters( 'pb_the_content', $content ) );
	
	$sidebar = get_post_meta( get_the_ID(), sprintf( '%ssidebar', $prefix ), true );
	
	if( !empty( $sidebar ) ) {
		ob_start();
		dynamic_sidebar( $sidebar );
		$sidebar = ob_get_contents();
		ob_end_clean();
		
		$sidebar = sprintf( '<div class="small-12 large-4 columns">%s</div>', $sidebar );
		$content = sprintf( '<div class="row"><div class="small-12 large-8 columns">%s</div>%s</div>', $content, $sidebar );
	}
	else {
		$content = sprintf( '<div class="column row">%s</div>', $content );
	}
	
	$attr = array( 'class' => 'section section-content' );
	_s_section_open( $attr );
		echo $content;
	_s_section_close();	
}