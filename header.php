<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
<link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="/favicons/manifest.json">
<link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5 ">
<meta name="theme-color" content="#ffffff ">
</head>

<body <?php body_class(); ?>>

<div class="off-canvas position-left" id="offCanvas" data-transition="overlap" data-off-canvas>	
	<nav class="nav-secondary" role="navigation">
		<div class="wrap">
 			<!--<button class="close-button" aria-label="Close menu" type="button" data-close>
			  <span aria-hidden="true">&times;</span>
			</button>-->
			<?php
				// Desktop Menu
				$args = array(
					'theme_location' => 'secondary',
					'menu' => 'Secondary Menu',
					'container' => 'false',
					'container_class' => '',
					'container_id' => '',
					'menu_id'        => 'secondary-menu',
					'menu_class'     => 'menu',
					'before' => '',
					'after' => '',
					'link_before' => '',
					'link_after' => '',
					'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
					'depth' => 0
				);
				wp_nav_menu($args);						
				
			?>
			
		</div>
	</nav><!-- .nav-secondary -->			
	
</div>

<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', '_s' ); ?></a>

	<header id="masthead" class="site-header" role="banner">

		<div class="column row expanded">
		
			<div class="wrap">
			
				<button type="button" class="menu-toggle" data-toggle="offCanvas">
				<div class="hamburger">
				  <span></span>
				  <span></span>
				  <span></span>
				  <span></span>
				</div><span>Menu</span></button>
				
				<nav id="site-navigation" class="nav-primary" role="navigation">
 						<?php
							// Desktop Menu
							$args = array(
								'theme_location' => 'primary',
								'menu' => 'Primary Menu',
								'container' => 'false',
								'container_class' => '',
								'container_id' => '',
								'menu_id'        => 'primary-menu',
								'menu_class'     => 'menu',
								'before' => '',
								'after' => '',
								'link_before' => '',
								'link_after' => '',
								'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
								'depth' => 0
							);
							wp_nav_menu($args);						
							
						?>
 				</nav><!-- #site-navigation -->
					
				<div class="site-branding">
	
					<?php		
					$logo = sprintf('<img src="%s" width="160" height="35" alt="%s"/>', THEME_IMG .'/logo.svg', get_bloginfo( 'name' ) );
					$site_url = site_url();
					printf('<div class="site-title"><a href="%s" title="%s">%s</a></div>', $site_url, get_bloginfo( 'name' ), $logo );
					?>
	
				</div><!-- .site-branding -->
			</div>
		
		</div><!-- .column.row -->
		
	</header><!-- #masthead -->

<div class="off-canvas-content" data-off-canvas-content>

<div id="page" class="site-container">
		
	<div id="content" class="site-content">