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
		<input type="text" class="input-group-field" value="" name="s" id="s" placeholder="<?php esc_attr_e( 'Search', 'foundationpress' ); ?>">
		<div class="input-group-button">
			<label for="searchsubmit"></label>
			<input type="submit" title="search" id="searchsubmit" value="<?php esc_attr_e( 'Search', 'foundationpress' ); ?>" class="button">
		</div>
	</div>
</form>
