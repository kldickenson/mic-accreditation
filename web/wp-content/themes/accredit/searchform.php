<?php
/**
 * The template for displaying search form
 *
 * @package FoundationPress
 * @since FoundationPress 1.0.0
 */

?>

	<form role="search" method="get" id="searchform" action="<?php echo home_url( '/' ); ?>">
		<div class="input-group">
		<label for="s" class="visuallyhidden">Enter search terms</label>
			<input type="text" class="input-group-field" aria-label="Search" value="" name="s" id="s" placeholder="<?php esc_attr_e( 'Search', 'foundationpress' ); ?>">
			<label for="searchsubmit" class="visuallyhidden">Submit</label>
			<input type="submit" id="searchsubmit" value="&#xf002;" class="input-group-button fa button">
		</div>
	</form>
