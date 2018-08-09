<?php

if ( ! defined( 'ABSPATH' ) ) exit;

class FP_Foundation_Assistant {

	/**
	 * @var 	object
	 * @since 	1.0.0
	 */

	private static $_instance = null; 	//  The single instance of FP_Foundation_Assistant.
	public $settings = null;			//	Settings class object

	/**
	 * @var     string
	 * @since   1.0.0
	 */

	public $_version;					//	The version number
	public $_token;						//	The token
	public $file;						//	The main plugin file
	public $dir; 						//	The main plugin directory
	public $assets_dir; 				//	The plugin assets directory
	public $assets_url; 				//	The plugin assets URL
	public $script_suffix;				//	Suffix for Javascripts

	public $fp_posts_start_date;		//	Start date filter for the posts
	public $fp_posts_end_date;			//	End date filter for the posts
	public $fp_pages_start_date;		//	Start date filter for the pages
	public $fp_pages_end_date;			//	End date filter for the pages

	/**
	 * Constructor function.
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */

	public function __construct ( $file = '', $version = '1.1.2' ) {
		$this->_version = $version;
		$this->_token = 'fp_foundation_assistant';

		// Load plugin environment variables
		$this->file = $file;
		$this->dir = dirname( $this->file );
		$this->assets_dir = trailingslashit( $this->dir ) . 'assets';
		$this->assets_url = esc_url( trailingslashit( plugins_url( '/assets/', $this->file ) ) );

		$this->script_suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		// Get Option Values
		$this->fp_posts_start_date = get_option('fp_posts_start_date');		
		$this->fp_posts_end_date = get_option('fp_posts_end_date');				
		$this->fp_pages_start_date = get_option('fp_pages_start_date');		
		$this->fp_pages_end_date = get_option('fp_pages_end_date');	

		register_activation_hook( $this->file, array( $this, 'install' ) );

		// Load frontend JS & CSS

			//Load on all posts and pages
			if (( get_option('fp_posts_query', 'allposts') == 'allposts') && ( get_option('fp_pages_query', 'allpages') == 'allpages')) {
				add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ), 10 );
				add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );
			} 

			//Load on posts from specified dates
			if (get_option('fp_posts_query', 'allposts') == 'periodposts' )  {	

				if ((!empty($this->fp_posts_start_date) && !empty($this->fp_posts_end_date)) && ( ( ( date("j/n/y", strtotime($this->fp_posts_end_date) ) ) - (date("j/n/y", strtotime($this->fp_posts_start_date) ) ) ) <= 0 )) {
					add_action( 'admin_notices', array( $this, 'fp_error_notice' ) );	
				} else if (empty($this->fp_posts_start_date) && empty($this->fp_posts_end_date)) {
					add_action( 'admin_notices', array( $this, 'fp_error_notice' ) );
				} else {
					add_action('template_redirect', array( $this, 'fp_period_posts_query' ));
				}

			//Load on all posts	
			} elseif (get_option('fp_posts_query', 'allposts') == 'allposts' ) {
				add_action('template_redirect', array( $this, 'fp_posts_query' ));
			//Don't load on posts			
			} elseif (get_option('fp_posts_query', 'allposts') == 'noposts' ) {
				//Do not do anything
			}

			//Load on pages from specified dates
			if (get_option('fp_pages_query', 'allpages') == 'periodpages' )  {	

				if ((!empty($this->fp_pages_start_date) && !empty($this->fp_pages_end_date)) && ( ( ( date("j/n/y", strtotime($this->fp_pages_end_date) ) ) - (date("j/n/y", strtotime($this->fp_pages_start_date) ) ) ) <= 0 )) {
					add_action( 'admin_notices', array( $this, 'fp_error_notice' ) );	
				} else if (empty($this->fp_pages_start_date) && empty($this->fp_pages_end_date)) {
					add_action( 'admin_notices', array( $this, 'fp_error_notice' ) );	
				} else {
					add_action('template_redirect', array( $this, 'fp_period_pages_query' ));
				}
				
			//Load on all pages	
			} elseif (get_option('fp_pages_query', 'allpages') == 'allpages' ) {
				add_action('template_redirect', array( $this, 'fp_pages_query' ));	
			//Don't load on pages	
			} elseif (get_option('fp_pages_query', 'allpages') == 'nopages' ) {
				//Do not do anything
			}

		// Load admin JS & CSS
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ), 10, 1 );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_styles' ), 10, 1 );		
		add_filter( 'mce_css', array( $this, 'admin_editor_styles' ));


		// Load API for generic admin functions
		if ( is_admin() ) {
			$this->admin = new FP_Foundation_Assistant_Admin_API();
		}

		// Handle localisation
		$this->load_plugin_textdomain();
		add_action( 'init', array( $this, 'load_localisation' ), 10 );

	} // End __construct ()

	/**
	 * Query all posts
	 * @access  public
	 * @since   1.0.0
	 */

	public function fp_posts_query() {		

		$args = array(
			'post_type' => 'post',
			'post_status' => array( 'any')
		);
		$fp_posts_query = new WP_Query( $args );		
		
		if (isset($fp_posts_query)) {
			foreach ($fp_posts_query->posts as $fp_post) {

				$fp_post_ids =array($fp_post->ID);
				
				if(is_single($fp_post_ids)) {
					add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ), 10 );
					add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );
				}		
			}
		}

		wp_reset_postdata(); 
  		wp_reset_query();	
	}

	/**
	 * Query posts for specified period
	 * @access  public
	 * @since   1.0.0
	 */

	public function fp_period_posts_query() {

		$fp_posts_start_date_time = strtotime($this->fp_posts_start_date);
		$fp_posts_start_day = date("j", $fp_posts_start_date_time); 
		$fp_posts_start_month = date("n", $fp_posts_start_date_time); 
		$fp_posts_start_year = date("Y", $fp_posts_start_date_time); 

		$fp_posts_end_date_time = strtotime($this->fp_posts_end_date);
		$fp_posts_end_day = date("j", $fp_posts_end_date_time); 
		$fp_posts_end_month = date("n", $fp_posts_end_date_time); 
		$fp_posts_end_year = date("Y", $fp_posts_end_date_time); 

		if ( empty( $this->fp_posts_end_date ) ) {

			$args = array(
				'post_type' => 'post',
				'post_status' => array( 'publish', 'pending', 'draft', 'auto-draft', 'future', 'private', 'inherit', 'trash' ),
				'date_query' => array(
					array(
						'after'     => array(
							'year'  => $fp_posts_start_year,
							'month' => $fp_posts_start_month,
							'day'   => $fp_posts_start_day,
						),
						'inclusive' => true,
					),
				),
				'posts_per_page' => -1,
			);
			$fp_period_posts_query = new WP_Query( $args );

		} elseif ( empty( $this->fp_posts_start_date ) ) {

			$args = array(
				'post_type' => 'post',
				'post_status' => array( 'publish', 'pending', 'draft', 'auto-draft', 'future', 'private', 'inherit', 'trash' ),
				'date_query' => array(
					array(
						'before'    => array(
							'year'  => $fp_posts_end_year,
							'month' => $fp_posts_end_month,
							'day'   => $fp_posts_end_day,
						),
						'inclusive' => true,
					),
				),
				'posts_per_page' => -1,		
			);
			$fp_period_posts_query = new WP_Query( $args );

		} elseif ( (  ( date("j/n/y", $fp_posts_end_date_time ) ) - (date("j/n/y", $fp_posts_start_date_time ) ) ) > 0 ) {

			$args = array(
				'post_type' => 'post',
				'post_status' => array( 'publish', 'pending', 'draft', 'auto-draft', 'future', 'private', 'inherit', 'trash' ),
				'date_query' => array(
					array(
						'after'     => array(
							'year'  => $fp_posts_start_year,
							'month' => $fp_posts_start_month,
							'day'   => $fp_posts_start_day,
						),
						'before'    => array(
							'year'  => $fp_posts_end_year,
							'month' => $fp_posts_end_month,
							'day'   => $fp_posts_end_day,
						),
						'inclusive' => true,
					),
				),
				'posts_per_page' => -1,
			);
			$fp_period_posts_query = new WP_Query( $args );

		} else {
			echo "Please, enter correct dates for the period you want the plugin to load for.";
		}	

		if (isset($fp_period_posts_query)) {
			foreach ($fp_period_posts_query->posts as $fp_period_post) {

				$fp_period_posts_ids =array($fp_period_post->ID);
				
				if(is_single($fp_period_posts_ids)) {
					add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ), 10 );
					add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );
				}		
			}
		}

		wp_reset_postdata(); 
  		wp_reset_query();	
	}

	/**
	 * Query all pages
	 * @access  public
	 * @since   1.0.0
	 */

	public function fp_pages_query() {

		$args = array(
			'post_type' => 'page',
			'post_status' => array( 'publish', 'pending', 'draft', 'auto-draft', 'future', 'private', 'inherit', 'trash' ),
		);
		$fp_pages_query = new WP_Query( $args );

		if (isset($fp_pages_query)) {
			foreach ($fp_pages_query->posts as $fp_page) {

				$fp_page_ids =array($fp_page->ID);
				
				if(is_page($fp_page_ids)) {
					add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ), 10 );
					add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );
				}		
			}
		}

		wp_reset_postdata(); 
  		wp_reset_query();	
	}

	/**
	 * Query pages for specified period
	 * @access  public
	 * @since   1.0.0
	 */

	public function fp_period_pages_query() {

		$fp_pages_start_date_time = strtotime($this->fp_pages_start_date);
		$fp_pages_start_day = date("j", $fp_pages_start_date_time); 
		$fp_pages_start_month = date("n", $fp_pages_start_date_time); 
		$fp_pages_start_year = date("Y", $fp_pages_start_date_time); 

		$fp_pages_end_date_time = strtotime($this->fp_pages_end_date);
		$fp_pages_end_day = date("j", $fp_pages_end_date_time); 
		$fp_pages_end_month = date("n", $fp_pages_end_date_time); 
		$fp_pages_end_year = date("Y", $fp_pages_end_date_time); 

		if ( empty( $this->fp_pages_end_date ) ) {

			$args = array(
				'post_type' => 'page',
				'post_status' => array( 'publish', 'pending', 'draft', 'auto-draft', 'future', 'private', 'inherit', 'trash' ),
				'date_query' => array(
					array(
						'after'     => array(
							'year'  => $fp_pages_start_year,
							'month' => $fp_pages_start_month,
							'day'   => $fp_pages_start_day,
						),
						'inclusive' => true,
					),
				),
				'posts_per_page' => -1,
			);

			$fp_period_pages_query = new WP_Query( $args );

		} elseif ( empty( $this->fp_pages_start_date ) ) {

			$args = array(
				'post_type' => 'page',
				'post_status' => array( 'publish', 'pending', 'draft', 'auto-draft', 'future', 'private', 'inherit', 'trash' ),
				'date_query' => array(
					array(
						'before'    => array(
							'year'  => $fp_pages_end_year,
							'month' => $fp_pages_end_month,
							'day'   => $fp_pages_end_day,
						),
						'inclusive' => true,
					),
				),
				'posts_per_page' => -1,		
			);

			$fp_period_pages_query = new WP_Query( $args );

		} elseif ( ( ( date("j/n/y", $fp_pages_end_date_time ) ) - (date("j/n/y", $fp_pages_start_date_time ) ) ) > 0 ) {

			$args = array(
				'post_type' => 'page',
				'post_status' => array( 'publish', 'pending', 'draft', 'auto-draft', 'future', 'private', 'inherit', 'trash' ),
				'date_query' => array(
					array(
						'after'     => array(
							'year'  => $fp_pages_start_year,
							'month' => $fp_pages_start_month,
							'day'   => $fp_pages_start_day,
						),
						'before'    => array(
							'year'  => $fp_pages_end_year,
							'month' => $fp_pages_end_month,
							'day'   => $fp_pages_end_day,
						),
						'inclusive' => true,
					),
				),
				'posts_per_page' => -1,
			);

			$fp_period_pages_query = new WP_Query( $args );

		} else {
			echo "Please, enter correct dates for the period you want the plugin to load for.";
		}	

		if (isset($fp_period_pages_query)) {
			foreach ($fp_period_pages_query->posts as $fp_period_pages) {

				$fp_period_pages_ids =array($fp_period_pages->ID);
				
				if(is_page($fp_period_pages_ids)) {
					add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ), 10 );
					add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );
				}		
			}
		}

		wp_reset_postdata(); 
  		wp_reset_query();	
	}

	/**
	 * Error message in the admin panel
	 * @access  public
	 * @since   1.0.0
	 */

	public function fp_error_notice() {	?>
	    <div class="error notice fp-error-notice">
	        <p><?php _e( 'Please, enter correct dates for the period you want the plugin to load for.', 'fp-foundation-assistant' ); ?></p>
	    </div>
	<?php }
	

	/**
	 * Load frontend CSS.
	 * @access  public
	 * @since   1.0.0
	 * @return void
	 */
	public function enqueue_styles () {

		if ( ( get_option('fp_load_foundation_checkbox', true) == true ) && ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6' ) ) {
			wp_register_style( $this->_token . '-foundation-6-css', esc_url( $this->assets_url ) . 'foundation/foundation-6/css/foundation.min.css', array(), '6.3.0', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-6-css' );
			wp_register_style( $this->_token . '-foundation-6-appcss', esc_url( $this->assets_url ) . 'foundation/foundation-6/css/app.css', array(), '', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-6-appcss' );
		}

		if ( ( get_option('fp_load_foundation_checkbox', true) == true ) && ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-rtl' ) ) {
			wp_register_style( $this->_token . '-foundation-6-rtl-css', esc_url( $this->assets_url ) . 'foundation/foundation-6-rtl/css/foundation.min.css', array(), '6.3.0', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-6-rtl-css' );
			wp_register_style( $this->_token . '-foundation-6-rtl-appcss', esc_url( $this->assets_url ) . 'foundation/foundation-6-rtl/css/app.css', array(), '', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-6-rtl-appcss' );
		}

		if (( get_option('fp_load_foundation_checkbox', true) == true ) && ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-flex' ) ) {
			wp_register_style( $this->_token . '-foundation-6-flex-css', esc_url( $this->assets_url ) . 'foundation/foundation-6-flex/css/foundation.min.css', array(), '6.3.0', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-6-flex-css' );
			wp_register_style( $this->_token . '-foundation-6-flex-appcss', esc_url( $this->assets_url ) . 'foundation/foundation-6-flex/css/app.css', array(), '', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-6-flex-appcss' );
		}

		if (( get_option('fp_load_foundation_checkbox', true) == true ) && ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-flex-rtl' ) ) {
			wp_register_style( $this->_token . '-foundation-6-flex-rtl-css', esc_url( $this->assets_url ) . 'foundation/foundation-6-flex-rtl/css/foundation.min.css', array(), '6.3.0', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-6-flex-rtl-css' );
			wp_register_style( $this->_token . '-foundation-6-flex-rtl-appcss', esc_url( $this->assets_url ) . 'foundation/foundation-6-flex-rtl/css/app.css', array(), '', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-6-flex-rtl-appcss' );
		}

		if (( get_option('fp_load_foundation_checkbox', true) == true ) && ( get_option('fp_foundation_versions', 'foundation6') == 'foundation5' ) ) {
			wp_register_style( $this->_token . '-foundation-5-css', esc_url( $this->assets_url ) . 'foundation/foundation-5/css/foundation.min.css', array(), '5.5.3', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-5-css' );
			wp_register_style( $this->_token . '-foundation-5-normalize', esc_url( $this->assets_url ) . 'foundation/foundation-5/css/normalize.css', array(), '3.0.3', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-5-normalize' );
			wp_register_style( $this->_token . '-foundation-5-appcss', esc_url( $this->assets_url ) . 'foundation/foundation-5/css/app.css', array(), '', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-5-appcss' );
		}

		if (( get_option('fp_load_foundation_checkbox', true) == true ) && ( get_option('fp_foundation_versions', 'foundation6') == 'foundation4' ) ) {
			wp_register_style( $this->_token . '-foundation-4-css', esc_url( $this->assets_url ) . 'foundation/foundation-4/css/foundation.min.css', array(), '4', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-4-css' );
			wp_register_style( $this->_token . '-foundation-4-normalize', esc_url( $this->assets_url ) . 'foundation/foundation-4/css/normalize.css', array(), '2.1.2', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-4-normalize' );
			wp_register_style( $this->_token . '-foundation-4-appcss', esc_url( $this->assets_url ) . 'foundation/foundation-4/css/app.css', array(), '', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-4-appcss' );
		}

		if (( get_option('fp_load_foundation_checkbox', true) == true ) && ( get_option('fp_foundation_versions', 'foundation6') == 'foundation3' ) ) {
			wp_register_style( $this->_token . '-foundation-3-css', esc_url( $this->assets_url ) . 'foundation/foundation-3/stylesheets/foundation.min.css', array(), '3', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-3-css' );
			wp_register_style( $this->_token . '-foundation-3-appcss', esc_url( $this->assets_url ) . 'foundation/foundation-3/stylesheets/app.css', array(), '', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-3-appcss' );
		}

		if ( get_option('fp_load_foundation_icons_checkbox', true) == true ) {
			wp_register_style( $this->_token . '-foundation-icons', esc_url( $this->assets_url ) . 'foundation/foundation-icons/foundation-icons.css', array(), '3.0', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-icons' );
		}

		if ( get_option('fp_load_owlcarousel_checkbox', true) == true ) {
			wp_register_style( $this->_token . '-owl-carousel-css', esc_url( $this->assets_url ) . 'owlcarousel/assets/owl.carousel.css', array(), '2.0.0', 'all' );
			wp_enqueue_style( $this->_token . '-owl-carousel-css' );
		} 

		if (file_exists(get_template_directory().'/fp-foundation-assistant/fp-assistant-custom.css')) {
			wp_register_style( $this->_token . '-fp-assistant-custom-css', get_template_directory_uri().'/fp-foundation-assistant/fp-assistant-custom.css', array(), '', 'all' );
			wp_enqueue_style( $this->_token . '-fp-assistant-custom-css' );
		}

	} // End enqueue_styles ()

	/**
	 * Load frontend Javascript.
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function enqueue_scripts () {

		if (( get_option('fp_load_foundation_checkbox', true) == true ) && ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6' ) ) {
			wp_register_script( $this->_token . '-foundation-6', esc_url( $this->assets_url ) . 'foundation/foundation-6/js/vendor/foundation.min.js', array( 'jquery' ), '6.3.0', true );
			wp_enqueue_script( $this->_token . '-foundation-6' );
			wp_register_script( $this->_token . '-foundation-6-load', esc_url( $this->assets_url ) . 'foundation/foundation-6/js/app.js', array( 'jquery' ), '', true );
			wp_enqueue_script( $this->_token . '-foundation-6-load' );
			wp_register_script( $this->_token . '-foundation-6-what', esc_url( $this->assets_url ) . 'foundation/foundation-6/js/vendor/what-input.js', array( 'jquery' ), '', true );
			wp_enqueue_script( $this->_token . '-foundation-6-what' );
		}

		if (( get_option('fp_load_foundation_checkbox', true) == true ) && ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-rtl' ) ) {
			wp_register_script( $this->_token . '-foundation-6-rtl', esc_url( $this->assets_url ) . 'foundation/foundation-6-rtl/js/vendor/foundation.min.js', array( 'jquery' ), '6.3.0', true );
			wp_enqueue_script( $this->_token . '-foundation-6-rtl' );
			wp_register_script( $this->_token . '-foundation-6-rtl-load', esc_url( $this->assets_url ) . 'foundation/foundation-6-rtl/js/app.js', array( 'jquery' ), '', true );
			wp_enqueue_script( $this->_token . '-foundation-6-rtl-load' );
			wp_register_script( $this->_token . '-foundation-6-rtl-what', esc_url( $this->assets_url ) . 'foundation/foundation-6-rtl/js/vendor/what-input.js', array( 'jquery' ), '', true );
			wp_enqueue_script( $this->_token . '-foundation-6-rtl-what' );
		}

		if (( get_option('fp_load_foundation_checkbox', true) == true ) && ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-flex' ) ) {
			wp_register_script( $this->_token . '-foundation-6-flex', esc_url( $this->assets_url ) . 'foundation/foundation-6-flex/js/vendor/foundation.min.js', array( 'jquery' ), '6.3.0', true );
			wp_enqueue_script( $this->_token . '-foundation-6-flex' );
			wp_register_script( $this->_token . '-foundation-6-flex-load', esc_url( $this->assets_url ) . 'foundation/foundation-6-flex/js/app.js', array( 'jquery' ), '', true );
			wp_enqueue_script( $this->_token . '-foundation-6-flex-load' );
			wp_register_script( $this->_token . '-foundation-6-flex-what', esc_url( $this->assets_url ) . 'foundation/foundation-6-flex/js/vendor/what-input.js', array( 'jquery' ), '', true );
			wp_enqueue_script( $this->_token . '-foundation-6-flex-what' );
		}

		if (( get_option('fp_load_foundation_checkbox', true) == true ) && ( get_option('fp_foundation_versions', 'foundation6') == 'foundation6-flex-rtl' ) ) {
			wp_register_script( $this->_token . '-foundation-6-flex-rtl', esc_url( $this->assets_url ) . 'foundation/foundation-6-flex-rtl/js/vendor/foundation.min.js', array( 'jquery' ), '6.3.0', true );
			wp_enqueue_script( $this->_token . '-foundation-6-flex-rtl' );
			wp_register_script( $this->_token . '-foundation-6-flex-rtl-load', esc_url( $this->assets_url ) . 'foundation/foundation-6-flex-rtl/js/app.js', array( 'jquery' ), '', true );
			wp_enqueue_script( $this->_token . '-foundation-6-flex-rtl-load' );
			wp_register_script( $this->_token . '-foundation-6-flex-rtl-what', esc_url( $this->assets_url ) . 'foundation/foundation-6-flex-rtl/js/vendor/what-input.js', array( 'jquery' ), '', true );
			wp_enqueue_script( $this->_token . '-foundation-6-flex-rtl-what' );
		}

		if (( get_option('fp_load_foundation_checkbox', true) == true ) && ( get_option('fp_foundation_versions', 'foundation6') == 'foundation5' ) ) {
			wp_register_script( $this->_token . '-foundation-5', esc_url( $this->assets_url ) . 'foundation/foundation-5/js/foundation.min.js', array( 'jquery' ), '5.5.3', true );
			wp_enqueue_script( $this->_token . '-foundation-5' );
			wp_register_script( $this->_token . '-foundation-5-load', esc_url( $this->assets_url ) . 'foundation/foundation-5/js/app.js', array( 'jquery' ), '', true );
			wp_enqueue_script( $this->_token . '-foundation-5-load' );
			wp_register_script( $this->_token . '-foundation-5-modernizr', esc_url( $this->assets_url ) . 'foundation/foundation-5/js/vendor/modernizr.js', array( 'jquery' ), '2.8.3' );
			wp_enqueue_script( $this->_token . '-foundation-5-modernizr' );
		}

		if (( get_option('fp_load_foundation_checkbox', true) == true ) && ( get_option('fp_foundation_versions', 'foundation6') == 'foundation4' ) ) {
			wp_register_script( $this->_token . '-foundation-4', esc_url( $this->assets_url ) . 'foundation/foundation-4/js/foundation.min.js', array( 'jquery' ), '4', true );
			wp_enqueue_script( $this->_token . '-foundation-4' );
			wp_register_script( $this->_token . '-foundation-4-load', esc_url( $this->assets_url ) . 'foundation/foundation-4/js/app.js', array( 'jquery' ), '', true );
			wp_enqueue_script( $this->_token . '-foundation-4-load' );
			wp_register_script( $this->_token . '-foundation-4-modernizr', esc_url( $this->assets_url ) . 'foundation/foundation-4/js/vendor/custom.modernizr.js', array( 'jquery' ), '2.6.2' );
			wp_enqueue_script( $this->_token . '-foundation-4-modernizr' );
		}

		if (( get_option('fp_load_foundation_checkbox', true) == true ) && ( get_option('fp_foundation_versions', 'foundation6') == 'foundation3' ) ) {
			wp_register_script( $this->_token . '-foundation-3', esc_url( $this->assets_url ) . 'foundation/foundation-3/javascripts/foundation.min.js', array( 'jquery' ), '3', true );
			wp_enqueue_script( $this->_token . '-foundation-3' );
			wp_register_script( $this->_token . '-foundation-3-load', esc_url( $this->assets_url ) . 'foundation/foundation-3/javascripts/app.js', array( 'jquery' ), '', true );
			wp_enqueue_script( $this->_token . '-foundation-3-load' );
			wp_register_script( $this->_token . '-foundation-3-modernizr', esc_url( $this->assets_url ) . 'foundation/foundation-3/javascripts/modernizr.foundation.js', array( 'jquery' ), '2.6.2' );
			wp_enqueue_script( $this->_token . '-foundation-3-modernizr' );
			if ( wp_script_is( $this->_token . '-foundation-3', 'enqueued' ) ) {
				wp_register_script( $this->_token . '-orbit-custom', esc_url( $this->assets_url ) . 'js/orbit.js', array( 'jquery' ), '', true );
				wp_enqueue_script( $this->_token . '-orbit-custom' );
			}	
		}

		if ( get_option('fp_load_owlcarousel_checkbox', true) == true )  {
			wp_register_script( $this->_token . '-owl-carousel', esc_url( $this->assets_url ) . 'owlcarousel/owl.carousel.min.js', array( 'jquery' ), '2.0.0', true );
			wp_enqueue_script( $this->_token . '-owl-carousel' );
			if ( wp_script_is( $this->_token . '-owl-carousel', 'enqueued' ) ) {
				wp_register_script( $this->_token . '-owl-custom', esc_url( $this->assets_url ) . 'js/owl.js', array( 'jquery' ), '', true );
				wp_enqueue_script( $this->_token . '-owl-custom' );
			}	
		}

	} // End enqueue_scripts ()

	/**
	 * Load admin CSS.
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function admin_enqueue_styles ( $hook = '' ) {

		$plugin_id = get_current_screen()->id;
		$plugin_base = get_current_screen()->base;

		if ( is_rtl() && ( ( $plugin_id == 'settings_page_fp_foundation_assistant_settings' ) || ( $plugin_base == 'post' ) ) ) {
			
			wp_register_style( $this->_token . '-admin-rtl', esc_url( $this->assets_url ) . 'css/admin-rtl.css', array(), $this->_version );
			wp_enqueue_style( $this->_token . '-admin-rtl' );
			
		} elseif ( ( $plugin_id == 'settings_page_fp_foundation_assistant_settings' ) || ( $plugin_base == 'post' ) ) {

			wp_register_style( $this->_token . '-admin', esc_url( $this->assets_url ) . 'css/admin.css', array(), $this->_version );
			wp_enqueue_style( $this->_token . '-admin' );
		}	

		if ( get_option('fp_load_foundation_icons_checkbox', true) == true ) {
			wp_register_style( $this->_token . '-foundation-icons-admin', esc_url( $this->assets_url ) . 'foundation/foundation-icons/foundation-icons.css', array(), '3.0', 'all' );
			wp_enqueue_style( $this->_token . '-foundation-icons-admin' );
		}

	} // End admin_enqueue_styles ()

	/**
	 * Load admin Javascript.
	 * @access  public
	 * @since   1.0.0
	 * @version 1.2.0
	 * @return  void
	 */
	public function admin_enqueue_scripts ( $hook = '' ) {

		$current_screen = get_current_screen();

		if ( $current_screen->base == 'post' || $current_screen->base == 'edit' || $current_screen->parent_base == 'edit' || $current_screen->post_type == 'page' || $current_screen->post_type == 'post' ) {
			wp_register_script( $this->_token . '-hadnlebars-admin', esc_url( $this->assets_url ) . 'handlebars/handlebars-v4.0.5.js', array( 'jquery' ), '4.0.5', true );
			wp_enqueue_script( $this->_token . '-hadnlebars-admin' );
		}

		if ( $current_screen->id == 'settings_page_fp_foundation_assistant_settings' ) {
			wp_register_script( $this->_token . '-foundation-6', esc_url( $this->assets_url ) . 'foundation/foundation-6/js/vendor/foundation.min.js', array( 'jquery' ), '6.3.0', true );
			wp_enqueue_script( $this->_token . '-foundation-6' );
		}	
		
	} // End admin_enqueue_scripts ()

	/**
	 * Load Editor Stylesheets.
	 * @access  public
	 * @since   1.0.0
	 * @version 1.1.0
	 */
	public function admin_editor_styles ( $mce_css ) {

		if ( get_option('fp_load_foundation_icons_checkbox', true) == true ) {
			$mce_css .= ', ' . plugins_url( 'assets/foundation/foundation-icons/foundation-icons.css',  dirname(__FILE__));			
		}
		return $mce_css;
		
	} // End admin_editor_styles ()


	/**
	 * Load plugin localisation
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function load_localisation () {
		load_plugin_textdomain( 'fp-foundation-assistant', false, dirname( plugin_basename( $this->file ) ) . '/localization/' );
	} // End load_localisation ()

	/**
	 * Load plugin textdomain
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function load_plugin_textdomain () {
	    $domain = 'fp-foundation-assistant';

	    $locale = apply_filters( 'plugin_locale', get_locale(), $domain );

	    load_textdomain( $domain, WP_LANG_DIR . '/' . $domain . '/' . $domain . '-' . $locale . '.mo' );
	    load_plugin_textdomain( $domain, false, dirname( plugin_basename( $this->file ) ) . '/localization/' );
	} // End load_plugin_textdomain ()

	/**
	 * Main FP_Foundation_Assistant Instance
	 * Ensures only one instance of FP_Foundation_Assistant is loaded or can be loaded.
	 * @since 1.0.0
	 * @static
	 * @see FP_Foundation_Assistant()
	 * @return Main FP_Foundation_Assistant instance
	 */
	public static function instance ( $file = '', $version = '1.1.2' ) {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self( $file, $version );
		}
		return self::$_instance;
	} // End instance ()

	/**
	 * Cloning is forbidden.
	 * @since 1.0.0
	 */
	public function __clone () {
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?' , 'fp-foundation-assistant'  ), $this->_version );
	} // End __clone ()

	/**
	 * Unserializing instances of this class is forbidden.
	 * @since 1.0.0
	 */
	public function __wakeup () {
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?' , 'fp-foundation-assistant'  ), $this->_version );
	} // End __wakeup ()

	/**
	 * Installation. Runs on activation.
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function install () {
		$this->_log_version_number();
	} // End install ()

	/**
	 * Log the plugin version number.
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	private function _log_version_number () {
		update_option( $this->_token . '_version', $this->_version );
	} // End _log_version_number ()

}