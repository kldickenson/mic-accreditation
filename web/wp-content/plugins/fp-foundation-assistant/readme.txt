=== FP Foundation Assistant ===
Contributors: fortpandemonium
Donate link: http://fortpandemonium.com/fp-foundation-assistant/donate/
Tags: fp foundation assistant, foundation, zurb foundation, foundation shortcodes, responsive layout, responsive pages, responsive grid, responsive, grid, shortcodes, icon font, rtl
Requires at least: 4.4
Tested up to: 4.9
Stable tag: 1.1.2
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

FP Foundation Assistant combines the powers of the responsive front-end framework Foundation and WordPress. Foundation versions 3 to 6 are supported. 

== Description ==

= Plugin Features =

*	Supports - Foundation 6 (including Flex Grid and RTL), 5, 4 and 3;
*	Includes - 19 Shortcodes (including OwlCarousel shortcode as an alternative to the built-in Orbit Carousel) and Foundation Icon Fonts 3. Both of them have TinyMCE editor buttons.
*	Provides an option to specify a time period, to have Foundation loaded on specific posts or pages.
*	Provides an option to load custom css file from the active theme folder.

= Plugin Shortcodes =

The shortcodes for the different versions have the same tags but different features. This means that the main shortcode tags are compatible but different features will be available depending on the version. 
[FP Foundation Assistant - Shortcodes Documentation](http://fortpandemonium.com/fp-foundation-assistant/shortcodes)

*	Grid 		
*	Visibility Classes 	
*	Float Classes 
*	Tabs 		
*	Accordion 			
*	Orbit Carousel 
*	OwlCarousel 	
*	Menu 				
*	Nested Menu  
*	Buttons 		
*	Callout 				
*	Dropdown  
*	Flex Video 	
*	Interchange 			
*	Label  
*	Progress 	
*	Reveal 				
*	Tooltip 
*	WP Query 

= Foundation Features =

#### General ####

*	Mobile-first - larger devices will inherit the code for small screens and can be customized as needed; 
*	Float Grid - responsive 12-column grid with options for offsetting, centering, source ordering and more; 
*	Layout options - visibility and float classes;
*	Containers - accordion, tabs, callout/alert, dropdown, reveal;
*	Navigation - menu, pagination, breadcrumbs;
*	Media - flex video, labels, carousel, progress bar;

#### Foundation 6 ####

*	Float Grid - the block grid has been merged into the main grid; 
*	Flexbox-powered grid, as an alternative to the float grid - including extra features as automatic sizing and vertical/horizontal alignment;
*	JavaScript - Abide, Accordion Menu, Accordion, Drilldown Menu, Dropdown Menu, Dropdown, Equalizer, Interchange, Magellan, Off-Canvas, Orbit, Reveal, Slider, Sticky, Tabs, Toggler, Tooltip;
*	Right-to-Left Support
*	[Foundation 6 Official Documentation](http://foundation.zurb.com/sites/docs/)
*	[Foundation 6 Shortcodes](http://fortpandemonium.com/fp-foundation-assistant/shortcodes/)
*	[Foundation 6 Flex Grid Shortcodes](http://fortpandemonium.com/foundation-6-flex/)

#### Foundation 5 ####

*	JavaScript - Abide, Accordion, Alerts, Clearing Lightbox, Dropdown, Dropdown Buttons, Equalizer, Interchange, Joyride, Magellan, Off-Canvas, Orbit, Range Sliders, Reveal, Split Buttons, Tabs, Tooltip;
*	[Foundation 5 Documentation](http://foundation.zurb.com/sites/docs/v/5.5.3/)
*	[Foundation 5 Shortcodes](http://fortpandemonium.com/foundation-5/demo/)

#### Foundation 4 ####

*	JavaScript - Abide, Accordion, Alerts, Clearing Lightbox, Dropdown, Interchange, Joyride, Magellan, Orbit, Reveal, Tabs, Tooltip;
*	[Foundation 4 Documentation](http://foundation.zurb.com/sites/docs/v/4.3.2/)
*	[Foundation 4 Shortcodes](http://fortpandemonium.com/foundation-4/demo/)

#### Foundation 3 ####

*	JavaScript - Accordion, Alerts, Clearing Lightbox, Joyride, Magellan, Orbit, Reveal, Tabs, Tooltip;
*	[Foundation 3 Documentation](http://foundation.zurb.com/sites/docs/v/3.2.5/)
*	[Foundation 3 Shortcodes](http://fortpandemonium.com/foundation-3/demo/)

== Installation ==

= Installation =

Installing "FP Foundation Assistant" can be done either by searching for "FP Foundation Assistant" via the "Plugins > Add New" screen in your WordPress dashboard, or by using the following steps:

1. Download the plugin via WordPress.org
2. Upload the ZIP file through the 'Plugins > Add New > Upload' screen in your WordPress dashboard
3. Activate the plugin through the 'Plugins' menu in WordPress

= Configuration =

1. Go to "Settings > FP Foundation Assistant" and choose whether you want to load foundation. In case, you are already using a Foundation-based theme, you can disable it and use only the shortcodes. A button for the shortcodes will appear in the Visual section of the Editor once you activate the plugin.

2. Choose the Foundation version you want to use or are currently using regardless of whether you choose to load Foundation or not. The shortcodes for the different versions have the same tags but different features. 
This means that the main shortcodes tags are compatible but different features will be available depending on the version. For more information, please, read the [Documentation](http://fortpandemonium.com/fp-foundation-assistant/).

3. Choose whether you want to load the Foundation Icon Fonts 3 and OwlCarousel. The icon font will have a button appear in the Visual section of the Editor. OwlCarousel provides a more flexible option to the built-in Foundation carousel, letting the user choose to have a number of columns. Both features can be disabled.

4. To have Foundation loaded on specific posts or pages, you can specify a period. All posts and pages during that period will have Foundation loaded. This is helpful if you are migrating to a different theme but still want to use the Foundation functionality on previous posts or pages.

= Custom CSS =

If you want to use custom CSS, you can create a file in your active theme: 'yourtheme/fp-foundation-assistant/fp-assistant-custom.css' The plugin will load it automatically. 


== Frequently Asked Questions ==

= What is the plugin for? =

This plugin is designed to integrate the responsive front-end framework Foundation by Zurb with WordPress. Foundation is a powerful tool that helps the user create easily customizable responsive layouts with clean markup. For more information visit the official website - [Foundation](http://foundation.zurb.com)

= Where can I find the plugin documentation? =

[FP Foundation Assistant Documentation](http://fortpandemonium.com/fp-foundation-assistant/)

= Where can I find the Foundation documentation? =

*	[Foundation 6 Documentation](http://foundation.zurb.com/sites/docs/)
*	[Foundation 5 Documentation](http://foundation.zurb.com/sites/docs/v/5.5.3/)
*	[Foundation 4 Documentation](http://foundation.zurb.com/sites/docs/v/4.3.2/)
*	[Foundation 3 Documentation](http://foundation.zurb.com/sites/docs/v/3.2.5/)


== Screenshots ==

1. Settings Page 
2. Settings Page 
3. Editor Options
4. Features - Examples
5. Features - Examples
6. Features - Examples
7. Features - Examples

== Changelog ==

= 1.0.0 =
* 2016-08-04
* Initial release

= 1.0.2 =
* 2016-08-05
* Fixed deprecated PHP 4 style constructors

= 1.1.0 =
* 2017-07-20
* Updated to Foundation 6.3.0
* Added new post query shortcode that accepts all wp_query arguments
* Added the option to add image background to the grid shortcode
* Fixed issue with TinyMCE button and redeclaring the $plugin_array var
* Fixed issue with the id of the dropdown shortcode
* Removed extra br tags inserted by the editor in the grid shortcode
* Fixed issue with different settings for multiple OwlCarousels
* Fixed issue with the plugin scripts and stylesheets loading on all admin pages
* Fixed deletion fail issue
* Added the option for new tab for links in the FP_Button shortcode

= 1.1.1 =
* 2018-02-25
* Fixed issue with handlebars.js loading on all admin pages

= 1.1.2 =
* 2018-03-03
* Fixed issue with the function loading the admin editor stylesheets

== Upgrade Notice ==

= 1.0.0 =
* 2016-08-04
* Initial release

= 1.0.2 =
* 2016-08-05
* Fixed deprecated PHP 4 style constructors

= 1.1.0 =
* 2017-07-20
* Updated to Foundation 6.3.0
* Added new post query shortcode that accepts all wp_query arguments
* Added the option to add image background to the grid shortcode
* Fixed issue with TinyMCE button and redeclaring the $plugin_array var
* Fixed issue with the id of the dropdown shortcode
* Removed extra br tags inserted by the editor in the grid shortcode
* Fixed issue with different settings for multiple OwlCarousels
* Fixed issue with the plugin scripts and stylesheets loading on all admin pages
* Fixed deletion fail issue
* Added the option for new tab for links in the FP_Button shortcode

= 1.1.1 =
* 2018-02-26
 * Fixed issue with handlebars.js loading on all admin pages

= 1.1.2 =
* 2018-03-03
* Fixed issue with the function loading the admin editor stylesheets
