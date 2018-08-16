<?php $hero = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' ); ?>

<!-- We only want to show the featured image and page title in banner for Pages -->
<?php if(is_single()) { } else { ?>
	<?php if (has_post_thumbnail()) { ?>
		<!-- Add and existing featured image to the page banner -->
		<div class="featured-hero" style="background-image: url('<?php echo $hero['0'];?>');">
	<?php } else { ?>
		<!-- And if the page doesn't have a featured image, shorten the banner for just the title -->
		<div class="featured-hero no-hero">
	<?php } ?>
     <header class="entry-header">
    		<div class="entry-title-wrap">
				<div class="grid-container">
					<div class="grid-x grid-padding-x align-bottom">
						<div class="cell small-12 medium-8 large-8">
							<?php
									if ( is_search() ) {
										echo '<h1 class="entry-title">';
										echo _e( 'Results for:', 'foundationpress' ) ;
										echo ' ';
										echo get_search_query();
										echo '</h1>';
									} else {
									echo '<h1 class="entry-title cell small-12 medium-12 large-12">';
										echo the_title();
										echo '</h1>';
									}
								?>
							</div>
						</div>
					</div>
				</div>
     </header>
	</div>
<?php } ?>
