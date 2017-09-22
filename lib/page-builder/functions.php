<?php

function set_field_prefix( $prefix = '' ) {
	if( empty( $prefix ) ) {
		return '';
	}
	
	$prefix = rtrim( $prefix, '_' );
	
	return $prefix . '_';
}

function _s_get_heading( $title, $wrap = 'h2', $attr = array() ) {
	
	if( empty( $title ) ) {
		return false;	
	}
	
	$args = array(
		'open'    => "<{$wrap} %s>",
		'close'   => "</{$wrap}>",
		'content' => $title,
		'context' => ' ',
		'attr'    => $attr,
		'params'  => array(
			'wrap'  => $wrap,
		),
		'echo'    => false,
	);
	
	$output =  _s_markup( $args );
	
	return $output;
}


function _s_get_textarea( $text ) {
	
	if( empty( $text ) ) {
		return false;
	}
	
	return wpautop( $text );
}


function pb_get_cta_button( $button = array(), $prefix = '' ) {
	
	$button_text =  $button[$prefix.'button_text'];
	$button_link =  $button[$prefix.'button_link'];
	$choose_page =  $button[$prefix.'choose_page'];
	$url 		 =  $button[$prefix.'url'];
	$link_target =  $button[$prefix.'link_target'];
	
	$link = '';
		   
	if ( $button_link == 'Page' ) { 
		$link = $choose_page;
	} elseif ( $button_link == 'Absolute URL' ) {
		$link = $url;
	} 

	if ( $button_link == 'Absolute URL' && $link_target == 'New Tab') {
		$target= ' target="_blank"';
	} else {
		$target = '';
	};
	
	if( empty( $button_text ) && empty( $link ) ) {
		return false;	
	}	
	
	return sprintf('<a class="btn" href="%s" %s><span>%s</span></a>', $link, $target, $button_text );
}


function pb_get_cta_link( $button, $class = "link"  ) {
	
	$button_text =  $button['button_text'];
	$button_link =  $button['button_link'];
	$choose_page =  $button['choose_page'];
	$url 		 =  $button['url'];
	$link_target =  $button['link_target'];
	
	$link = '';
		   
	if ( $button_link == 'Page' ) { 
		$link = $choose_page;
	} elseif ( $button_link == 'Absolute URL' ) {
		$link = $url;
	} 

	if ( $button_link == 'Absolute URL' && $link_target == 'New Tab') {
		$target= ' target="_blank"';
	} else {
		$target = '';
	};
	
	if( empty( $button_text ) && empty( $link ) ) {
		return false;	
	}

	return sprintf('<a class="%s" href="%s" %s><span>%s</span></a>', $class, $link, $target, $button_text );
}