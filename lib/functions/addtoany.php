<?php

add_action( 'wp_enqueue_scripts', 'load_addtoany_scripts', 15 );
function load_addtoany_scripts() {
		wp_register_script( 'addtoany', '//static.addtoany.com/menu/page.js', FALSE, NULL, TRUE );
 		//wp_register_script( 'addtoany-config', THEME_JS . '/addtoany-config.js', array('addtoany'), NULL, TRUE );
		wp_register_script( 'agents-addtoany-config', trailingslashit( THEME_JS ) . 'agents-addtoany-config.js', array('addtoany'), '', true );	
		
		if( is_post_type_archive( 'agent' ) ) {
 			wp_enqueue_script( 'addtoany' );
			wp_enqueue_script( 'agents-addtoany-config' );
		}
}

function addtoany_share( $label = 'Share' ) {
	return sprintf( '<span class="social-share">
					<a class="a2a_dd" href="https://www.addtoany.com/share">%s &nbsp;&nbsp;<i class="ion-icons ion-android-share-alt"></i></a></span>', $label );
	
}

// Social icons used in header/footer
function _s_get_addtoany_share_icons( $url = '', $title = '',  $show_share_icon = false, $custom = '' ) {
	
	global $post;
	
	$socials = array(
			'email'       => 'email',
			'facebook'    => 'facebook',
			'twitter'     => 'twitter',
			'linkedin'    => 'linkedin',
 	);
	
	
	$anchor_class = 'a2a_button_'; // a2a_button_
	
	$list = '';
	
	if( $show_share_icon ) {
		$list .= '<li><a class="a2a_dd" href="https://www.addtoany.com/share"><i class="fa fa-share-alt-square" aria-hidden="true"></i></a></li>';
	}
	
	foreach( $socials as $network => $icon ) {
		
		
		$list .= sprintf('<li class="%1$s"><a class="%2$s%1$s"><i class="icon icon-%3$s" aria-hidden="true"></i><span class="screen-reader-text">%3$s</span></a></li>', $network, $anchor_class, $icon );	
	}
	
	$list .= $custom;
		
	return sprintf( '<ul class="share-icons a2a_kit clearfix" data-a2a-url="%s" data-a2a-title="%s">%s</ul>', $url, $title, $list );
}


function _s_get_addtoany_share_email( $url = '', $title = '' ) {
	
	global $post;
		
	$icon = 'share';
	
	$share = sprintf('<a class="share a2a_button_email"><i class="icon icon-share" aria-hidden="true"></i><span>Email this listing</span></a></li>', $icon );	
	
		
	return sprintf( '<div class="a2a_kit clearfix" data-a2a-url="%s" data-a2a-title="%s">%s</div>', $url, $title, $share );
}


