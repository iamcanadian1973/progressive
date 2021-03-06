<?php
/**
 * Template part for displaying page content in page.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'column row' ); ?>>

	<div class="wrap">
	
	<header class="entry-header">
		<?php
		global $post;
		
		$heading = get_the_title();
		$subheading = '';
		
		if( !empty( $post->heading ) ) {
			$heading = $post->heading;
		}
		
		printf( '<h1>%s</h1>', _s_wrap_text( $heading, '#', 'strong' ) );
		
		if( !empty( $post->subheading ) ) {
			printf( '<h4>%s</h4>', _s_wrap_text( $post->subheading ) );
		}
		
		?>
 	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', '_s' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php
		edit_post_link(
			sprintf(
				/* translators: %s: Name of current post */
				esc_html__( 'Edit %s', '_s' ),
				the_title( '<span class="screen-reader-text">"', '"</span>', false )
			),
			'<span class="edit-link">',
			'</span>'
		);
	?>
	</footer><!-- .entry-footer -->
	
	</div>
	
</article><!-- #post-## -->
