# _my_ MS Toolkit

my_ MS Toolkit is a theme for WordPress based on Zurb's [Foundation for Sites 6](https://foundation.zurb.com/sites.html).


## Requirements

**This project requires [Node.js](http://nodejs.org) v4.x.x to v6.11.x to be installed on your machine.** Please be aware that you might encounter problems with the installation if you are using the most current Node version (bleeding edge) with all the latest features.

my_ MS Toolkit uses [Sass](http://Sass-lang.com/) (CSS with superpowers). In short, Sass is a CSS pre-processor that allows you to write styles more effectively and tidy.

The Sass is compiled using libsass, which requires the GCC to be installed on your machine. Windows users can install it through [MinGW](http://www.mingw.org/), and Mac users can install it through the [Xcode Command-line Tools](http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/).


## Quickstart

### 1. Clone the repository and install with npm
```bash
$ cd my-wordpress-folder
$ git clone git@gitlab.com:amyx/my-mstoolkit.git
$ cd my-wordpress-folder/wp-content/themes/
$ npm install
```

### 2. Configuration

#### YAML config file
my_ MS Toolkit includes a `config-default.yml` file. To make changes to the configuration, make a copy of `config-default.yml` and name it `config.yml` and make changes to that file. The `config.yml` file is ignored by git so that each environment can use a different configuration with the same git repo.

At the start of the build process a check is done to see if a `config.yml` file exists. If `config.yml` exists, the configuration will be loaded from `config.yml`. If `config.yml` does not exist, `config-default.yml` will be used as a fallback.

#### Browsersync setup
If you want to take advantage of [Browsersync](https://www.browsersync.io/) (automatic browser refresh when a file is saved), simply open your `config.yml` file after creating it in the previous step, and put your local dev-server address and port (e.g http://localhost:8888) in the `url` property under the `BROWSERSYNC` object.

#### Static asset hashing / cache breaker
If you want to make sure your users see the latest changes after re-deploying your theme, you can enable static asset hashing. In your `config.yml`, set ``REVISIONING: true;``. Hashing will work on the ``npm run build`` and ``npm run dev`` commands. It will not be applied on the start command with browsersync. This is by design.  Hashing will only change if there are actual changes in the files.

### 3. Get started

```bash
$ npm start
```

### 4. Compile assets for production

When building for production, the CSS and JS will be minified. To minify the assets in your `/dist` folder, run

```bash
$ npm run build
```

#### To create a .zip file of your theme, run:

```
$ npm run package
```

Running this command will build and minify the theme's assets and place a .zip archive of the theme in the `packaged` directory. This excludes the developer files/directories from your theme like `/node_modules`, `/src`, etc. to keep the theme lightweight for transferring the theme to a staging or production server.

### Project structure

In the `/src` folder you will the working files for all your assets. Every time you make a change to a file that is watched by Gulp, the output will be saved to the `/dist` folder. The contents of this folder is the compiled code that you should not touch (unless you have a good reason for it).

The `/page-templates` folder contains templates that can be selected in the Pages section of the WordPress admin panel. To create a new page-template, simply create a new file in this folder and make sure to give it a template name.

I guess the rest is quite self explanatory. Feel free to ask if you feel stuck.

### Styles and Sass Compilation

 * `style.css`: Do not worry about this file. (For some reason) it's required by WordPress. All styling are handled in the Sass files described below

 * `src/assets/scss/app.scss`: Make imports for all your styles here
 * `src/assets/scss/global/*.scss`: Global settings
 * `src/assets/scss/components/*.scss`: Buttons etc.
 * `src/assets/scss/modules/*.scss`: Topbar, footer etc.
 * `src/assets/scss/templates/*.scss`: Page template styling

 * `dist/assets/css/app.css`: This file is loaded in the `<head>` section of your document, and contains the compiled styles for your project.

If you're new to Sass, please note that you need to have Gulp running in the background (``npm start``), for any changes in your scss files to be compiled to `app.css`.

### JavaScript Compilation

All JavaScript files, including Foundation's modules, are imported through the `src/assets/js/app.js` file. The files are imported using module dependency with [webpack](https://webpack.js.org/) as the module bundler.

If you're unfamiliar with modules and module bundling, check out [this resource for node style require/exports](http://openmymind.net/2012/2/3/Node-Require-and-Exports/) and [this resource to understand ES6 modules](http://exploringjs.com/es6/ch_modules.html).

Foundation modules are loaded in the `src/assets/js/app.js` file. By default all components are loaded. You can also pick and choose which modules to include. Just follow the instructions in the file.

If you need to output additional JavaScript files separate from `app.js`, do the following:
* Create new `custom.js` file in `src/assets/js/`. If you will be using jQuery, add `import $ from 'jquery';` at the top of the file.
* In `config.yml`, add `src/assets/js/custom.js` to `PATHS.entries`.
* Build (`npm start`)
* You will now have a `custom.js` file outputted to the `dist/assets/js/` directory.


## Local Development
We recommend using one of the following setups for local WordPress development:

* [MAMP](https://www.mamp.info/en/) (macOS)
* [WAMP](http://www.wampserver.com/en/download-wampserver-64bits/) (Windows)
* [LAMP](https://www.linux.com/learn/easy-lamp-server-installation) (Linux)
* [Local](https://local.getflywheel.com/) (macOS/Windows)
* [VVV (Varying Vagrant Vagrants)](https://github.com/Varying-Vagrant-Vagrants/VVV) (Vagrant Box)
* [Trellis](https://roots.io/trellis/)