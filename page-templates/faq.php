<?php
/*
Template Name: FAQ
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
	
	
	// FAQ
	section_faq();
	function section_faq() {
		
		$heading = '<h2>Questions & Answers</h2>';
		
		
		$content = '';
		
		$faq_links = '';
		
		$faq_terms = get_terms( 'faq_cat' );
		
		foreach ( $faq_terms as $term_key => $term ) {
			
			$loop = new WP_Query( array(
				'post_type' => 'faq',
				'order' => 'ASC',
				'orderby' => 'menu_order',
				'tax_query' => array(
					array(
						'taxonomy' => 'faq_cat',
						'field' => 'slug',
						'terms' => array( $term->slug ),
						'operator' => 'IN'
					)
				)
			) );
			
			
			if ( $loop->have_posts() ) : 
								
				$faq_links .= sprintf( '<li><a href="#%s">%s</a></li>', sanitize_title( $term->slug ), $term->name );
				
				$content .= sprintf( '<h3 id="%s">%s</h3>', sanitize_title( $term->slug ), $term->name );
				$content .= '<ul class="accordion" data-accordion="faq" data-multi-expand="false" data-allow-all-closed="true">';
				while ( $loop->have_posts() ) : $loop->the_post();
					
					$active = '';
				
					if( !$term_key && !$loop->current_post ) {
						$active = ' is-active';
					}
					
					$id = sprintf( 'faq-%s', get_the_ID() );
					
					$accordion_title = sprintf( '<a href="#%s-accordion-content" class="accordion-title"><h5>%s</h5></a>', $id, get_the_title() );
					$accordion_content = sprintf( '<div class="accordion-content" id="%s-accordion-content" data-tab-content><div>%s</div></div>', $id,  apply_filters( 'pb_the_content', '<strong>ANSWER: </strong> ' . get_the_content()) );
					
					$content .= sprintf( '<li id="%s-accordion-tab" class="accordion-item%s" data-accordion-item>%s%s</li>', $id, $active, $accordion_title, $accordion_content );
				endwhile; 
				$content .= '</ul>';
			endif;
			
			// Reset things, for good measure
			$loop = null;
			wp_reset_postdata();
		}
		
		if( empty( $content ) ) {
			return false;
		}
		
		$faq_links = sprintf( '<ul class="faq-links">%s</ul>', $faq_links );
		
		$attr = array( 'class' => 'section section-faq' );
		_s_section_open( $attr );
			printf( '<div class="column row"><div class="entry-content">%s%s</div></div>', $heading, $faq_links );
			printf( '<div class="column row">%s</div>', $content );
		_s_section_close();	
	}
	
	?>
	</main>


</div>

<?php
get_footer();
