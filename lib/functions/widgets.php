<?php
// Plugin custom sidebars - chnage sidebar params
add_filter( 'widget_display_callback', 'kr_flexible_posts_widget_display_callback', 10, 3 );

function kr_flexible_posts_widget_display_callback($instance, $widget, $args) {
  
  if ( strpos( $args['id'], 'cs-' ) === FALSE ) {
	  return $instance;
  }
     
  $args['before_widget'] = sprintf( '<aside class="widget %s">', $widget->widget_options['classname'] );
  $args['after_widget'] = '</aside>';
  $args['before_title'] = '<h3 class="widget-title">';
  $args['after_title'] = '</h3>';
  
  $widget->widget($args, $instance);

  return false;
}