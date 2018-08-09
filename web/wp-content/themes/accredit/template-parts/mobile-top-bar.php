<?php
/**
 * Template part for mobile top bar menu
 *
 * @package FoundationPress
 * @since FoundationPress 1.0.0
 */

?>

<nav class="mobile-menu vertical menu" id="<?php foundationpress_mobile_menu_id(); ?>" role="navigation">
	<div class="open-menu-site-title">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">Accreditation</a>
	</div>
	<?php foundationpress_mobile_nav(); ?>
</nav>
