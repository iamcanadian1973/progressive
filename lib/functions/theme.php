<?php

/**
 * Custom Body Class
 *
 * Add additional body classes to pages for targeting.
 *
 * @param array $classes
 * @return array
 */
function _s_add_custom_body_class( $classes ) {
	
	$body_class = '';
	
 	if( wp_is_mobile() ) {
		$body_class = 'mobile';
	}
	
	
	
	// If exists add body class
	if( !empty( $body_class ) ) {
		$classes[] = $body_class;
	}
	
	return $classes;
}
add_filter( 'body_class', '_s_add_custom_body_class' );


function _s_get_scroll_down_arrow() {
	return '<span class="scroll-down-arrow svg" style="transition-property: all; transition-duration: 0s; transition-timing-function: ease; display: block; opacity: 1;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.99 29.33"><path class="a" d="M9.17,29.34H7.83A7.84,7.84,0,0,1,0,21.5V7.84A7.84,7.84,0,0,1,7.83,0H9.16A7.84,7.84,0,0,1,17,7.84V21.5A7.84,7.84,0,0,1,9.17,29.34ZM7.83,1A6.84,6.84,0,0,0,1,7.83V21.5a6.84,6.84,0,0,0,6.83,6.83H9.16A6.84,6.84,0,0,0,16,21.5V7.84A6.84,6.84,0,0,0,9.16,1H7.83Z" transform="translate(0 -0.01)"></path><path class="scroller" d="M8.5,11.79a2.78,2.78,0,0,1,2.88,2.88A2.82,2.82,0,0,1,8.5,17.55a2.89,2.89,0,0,1-2.88-2.88A2.85,2.85,0,0,1,8.5,11.79Z" transform="translate(0 -0.01)"></path></svg></span>';	
}


function _s_wrap_text( $string, $search = '#', $replace = 'span' ) {
	// add span and balance tags
 	$string = force_balance_tags( str_replace( '#', sprintf('<%s>', $replace), $string ) );
	// remove empty tags
	return str_replace( sprintf('<%1$s></%1$s>', $replace), '', $string );
}
