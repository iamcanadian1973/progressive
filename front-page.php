<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */

get_header(); ?>


<div id="primary" class="content-area">

	<main id="main" class="site-main" role="main">
	
		<div id="hero" class="section hero" data-active="">	
			<div class="element-with-video-bg jquery-background-video-wrapper flex">
				<video data-bgvideo="true" data-bgvideo-fade-in="2000" data-bgvideo-show-pause-play="false" class="my-background-video jquery-background-video" poster="<?php echo trailingslashit( THEME_IMG )?>screenshot.jpg"  autoplay muted loop>
				  <!-- WCAG general accessibility recommendation is that media such as background video play through only once. Loop turned on for the purposes of illustration; if removed, the end of the video will fade in the same way created by pressing the "Pause" button  -->
				
				<source src="<?php echo trailingslashit( THEME_IMG )?>343635634.mp4" type="video/mp4">
				</video>
				<div class="video-overlay"></div>
				<div class="wrap full-height">
					<div class="row">
						<div class="small-12 columns">
							<h1>Total System <strong>Solutions</strong></h1>
							<h4><strong>Serving western Canada's industries for</strong> over 35 years.</h4>
						</div>
					</div>
				</div>		
			</div>
						
		</div>
	
		<?php
		while ( have_posts() ) :

			the_post();

			?>
			<div id="mining" class="section flex left-bar down-arrow ha-waypoint" data-active="mining">
			
				<div class="wrap full-height">
			
					<div class="column row">
					
						<article>
													
							<header class="entry-header">
								<h1>Mining <strong>Industry</strong></h1>
								<h3>We Offer Full Service Solutions For 
		Abrasion Control For Your Wearing Parts.</h3>
							</header>
												
							<div class="entry-content">
							<p>Slurry pumps with increased efficiency, 
		as well as pipe and joint pieces, lined with our 
		hard-wearing, embedded ceramic coatings.</p>
		<p>+ download our industry brochure</p>
							</div>
						
						</article>
						
						<img src="//placehold.it/350x200" width="350" height="200" class="" alt="">
					
					</div>
			</div>
			
		</div>
		
		
		<div id="water-waste-water" class="section flex left-bar down-arrow ha-waypoint" data-active="water">
			
				<div class="wrap full-height">
			
					<div class="column row">
					
						<article>
						
							<header class="entry-header">
								<h1>Water & <strong>Waste Water</strong></h1>
								<h3>We Offer Full Service Solutions For  </h3>
							</header>
							
							<div class="entry-content">
							<p>Slurry pumps with increased efficiency, 
		as well as pipe and joint pieces, lined with our 
		hard-wearing, embedded ceramic coatings.</p>
		<p>+ download our industry brochure</p>
							</div>
						
						</article>
					
					</div>
			</div>
			
		</div>
		
		
		
		<div id="pulp-paper" class="section flex background-light left-bar down-arrow ha-waypoint" data-active="paper">
			
				<div class="wrap full-height">
			
					<div class="column row">
										
						<article>
													
							<header class="entry-header">
								<h1>Pulp & <strong>Paper</strong></h1>
								<h3>Present A Problem And We’ll Provide A Solution</h3>
							</header>
							
							<div class="entry-content">
							<p>Progressive Sealing offers a complete, 
		integrated line of U.S.-made tools, designed 
		to handle your packing maintenance with ease.</p>
		<p>+ download our industry brochure</p>
							</div>
						
						</article>
						
						<img src="<?php echo trailingslashit( THEME_IMG );?>seal.png" width="311" class="" alt="">
					
					</div>
			</div>
			
		</div>
			<?php

		endwhile; ?>
		
	</main>

</div>


<?php
get_footer();
