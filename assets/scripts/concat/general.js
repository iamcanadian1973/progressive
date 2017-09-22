(function($) {
	
	'use strict';	
	
	// Load Foundation
	$(document).foundation();
	
	// touch events for main menu
	$( '.nav-primary li:has(ul)' ).doubleTapToGo();
	
	var $all_oembed_videos = $("iframe[src*='youtube'], iframe[src*='vimeo']");
	
	$all_oembed_videos.each(function() {
	
		var _this = $(this);
				
		if (_this.parent('.embed-container').length === 0) {
		  _this.wrap('<div class="embed-container"></div>');
		}
		
		_this.removeAttr('height').removeAttr('width');
 	
 	});
	
	
	// Open external links in new window (exclue mail and foobox)
	
	$('a').not('svg a, [href*="mailto:"], [class*="foobox"]').each(function () {
		var isInternalLink = new RegExp('/' + window.location.host + '/');
		if ( ! isInternalLink.test(this.href) ) {
			$(this).attr('target', '_blank');
		}
	});
	
	
	
	// Down arrows
	
	$( '.hero' ).append( '<span class="scroll-down scroll-mouse svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.99 29.33"><path class="a" d="M9.17,29.34H7.83A7.84,7.84,0,0,1,0,21.5V7.84A7.84,7.84,0,0,1,7.83,0H9.16A7.84,7.84,0,0,1,17,7.84V21.5A7.84,7.84,0,0,1,9.17,29.34ZM7.83,1A6.84,6.84,0,0,0,1,7.83V21.5a6.84,6.84,0,0,0,6.83,6.83H9.16A6.84,6.84,0,0,0,16,21.5V7.84A6.84,6.84,0,0,0,9.16,1H7.83Z" transform="translate(0 -0.01)"/><path class="scroller" d="M8.5,11.79a2.78,2.78,0,0,1,2.88,2.88A2.82,2.82,0,0,1,8.5,17.55a2.89,2.89,0,0,1-2.88-2.88A2.85,2.85,0,0,1,8.5,11.79Z" transform="translate(0 -0.01)"/></svg></span>' ); 
	
	$( '.down-arrow' ).append( '<span class="scroll-down scroll-arrow svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.01 9.01"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M12.94,7.35,6.71.09a.28.28,0,0,0-.41,0L.07,7.35a.27.27,0,0,0,0,.39l1.4,1.21A.27.27,0,0,0,1.67,9h0a.27.27,0,0,0,.19-.1L6.5,3.42l4.63,5.49a.27.27,0,0,0,.19.1.28.28,0,0,0,.2-.06l1.4-1.21a.28.28,0,0,0,0-.39Z"/></g></g></svg>' ); 
	
	
	$(window).scroll(function () {
		$('.section').each(function () {
			if (($(this).offset().top - $(window).scrollTop()) < -150) {
				$(this).find('.scroll-down').stop().fadeTo(100, 0);
			} else {
				$(this).find('.scroll-down').stop().fadeTo('fast', 1);
			}
		});
	});
	
	
	// Scroll to next section, scroll to footer on last seciton
	$('.scroll-down').on('click', function(){
 		
		var section = $(this).parent('.section');
		
		var next_section = section.next('.section');
 		
		if( section.is(':last-child') ) {
			next_section = $('.site-footer');
		}
		
		$.smoothScroll({
				offset: 0,
				scrollTarget: next_section,
			});
		
    }); 
	
	// close offcanvas when menu item is clicked
	$('.off-canvas li.menu-item.internal').click(function() { $('.off-canvas').foundation('close'); });

	
})(jQuery);

