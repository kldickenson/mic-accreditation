<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the "off-canvas-wrap" div and all content after.
 *
 * @package FoundationPress
 * @since FoundationPress 1.0.0
 */
?>

<footer class="footer">
    <div class="footer-container">
        <div class="footer-grid">
            <section class="site-footer-logo">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/dist/assets/images/block-m-blue.svg" alt="Univerisity of Michigan">
                </a>
            </section>
            <?php dynamic_sidebar( 'footer-widgets' ); ?>
            <?php dynamic_sidebar( 'copyright_bar' ); ?>
        </div>
    </div>
</footer>

<?php if ( get_theme_mod( 'wpt_mobile_menu_layout' ) === 'offcanvas' ) : ?>
	</div><!-- Close off-canvas content -->
<?php endif; ?>

<?php wp_footer(); ?>
</body>
</html>