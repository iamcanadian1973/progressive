<?php

/****************************************
	include_once WordPress Cleanup functions
*****************************************/
	include_once( 'wp-cleanup.php' );
		
		
/****************************************
	Theme Settings
*****************************************/
	include_once( 'theme-settings.php' );


/****************************************
	include_onces (libraries, Classes etc)
*****************************************/
	include_once( 'includes/cpt-core/CPT_Core.php' );

	include_once( 'includes/taxonomy-core/Taxonomy_Core.php' );


/****************************************
	Functions
*****************************************/
		
	include_once( 'functions/theme.php' );
	
	include_once( 'functions/template-tags.php' );
 
	include_once( 'functions/acf.php' );
	
	include_once( 'functions/fonts.php' );
	
	include_once( 'functions/scripts.php' );
	
	//include_once( 'functions/foobox.php' );
	
	include_once( 'functions/menus.php' );
	
	include_once( 'functions/gravity-forms.php' );
	
	include_once( 'functions/widgets.php' );
	
/****************************************
	Page Builder
*****************************************/
	include_once( 'page-builder/functions.php' );
	
	include_once( 'page-builder/markup.php' );
	
	include_once( 'page-builder/layout.php' );
	
	include_once( 'page-builder/filters.php' );
	
	// Load modules
	include_once( 'page-builder/modules/content-block.php' );
	
/****************************************
	Post Types
*****************************************/
	include_once( 'post-types/cpt-team.php' );
	
