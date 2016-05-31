/**
 * Created by rdollete on 4/1/16.
 */

import 'bootstrap';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import 'angular-socialshare';
import 'sticky-kit/dist/sticky-kit.min.js';
import 'ui-router-metatags/dist/ui-router-metatags.min.js';

require('angular-cookies');
require('angular-messages');
require('angular-snap');

angular.module('phenoCom',[
    uirouter,
    ngAnimate,
    'ngCookies',
    'ui.router.metatags',
    'ngMessages',
    '720kb.socialshare' 
]);


require('./_config');
require('./_routes');
require('./_run');
require('./_controllers');
require('./_directives');
