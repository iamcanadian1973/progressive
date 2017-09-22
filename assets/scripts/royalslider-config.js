(function($) {
	'use strict';	
	
	
	
	var royalSlider, nav;
	
	var opts = {
		transitionType: 'fade',
		controlNavigation:'bullets',
		imageScaleMode: 'fill',
		imageAlignCenter:true,
		arrowsNav: false,
		arrowsNavAutoHide: true,
		sliderTouch: true,
		sliderDrag:false,
		arrowsNavHideOnTouch: false,
		fullscreen: false,
		loop: true,
		autoScaleSlider: true, 
		autoScaleSliderWidth: 1500,     
		autoScaleSliderHeight: 592,
		slidesSpacing: 0,
		keyboardNavEnabled: false,
		navigateByClick: false,
		fadeinLoadedSlide: true,
		globalCaption:false,
		imgWidth: 1500,
		imgHeight: 592,
		
		autoPlay: {
				// autoplay options go gere
				enabled: true,
				pauseOnHover: false,
				delay: 5000
			}
	  };
	
   	$('.royalSlider').royalSlider(opts);
	
	// Show captions after slider init. Captions like to blink on load, so we fix this.
	$(".royalSlider").removeClass("preload");
		
	royalSlider = $(".royalSlider");
	
	$('.rsNav').appendTo('.slideshow');
  
   // hide single slider nav
	nav = royalSlider.find('.rsNav'); 
	if (nav.length && royalSlider.data('royalSlider').numSlides <= 1) { 
		nav.hide();
	}
		
	
})(jQuery);
