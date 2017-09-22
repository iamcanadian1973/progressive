<?php

define( 'AUTO_QUOTE_FORM_URL', get_permalink( 872 ) );
define( 'FIND_AGENT_SEARCH_URL',  '/find-an-agent/' );
define( 'GOOGLE_API_KEY',  'AIzaSyBRER6JAdae-rf2CqkJJ31JPWQG_yHDFSA' );
  
/****************************************
	Enqueue theme stylesheet
	*****************************************/
 
add_action( 'wp_enqueue_scripts', 'kr_enqueue_stylesheet', 15 );
function kr_enqueue_stylesheet() {

	$version = defined( 'THEME_VERSION' ) && THEME_VERSION ? THEME_VERSION : '1.0';
	$handle  = defined( 'THEME_NAME' ) && THEME_NAME ? sanitize_title_with_dashes( THEME_NAME ) : 'theme';
	
	//$stylesheet = SCRIPT_DEBUG === true ? 'style.css' : 'style.min.css';
	$stylesheet = 'style.css';

	wp_enqueue_style( $handle, trailingslashit( THEME_URL ) . $stylesheet, false, $version );

}
 
/****************************************
	Image Sizes
	*****************************************/
	
add_image_size( 'hero', 1200, 999 ); 
add_image_size( 'thumbnail-leadership', 270, 270, array( 'center', 'top' ) ); 
//add_image_size( 'banner', 1500, 1500 );
//add_image_size( 'event-thumbnail', 450, 286, array( 'center', 'top' ) ); 
//add_image_size( 'homepage-link-thumbnail', 640, 540, array( 'center', 'top' ) ); 
add_image_size( 'help-thumbnail', 1200, 9999 ); 


add_image_size( 'slide', 1440, 999999 ); // 960 x 398 upload @ 1920 x 999999

add_filter( 'image_size_names_choose', 'my_custom_sizes' );

function my_custom_sizes( $sizes ) {
    return array_merge( $sizes, array(
        'help-thumbnail' => __( 'Publishing Help thumbnail' ),
    ) );
}