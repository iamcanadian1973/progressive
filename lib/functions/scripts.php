<?php

add_action( 'wp_enqueue_scripts', '_s_register_scripts' );
function _s_register_scripts() {
	
	wp_register_script( 'foundation', trailingslashit( THEME_JS ) . 'foundation.min.js', array('jquery'), '', true );
	//wp_register_script( 'front-page', trailingslashit( THEME_JS ) . 'front-page.js', array('jquery', 'project'), '', true );	
		
	
	$project_script_url = 'project.js';
						
	// Child Theme JS
	wp_register_script( 'project' , trailingslashit( THEME_JS ) . $project_script_url, 
			array(
					'jquery', 
					'wp-util',
					'foundation'
					), 
				NULL, TRUE );
}


// Load Scripts
add_action( 'wp_enqueue_scripts', '_s_load_scripts' );
function _s_load_scripts() {
 		wp_enqueue_script( 'project' );
}