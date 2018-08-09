<?php
/*
Template Name: Front
*/
get_header('accredit'); ?>

<?php
// If a featured image is set, insert into layout and use Interchange
// to select the optimal image size per named media query.
if ( has_post_thumbnail( $post->ID ) ) : ?>
<header class="front-hero" role="banner" data-interchange="[<?php the_post_thumbnail_url( ); ?>, small], [<?php the_post_thumbnail_url( ); ?>, medium], [<?php the_post_thumbnail_url( ); ?>, large], [<?php the_post_thumbnail_url( ); ?>, xlarge]">
<div class="tagline"><?php echo cc_featured_image_caption( ); ?></div>
</header>
<?php endif; ?>

<?php do_action( 'foundationpress_before_content' ); ?>
<?php while ( have_posts() ) : the_post(); ?>
<section class="intro" role="main" id="mainContent">
	<div <?php post_class( '' ); ?> id="post-<?php the_ID(); ?>">
		<?php do_action( 'foundationpress_page_before_entry_content' ); ?>
		<div class="entry-content">
			<?php the_content(); ?>
		</div>
	</div>


</section>
<?php endwhile; ?>
<?php do_action( 'foundationpress_after_content' ); ?>

<?php get_footer( 'accredit' );
