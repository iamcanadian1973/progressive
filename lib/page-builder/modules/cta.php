<?php

function get_module_cta( $prefix = '', $post_id = false ) {
	
	$prefix = set_field_prefix( $prefix );
	
	if( !$post_id ) {
		$post_id = get_the_ID();
	}
		
	$out = '';
	
	// cta description
	$description = get_post_meta( $post_id, sprintf( '%sdescription', $prefix ), true );
	$description = _s_get_textarea( $description );
	
	
	// get the cta button
	$args['button_text'] = get_post_meta( $post_id, sprintf( '%sbutton_text', $prefix ), true );
	$args['button_link'] = get_post_meta( $post_id, sprintf( '%sbutton_link', $prefix ), true );
	$args['choose_page'] = get_post_meta( $post_id, sprintf( '%schoose_page', $prefix ), true );
	$args['url'] 		 = get_post_meta( $post_id, sprintf( '%surl', $prefix ), true );
	$args['link_target'] = get_post_meta( $post_id, sprintf( '%slink_target', $prefix ), true );
	$button = pb_get_cta_button( $args );
	
		
	if( !empty( $button ) ) {
		return sprintf( '<div class="row equal-height-columns"><div class="small-12 large-8 columns"><div class="entry-content">%s</div></div><div class="small-12 large-4 columns">%s</div></div>', $description, $button );
	}
		
}