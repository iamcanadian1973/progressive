<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */

get_header(); ?>

<?php
// Hero
$args = array(
	'post_type'      => 'page',
	'p'				 => 145,
	'posts_per_page' => 1,
	'post_status'    => 'publish'
);

// Use $loop, a custom variable we made up, so it doesn't overwrite anything
$loop = new WP_Query( $args );

// have_posts() is a wrapper function for $wp_query->have_posts(). Since we
// don't want to use $wp_query, use our custom variable instead.
if ( $loop->have_posts() ) : 
	while ( $loop->have_posts() ) : $loop->the_post(); 
	
		get_template_part( 'template-parts/section', 'hero' );
 
	endwhile;
endif;

// We only need to reset the $post variable. If we overwrote $wp_query,
// we'd need to use wp_reset_query() which does both.
wp_reset_postdata();


// Breadcrumbs
get_template_part( 'template-parts/section', 'breadcrumb' );
?>

<div id="primary" class="content-area">

	<main id="main" class="site-main" role="main">
		<?php
		$paged = get_query_var('paged') ? get_query_var('paged') : 1;
		
		if ( have_posts() ) : ?>

			<header class="page-header">
				<?php
				printf( '<h1 class="page-title">%s</h1>', __( 'Blog' ) );	
				?>
			</header>

			<?php
			while ( have_posts() ) :

				the_post();

				get_template_part( 'template-parts/content', 'post' );

			endwhile;
			

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif; ?>

	</main>

</div>

	

<?php
get_footer();
