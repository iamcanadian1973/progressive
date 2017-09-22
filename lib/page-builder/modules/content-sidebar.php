<?php

function _s_get_content_sidebar( $sidebar ) {
	
	if( empty( $sidebar ) )
		return false;
	
	ob_start();
	dynamic_sidebar( $sidebar );
	$sidebar = ob_get_contents();
	ob_end_clean();
	
	return sprintf( '<div class="sidebar"><div class="widget-area">%s</div></div>', $sidebar );
}