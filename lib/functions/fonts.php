<?php

add_action( 'wp_enqueue_scripts', 'kr_load_google_fonts' );

function kr_load_google_fonts() {
	
	// change array as needed
	$font_families = array(
			'Open+Sans:400,600,700,800'
		);
	
	$query_args = array(
			'family' => implode( '|', $font_families ),
			'subset' => 'latin,latin-ext',
		);

	$fonts_url = add_query_arg( $query_args, '//fonts.googleapis.com/css' );
	
	if( !empty( $font_families ) ) {
		wp_enqueue_style( 'google-fonts', $fonts_url, array(), THEME_VERSION );
	}
	
	
}



//add_action( 'wp_enqueue_scripts', 'kr_load_local_fonts' );

function kr_load_local_fonts() {
	
	//wp_enqueue_style('dashicons');
	
	$fonts = array( 
			'font-awesome' => '//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css', // new url
			);
	
	foreach( $fonts as $name => $src ) {
		wp_enqueue_style( $name, $src, array(), THEME_VERSION );
	}
		
}

