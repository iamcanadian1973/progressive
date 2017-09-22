( function ( document, $, undefined ) {

	$( 'body' ).addClass( 'js' );

	'use strict';

	var progressive              = {},
 		subMenuButtonClass  = 'sub-menu-toggle';

	progressive.init = function() {
		var toggleButtons = {
			submenu : $( '<button />', {
				'class' : subMenuButtonClass,
				'aria-expanded' : false,
				'aria-pressed' : false,
				'role' : 'button'
				} )
				.append( $( '<span />', {
					'class' : 'screen-reader-text',
					text : progressive.params.subMenu
				} ) )
		};
  		$( 'nav .sub-menu' ).before( toggleButtons.submenu ); // add the submenu nav buttons
 		$( window ).on( 'resize.progressive', _doResize ).triggerHandler( 'resize.progressive' );
 		$( '.' + subMenuButtonClass ).on( 'click.progressive-subbutton', _submenuToggle );
	};


	// Change Skiplinks and Superfish
	function _doResize() {
		var buttons = $( 'button[id^=mobile-]' ).attr( 'id' );
		if ( typeof buttons === 'undefined' ) {
			return;
		}
 		_maybeClose( buttons );
	}

 
	/**
	 * action for submenu toggles
	 */
	function _submenuToggle() {

		var $this  = $( this ),
			others = $this.closest( '.menu-item' ).siblings();
		_toggleAria( $this, 'aria-pressed' );
		_toggleAria( $this, 'aria-expanded' );
		$this.toggleClass( 'activated' );
		$this.next( '.sub-menu' ).slideToggle( 'fast' );

		others.find( '.' + subMenuButtonClass ).removeClass( 'activated' ).attr( 'aria-pressed', 'false' );
		others.find( '.sub-menu' ).slideUp( 'fast' );

	}

	

	function _maybeClose( buttons ) {
		if ( 'none' !== _getDisplayValue( buttons ) ) {
			return;
		}
		$( '.sub-menu-toggle' )
			.removeClass( 'activated' )
			.attr( 'aria-expanded', false )
			.attr( 'aria-pressed', false );
		$( '.sub-menu' )
			.attr( 'style', '' );
	}

	/**
	 * generic function to get the display value of an element
	 * @param  {id} $id ID to check
	 * @return {string}     CSS value of display property
	 */
	function _getDisplayValue( $id ) {
		var element = document.getElementById( $id ),
			style   = window.getComputedStyle( element );
		return style.getPropertyValue( 'display' );
	}

	/**
	 * Toggle aria attributes
	 * @param  {button} $this     passed through
	 * @param  {aria-xx} attribute aria attribute to toggle
	 * @return {bool}           from _ariaReturn
	 */
	function _toggleAria( $this, attribute ) {
		$this.attr( attribute, function( index, value ) {
			return 'false' === value;
		});
	}

	$(document).ready(function () {

		progressive.params = typeof ProgressiveL10n === 'undefined' ? '' : ProgressiveL10n;

		if ( typeof progressive.params !== 'undefined' ) {
			progressive.init();
		}

	});

})( document, jQuery );
