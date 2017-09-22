<?php

/**
 * Module - List
 *
 *
 * @param string $prefix - ACF clone prefix
 *
 * @return formatted list
 */
function kr_module_get_list( $prefix = '' ) {
	
	$prefix = set_field_prefix( $prefix );
	
	$rows = get_field( sprintf( '%slist', $prefix ) );
		
	if( empty( $rows ) ) {
		return;
	}
	
	$list_items = _kr_get_list_items( $prefix );
	
	return sprintf( '<ul class="list">%s</ul>', $list_items );
}

//* get list items
function _kr_get_list_items( $prefix = '', $ret = 'string' ) {
	
	$prefix = set_field_prefix( $prefix );
	
	$rows = get_field( sprintf( '%slist', $prefix ) );
		
	if( empty( $rows ) ) {
		return;
	}
	
	$list_items = array();
	
	foreach( $rows as $row ) {
		$list_title = $row['list_title'];
		if( $list_title ) {
			$list_title = _s_get_heading( $list_title, 'h5' );
		}
		$list_description = isset(  $row['list_description'] ) ? $row['list_description']: '';
		
		$list_items[] = sprintf( '<li>%s%s</li>', $list_title, $list_description );
	}
	
	if( $ret == 'string' ) {
		return implode( '', $list_items );
	}
	
	return $list_items;
}