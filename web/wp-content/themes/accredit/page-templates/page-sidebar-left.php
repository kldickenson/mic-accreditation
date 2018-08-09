<?php
/*
Template Name: Left Sidebar
*/
get_header('accredit'); ?>

<?php get_template_part( 'template-parts/featured-image' ); ?>
<div class="main-container">
	<div class="main-grid sidebar-left">
		<main class="main-content" id="mainContent">
			<?php while ( have_posts() ) : the_post(); ?>
				<?php get_template_part( 'template-parts/content', 'page' ); ?>
			<?php endwhile; ?>
		 </main>
	<?php get_sidebar(); ?>
	</div>
</div>
<?php get_footer( 'accredit' );
