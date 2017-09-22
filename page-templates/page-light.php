<?php
/*
Template Name: Page - Light
*/

get_header(); ?>

<div class="section background-light left-bar">
  	 
	<div id="primary" class="content-area">

		<main id="main" class="site-main" role="main">
			<?php
			while ( have_posts() ) :

				the_post();

				get_template_part( 'template-parts/content', 'page' );

			endwhile; ?>

		</main>

	</div>
  
</div>

<?php
get_footer();
