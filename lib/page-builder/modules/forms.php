<?php

function form_find_an_agent() {
	// Form
	$form_url = FIND_AGENT_SEARCH_URL;
	$orderby = sprintf( '<input type="hidden" name="random_order" value="%s">', _s_random_seed() );
	$zip = '<div class="form-field"><label for="zipcode">Zip</label><input type="text" name="zip" id="zipcode" class="zipcode" placeholder="73103" value="" maxlength="5"></div>';
	$city_state = '<div class="form-field"><label for="zipcode"><span>or</span> City</label><input type="text" name="city" id="city_state" class="wide" placeholder="" value=""></div>';
	$spacer = '<div class="form-field show-for-medium or">or</div>';
	$submit = '<div class="form-field submit"><label>&nbsp;</label><input type="submit" value="Find an Agent"></div>';
	$form = sprintf( '<form action="%s" >%s%s%s%s%s</form>', $form_url, $zip, $spacer, $city_state, $orderby, $submit );
	// build form holder
	$form = sprintf( '<div class="find-agent-form">%s</div>', $form );	
	
	return $form;
}