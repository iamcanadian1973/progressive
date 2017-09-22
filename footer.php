<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */
?>

</div><!-- #content -->

<div id="contact"></div>		
<footer id="colophon" class="site-footer" role="contentinfo">

	<?php
		$footer_logo = sprintf('<img src="%s" width="160" height="35" alt="%s"/>', THEME_IMG .'/logo.svg', get_bloginfo( 'name' ) );
		$site_url = site_url();
		$footer_logo = sprintf('<div class="footer-logo"><a href="%s" title="%s">%s</a></div>', $site_url, get_bloginfo( 'name' ), $footer_logo );
		$footer_heading = '<h4>How Can We Help You?</h4>';
		printf( '<div class="column row">%s%s</div>', $footer_logo, $footer_heading );
	?>
	
	<div class="contacts">
			
		<div class="row small-up-1 medium-up-2 xxlarge-up-4">
			<div class="column">
				<h5>Head Office</h5>
				<?php
				printf( '<p><a href="mailto:%1$s">%1$s</a><p>', antispambot( 'info@progressive-sealing.com' ) );
				print( '<p><a href="tel:6042631562">604 263 1562</a> &bull; TF: <a href="tel:18772631562">1 877 263 1562</a></p>' );
				?>
			</div>
			
			<div class="column">
				<h5>Sales</h5>
				<?php
				printf( '<p><a href="mailto:%1$s">%1$s</a><p>', antispambot( 'sales@progressive-sealing.com' ) );
				print( '<p><a href="tel:6042631562">604 263 1562</a></p>' );
				?>
			</div>
			
			<div class="column">
				<h5>Service Center</h5>
				<?php
				printf( '<p><a href="mailto:%1$s">%1$s</a><p>', antispambot( 'service@progressive-sealing.com' ) );
				print( '<p><a href="tel:6043731562">604 373 1562</a></p>' );
				?>
			</div>
			
			<div class="column">
				<h5>Reordering</h5>
				<?php
				printf( '<p><a href="mailto:%1$s">%1$s</a><p>', antispambot( 'orders@progressive-sealing.com' ) );
				print( '<p><a href="tel:6042638923">604 263 8923</a></p>' );
				?>
			</div>
			
		</div>
			
	</div>	
	
	<div class="column row">
					
		
			
		<div class="footer-address">
			<p><strong>Head Office:</strong> 8723 Cambie St. Vancouver, BC  V3S 8E5  Canada</p>
			<p><strong>Service Centre:</strong> 107 &amp; 108 - 18669 52nd Avenue, Surrey, BC  V3S 8E5  Canada</p>
 		</div><!-- .footer-address -->
		
		<div class="copyright">
			<p><span>&copy; <?php echo date( 'Y' );?> Progressive Sealing. All Rights Reserved.</span> <b>&bull;</b> website design by <a href="http://www.umbrellasquared.com/">Umbrella<sup>2</sup> Design Group</a></p>
		</div>
	
	</div>


</footer><!-- #colophon -->

</div><!-- /.off-canvas-content -->

<?php wp_footer(); ?>
</body>
</html>
