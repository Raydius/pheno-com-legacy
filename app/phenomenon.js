/**
 * Created by rdollete on 4/1/16.
 */

import 'bootstrap';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';

import Snap from 'snapjs';
window.Snap = Snap;

import 'angular-snap';

require('angular-cookies');
require('angular-messages');
require('angular-snap');

angular.module('phenoCom',[
    uirouter,
    'snap',
    ngAnimate,
    'ngCookies',
    'ngMessages'
]);


require('./_config');
require('./_run');
require('./_controllers');
require('./_directives');
