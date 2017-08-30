# README #

### Stack Summary ###

Back-end: Webpack is used for the development environment, but static builds are created for deployment.

Front-end Core Framework: AngularJS (v1)

### What is this repository for? ###

This codebase is a legacy version of the marketing site phenomenon.com to be used for educational purposes.

### How do I get set up? ###

When running 'npm start' a static site will be created using webpack.  The component files are located as follows:

/app - core javascript files written for AngularJS as well as copy.js which contains most site copy
/assets - static graphics used throughout the site
/nginx - nginx configuration files in order to support HTML5 mode routing and prerender.io cacheing
/stylesheets - stylesheets, written in SASS
/views - view templates, written using PugJS

This site requires NodeJS and NPM in order to install all of the package dependencies.  While this site was
configured to run on nginx web server, it can be easily configured to run on any web server that allows "HTML 5 Mode"
Angular routing.

The "Blog" and "Careers" section of the site require API connections to WordPress and Greenhouse, respectively, whose
credentials are abstracted using a custom middleware.  This would have to be reconstructed in order to restore
this functionality.

A docker-compose.yml is included in order to easily provision a container with the latest stable version of nginx that
can be mapped to any port other than the default port 80 (shown as port 2070 for example).  This can be useful for
development installations and systems that host multiple web servers.  Note that the static build that comes out of
webpack requires absolute URLs to be specified (including ports) in order to avoid issues with fonts and other CSS
elements.  In order to make changes to this, see webpack.config.js

### Contribution guidelines ###

This site is shown for educational purposes and is no longer maintained or updated.

### Who do I talk to? ###

Ray Dollete <ray@raytalkstech.com>