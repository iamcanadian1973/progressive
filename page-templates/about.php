<?php
/*
Template Name: About
*/

get_header(); ?>

<?php
// Hero
get_template_part( 'template-parts/section', 'hero' );
	
// Breadcrumbs
get_template_part( 'template-parts/section', 'breadcrumb' );
?>

<div id="primary" class="content-area">

	<main id="main" class="site-main" role="main">
	<?php
		
	// Overview
	get_template_part( 'template-parts/section', 'overview' );
	
	
	// Story
	section_story();
	function section_story() {
				
		$prefix = 'our_story';
		$prefix = set_field_prefix( $prefix );
		$heading = get_post_meta( get_the_ID(), sprintf( '%sheading', $prefix ), true );
		$heading = _s_get_heading( $heading );
		
		// reset prefix
		$prefix = 'our_story';
		$grid = '';
		$grid_args = array( 'prefix' => $prefix , 'image_size' => 'thumbnail' ); 
		$grid_items = _kr_get_grid_items( $grid_args );
		if( empty( $grid_items ) ) {
			return false;
		}
		
		$grid = sprintf( '<div class="row small-up-1 grid">%s</div>', $grid_items );
		
		$attr = array( 'class' => 'section section-our-story' );
		_s_section_open( $attr );		
			printf( '<div class="column row">%s%s</div>', $heading,  $grid );
		_s_section_close();	
			
	}
	
	
	// Community
	section_community();
	function section_community() {
					
		$prefix = 'community';
		$prefix = set_field_prefix( $prefix );
		
		$content = $secondary = '';
		
		$content = get_post_meta( get_the_ID(), sprintf( '%scontent', $prefix ), true );
		$photo = get_post_meta( get_the_ID(), sprintf( '%sphoto', $prefix ), true );
		$video = get_post_meta( get_the_ID(), sprintf( '%svideo', $prefix ), true );
		
		if( empty( $content ) ) {
			return false;
		}
		
		$content = sprintf( '<div class="entry-content">%s</div>', apply_filters( 'pb_the_content', $content ) );	
		
		$photo = get_post_meta( get_the_ID(), sprintf( '%sphoto', $prefix ), true );
				
		if( !empty( $photo ) ) {
			
			$size = 'medium';
			
			if( wp_is_mobile() ) {
				$size = 'thumbnail';
			}
			
			$photo = wp_get_attachment_image( $photo, $size );
			
			$secondary = $photo;	
		}
		
		if( !empty( $secondary ) ) {
			$secondary = sprintf( '<div class="small-12 large-5 columns">%s</div>', $secondary );	
			$content = sprintf( '<div class="row"><div class="small-12 large-7 columns">%s</div>%s</div>', $content, $secondary );
		}
		else {
			$content = sprintf( '<div class="column row">%s</div>', $content );
		}
		
		
		$attr = array( 'class' => 'section section-community' );
		_s_section_open( $attr );
			echo $content;
		_s_section_close();	
	}
	
	
	// Leadership
	section_leadership();
	function section_leadership() {
				
		$prefix = 'leadership';
		$prefix = set_field_prefix( $prefix );
		$heading = get_post_meta( get_the_ID(), sprintf( '%sheading', $prefix ), true );
		$heading = _s_get_heading( $heading );
		
		
		$grid = '';
		$grid_open = '<div class="grid-wrap"><div class="row small-up-1 medium-up-2 grid">';
		$grid_close = '</div></div>';
		$grid_items = _leadership_grid();
		if( empty( $grid_items ) ) {
			return false;
		}
		
		// parse the grid
		$i = 0;
		$max_columns = 2;
 		
		foreach( $grid_items as $grid_item ) {
			
			if ($i % $max_columns == 0 ) {
				$grid .= $grid_open;
				
			}
			
			$i++;
			
			$grid .= $grid_item;
			
			if( $i % $max_columns == 0 ) {
				$grid .= $grid_close;	
			}
			
		}
		
		if( $i % $max_columns != 0 ) {
			$grid .= $grid_close;
		}
		
		
		$attr = array( 'class' => 'section section-leadership' );
		_s_section_open( $attr );		
			printf( '<div class="column row">%s</div>', $heading );
 			echo $grid;
		_s_section_close();	

	}
	
	
	
	function _leadership_grid() {
		
		$prefix = 'leadership';
		$image_size = 'thumbnail-leadership';
		if( wp_is_mobile() ) {
			$image_size = 'thumbnail';
		}
				
		$title_tag = 'h3';
		
		$prefix = set_field_prefix( $prefix );
		
		$rows = get_field( sprintf( '%sgrid', $prefix ) );
			
		if( empty( $rows ) ) {
			return;
		}
		
		
		foreach ($rows as $row) {
			$ids[] = $row['photo'];
		}
		$cache = get_posts(array('post_type' => 'attachment', 'numberposts' => -1, 'post__in' => $ids));
	
		
		$list_items = [];
		
		foreach( $rows as $row ) {
			
			$photo = isset(  $row['photo'] ) ? $row['photo']: '';
					
			if( $photo ) {
				
				$linkedin_url = $row['linkedin_url'];
				if( !empty( $linkedin_url ) ) {
					$linkedin_url = sprintf( '<a href="%s" class="linkedin"><span></span><i class="screen-reader-text">LinkedIn</i></a>', $linkedin_url );
				}
				
				$photo = sprintf( '<div class="thumbnail">%s%s</div>', wp_get_attachment_image( $photo, $image_size ), $linkedin_url );
			}
			
			$first_name   = $row['first_name'];
			$last_name    = $row['last_name'];
			$name         = sprintf( '<h3>%s<span>%s</span></h3>', $first_name, $last_name );
			$job_title    = sprintf( '<p class="job-title">%s</p>', $row['job_title'] );
 				
 			$description  = $row['grid_description'];
						
			$list_items[] = sprintf( '<div class="column">%s<div class="entry-content">%s%s%s</div></div>', 
									$photo, $name, $job_title, $description );
		}
				
		return $list_items;	
	}
	
	
	// Sub Pages
	section_sub_pages();
	function section_sub_pages() {
				
		$prefix = 'sub_pages';
		$prefix = set_field_prefix( $prefix );
		
		$content = '';
	
		$rows = get_field( sprintf( '%sgrid', $prefix ) );
		$grid_items = '';
		
		if( !empty( $rows ) ) {
			foreach( $rows as $row ) {
 				$title = !empty(  $row['grid_title'] ) ? sprintf( '<%1$s>%2$s</%1$s>', 'h3', $row['grid_title'] ) : '';
				
				$description = isset(  $row['grid_description'] ) ? $row['grid_description']: '';
				
				// button
				$prefix = 'grid_cta_';
				$button = array();
				$button['button_text'] = $row[$prefix.'button_text'];
				$button['button_link'] = $row[$prefix.'button_link'];
				$button['choose_page'] = $row[$prefix.'choose_page'];
				$button['url']         = $row[$prefix.'url'];
				$button['link_target'] = $row[$prefix.'link_target'];
 				$button = pb_get_cta_button( $button );
				if( !empty( $button ) ) {
					$button = sprintf( '<p>%s</p>', $button );
				}
				
				
				$grid_items .= sprintf( '<div class="column"><div class="entry-content">%s%s%s</div></div>', 
										$title, $description, $button );
			}
	
	
		}
		
		if( !empty( $grid_items ) ) {
			$grid = sprintf( '<div class="row small-up-1 medium-up-2 grid">%s</div>', $grid_items );
			$content .= $grid;
		}
		
		
		// Sidebars
		$prefix = 'sub_pages';
		$prefix = set_field_prefix( $prefix );
		$sidebar = get_post_meta( get_the_ID(), sprintf( '%ssidebar', $prefix ), true );
		$secondary = _s_get_content_sidebar( $sidebar );
		
 	
		if( !empty( $secondary ) ) {
			$secondary = sprintf( '<div class="small-12 large-4 columns">%s</div>', $secondary );	
			$content = sprintf( '<div class="row"><div class="small-12 large-8 columns">%s</div>%s</div>', $content, $secondary );
		}
	
				
		$attr = array( 'class' => 'section section-sub-pages' );
		_s_section_open( $attr );
			echo $content;
		_s_section_close();	
	}
	?>
	</main>


</div>

<?php
get_footer();
