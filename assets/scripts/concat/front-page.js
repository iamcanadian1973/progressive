(function($) {
	
	'use strict';
	
	// Cache selectors
	var id,
		lastId,
	    reSmooth = /^#section-/,
		menu_items = $("#site-navigation").find('a[href^="/#"]'),
	 	// scrollItems includes all of the container divs that relate to menu items.
	 	scrollItems = menu_items.map( function() {
			var href = $(this).attr("href").replace(/^\//, '');
 	   		var item = $( href.replace(reSmooth, '') );
  			if ( item.length ) { 
				return item;
			}
	 });
	
 	// add link modifier to remove jump
	$('.home .nav-primary a[href^="/#"]').each( function() {
		$(this).attr('href', function() {
		  	var href = $(this).attr("href").replace(/^\//, '');
	   		var item = $( href );
  			if ( item.length ) { 
				return '/#section-' + href.slice(1);
			}
 		});
	});
	
	// On page load smooth scroll
	/*
 	if (reSmooth.test(location.hash)) {
	  // Strip the "#smoothScroll" part off (and put "#" back on the beginning)
	  id = '#' + location.hash.replace(reSmooth, '');
	  $.smoothScroll({
			scrollTarget: id
		});
	}
	*/
	
	// On page smooth scroll menu
	
	$('.home .nav-primary a[href^="/#"]').on('click', function() {
	  
	  	var href = $(this).attr("href");
		href = href.replace('/#', '');
		href = href.replace('section-', '');
		//console.log(href);
	   	var item = $( '#' + href );
  		if ( ! item.length ) { 
			return false;
		}
	  
	  	$.smoothScroll({
			offset: 0,
			scrollTarget: '#' + href
	  	});
	  	return false;
	});
	

	// ======================================
	// Helper functions
	// ======================================
	
	// Get section or article by href
	function getRelatedContent(el){
	  return $($(el).attr('href'));
	}
	// Get link by section or article id
	function getRelatedNavigation(el){
	  return $('nav a[href="/#section-'+$(el).attr('id')+'"]');
	}
	
	// ======================================
	// Waypoints: change site header background, set current link
	// ======================================

	$('.home .section').each(function(){
		
		var $header = $('.site-header');
		var self = $(this);
	
		$(this).waypoint({
			 handler: function(direction){
				if( direction  === 'down' ) {
					//console.log('triggered going down');
					$header.removeClass().addClass('site-header ' + self.data('active') );
				}
				
				//console.log(getRelatedNavigation(self));
				getRelatedNavigation(self).parent().toggleClass('current-menu-item', direction === 'down');
			 },
			 offset: 0
		});
		
		$(this).waypoint({
			 handler: function(direction){
				if( direction  === 'up' ) {
					//console.log('triggered going up');
					$header.removeClass().addClass('site-header ' + self.data('active') );
				}
				
				getRelatedNavigation(self).parent().toggleClass('current-menu-item', direction === 'up');
			 },
			 offset: function() {  return -self.height() + 0; }
		});
		
		
	});
	
	
 	/*
	// If supported by the browser we can also update the URL
    if (window.history && window.history.pushState) {
      history.pushState("", document.title, id);
    }
	*/
 		
	
})(jQuery);

