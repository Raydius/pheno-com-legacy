/**
 * Created by rdollete on 4/1/16.
 */

import 'bootstrap';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import 'angular-socialshare';
import 'sticky-kit/dist/sticky-kit.min.js';
import 'ui-router-metatags/dist/ui-router-metatags.js';
// import 'angular-breadcrumb/dist/angular-breadcrumb.min.js';

require('angular-cookies');
// require('angular-breadcrumbs');
require('angular-messages');
require('angular-snap');
require('angular-environment');
require('angular-sanitize');

// initialize dataLayer for Google Tag Manager
var dataLayer = window.dataLayer = window.dataLayer || [];

angular.module('phenoCom',[
    uirouter,
    ngAnimate,
    'ngCookies',
    // 'ncy-angular-breadcrumb',
    'ui.router.metatags',
    'ngMessages',
    '720kb.socialshare',
    'environment'
]);


require('./_config');
require('./_routes');
require('./_run');
require('./_controllers');
require('./_directives');
