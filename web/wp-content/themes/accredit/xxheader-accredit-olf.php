<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "container" div.
 *
 * @package FoundationPress
 * @since FoundationPress 1.0.0
 */

?>
<!doctype html>
<html class="no-js" <?php language_attributes(); ?> >
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
		<?php if ( (is_home()) || (is_front_page()) ) { ?>
		<meta name="description" content="Accreditation | Univeristy of Michigan">
		<?php } elseif (is_page()) { ?>
		<meta name="description" content="<?php the_title(); echo ' | Accreditation | University of Michigan'?>"/>
		<?php } ?>
		<meta property="og:url" content="<?php the_current_url(); ?>">
		<meta name="twitter:image" content="<?php echo get_template_directory_uri(); ?>/dist/assets/images/twitter-share.jpg">
		<meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/dist/assets/images/facebook-share.jpg">
		<meta property="og:image:type" content="image/jpeg" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:type" content="website"/>
		<meta property="og:description" content="Accreditation">
		<?php if ( (is_home()) || (is_front_page()) ) { ?>
		<meta property="og:title" content="Accreditation | Univeristy of Michigan">
		<?php } elseif (is_page()) { ?>
		<meta property="og:title" content="<?php the_title(); echo ' | Accreditation | University of Michigan'?>"/>
		<?php } ?>
		<meta property="og:site_name" content="Accreditation">
		<meta itemprop="name" content="Accreditation | University of Michigan">
		<meta itemprop="description" content="Accreditation | University of Michigan">
		<meta name="twitter:card" content="summary_large_image">
		<?php if ( (is_home()) || (is_front_page()) ) { ?>
		<meta name="twitter:title" content="Accreditation | University of Michigan">
		<?php } elseif (is_page()) { ?>
		<meta name="twitter:title" content="<?php the_title(); echo ' | Accreditation | University of Michigan'?>"/>
		<?php } ?>
		<meta name="twitter:description" content="Accreditation | Univeristy of Michigan">
		<link rel='https://api.w.org/' href='<?php echo get_site_url(); ?>/wp-json/' />
		<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/dist/assets/images/icons/favicon.ico" type="image/x-icon">
		<link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo get_template_directory_uri(); ?>/dist/assets/images/icons/apple-touch-icon-144x144-precomposed.png">
		<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo get_template_directory_uri(); ?>/dist/assets/images/icons/apple-touch-icon-114x114-precomposed.png">
		<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo get_template_directory_uri(); ?>/dist/assets/images/icons/apple-touch-icon-72x72-precomposed.png">
		<link rel="apple-touch-icon-precomposed" href="<?php echo get_template_directory_uri(); ?>/dist/assets/images/icons/apple-touch-icon-precomposed.png">
		<link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/dist/assets/images/icons/apple-touch-icon.png">
		<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/dist/assets/images/icons/favicon-32x32.png" sizes="32x32">
		<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/dist/assets/images/icons/favicon-16x16.png" sizes="16x16">
		<link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/dist/assets/images/icons/manifest.json">
		<link rel="mask-icon" href="<?php echo get_template_directory_uri(); ?>/dist/assets/images/icons/safari-pinned-tab.svg" color="#5bbad5">
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>

	<?php if ( get_theme_mod( 'wpt_mobile_menu_layout' ) === 'offcanvas' ) : ?>
		<?php get_template_part( 'template-parts/mobile-off-canvas' ); ?>
	<?php endif; ?>

	<header class="site-header" role="banner">
		<div class="site-title-bar title-bar mobile-bottom-bar" <?php foundationpress_title_bar_responsive_toggle(); ?>>
			<div class="title-bar-left grid-x align-bottom align-justify">
				<div class="mobile-nav-icon">
					<a href="<?php echo esc_url( home_url() ); ?>" rel="home"><img src="<?php echo get_stylesheet_directory_uri(); ?>/dist/assets/images/home.svg" alt="Home button" height="100">Home</a>
				</div>

				<div class="mobile-nav-icon">
					<a href="<?php echo get_site_url(); ?>/steps/"><img src="<?php echo get_stylesheet_directory_uri(); ?>/dist/assets/images/steps.svg" alt="Steps page" height="100">Steps</a>
				</div>

				<div class="mobile-nav-icon">
					<a href="<?php echo get_site_url(); ?>/resources/"><img src="<?php echo get_stylesheet_directory_uri(); ?>/dist/assets/images/resources.svg" alt="Resources page" height="100">Resources</a>
				</div>

				<div class="mobile-nav-icon">
					<button class="hamburger hamburger--slider large" aria-label="<?php _e( 'Main Menu', 'foundationpress' ); ?>" type="button" data-toggle="<?php foundationpress_mobile_menu_id(); ?>"><span class="hamburger-box"><span class="hamburger-inner"></span></span><span>Menu</span>
                </button>
				</div>
			</div>
		</div>

		<nav class="site-navigation top-bar" role="navigation">
		<a class="skip-link" href="#mainContent">Skip to Content</a>
			<div class="top-bar-left">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><img src="<?php echo get_stylesheet_directory_uri(); ?>/dist/assets/images/block-m-blue.svg" alt="University of Michigan" height="100"></a>
			</div>
			<div class="top-bar-right">
				<div class="site-desktop-title top-bar-title">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><img src="//wp-content/uploads/acc-signature-stationery-white.png" alt="Accreditation, University of Michigan"></a>
				</div>
				<?php foundationpress_top_bar_r(); ?>

				<?php if ( ! get_theme_mod( 'wpt_mobile_menu_layout' ) || get_theme_mod( 'wpt_mobile_menu_layout' ) === 'topbar' ) : ?>
					<?php get_template_part( 'template-parts/mobile-top-bar' ); ?>
				<?php endif; ?>
			</div>
			<form role="search" method="get" id="searchform" action="<?php echo home_url( '/' ); ?>">
				<div class="input-group">
					<input type="text" class="input-group-field" value="" name="s" id="s" placeholder="<?php esc_attr_e( 'Search', 'foundationpress' ); ?>">
					<div class="input-group-button">
					<input type="submit" id="searchsubmit" value="&#xf002;" class="fa button">
					</div>
				</div>
			</form>
		</nav>

	</header>
