/**
 * Created by rdollete on 4/1/16.
 */

import 'bootstrap';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';

import '../js/sticky.min.js';

require('angular-cookies');
require('angular-messages');
require('angular-snap');

angular.module('phenoCom',[
    uirouter,
    ngAnimate,
    'ngCookies',
    'ngMessages',
    'sticky'
]);


require('./_config');
require('./_run');
require('./_controllers');
require('./_directives');
