<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "container" div.
 *
 */

?>
<!doctype html>
<html <?php language_attributes(); ?> >
	<head>
<!--
$$\      $$\         $$\          $$\                                                           
$$$\    $$$ |        \__|         $$ |                                                          
$$$$\  $$$$ |$$$$$$\ $$\$$$$$$$\$$$$$$\   $$$$$$\ $$$$$$$\  $$$$$$\ $$$$$$$\  $$$$$$$\ $$$$$$\  
$$\$$\$$ $$ |\____$$\$$ $$  __$$\_$$  _| $$  __$$\$$  __$$\ \____$$\$$  __$$\$$  _____$$  __$$\ 
$$ \$$$  $$ |$$$$$$$ $$ $$ |  $$ |$$ |   $$$$$$$$ $$ |  $$ |$$$$$$$ $$ |  $$ $$ /     $$$$$$$$ |
$$ |\$  /$$ $$  __$$ $$ $$ |  $$ |$$ |$$\$$   ____$$ |  $$ $$  __$$ $$ |  $$ $$ |     $$   ____|
$$ | \_/ $$ \$$$$$$$ $$ $$ |  $$ |\$$$$  \$$$$$$$\$$ |  $$ \$$$$$$$ $$ |  $$ \$$$$$$$\\$$$$$$$\ 
\__|     \__|\_______\__\__|  \__| \____/ \_______\__|  \__|\_______\__|  \__|\_______|\_______|
-->

	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/img/icons/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo get_template_directory_uri(); ?>/assets/images/icons/apple-touch-icon-144x144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo get_template_directory_uri(); ?>/assets/images/icons/apple-touch-icon-114x114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo get_template_directory_uri(); ?>/assets/images/icons/apple-touch-icon-72x72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="<?php echo get_template_directory_uri(); ?>/assets/images/icons/apple-touch-icon-precomposed.png">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/assets/images/icons/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/images/icons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/images/icons/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/assets/images/icons/manifest.json">
    <link rel="mask-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/icons/safari-pinned-tab.svg" color="#5bbad5">
    <link href="https://fonts.googleapis.com/css?family=Noto+Serif|Source+Sans+Pro" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/stylesheets/maintenance.css">
		<?php wp_head(); ?>
	</head>
	<body <?php body_class('maintenance'); ?>>