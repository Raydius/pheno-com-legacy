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

$('body').show();
$(window).on('hashchange', function(e){
    $('body').hide();
});

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-51195233-1', 'phenomenon.com');
ga('send', 'pageview');

angular.module('phenoCom',[
    uirouter,
    ngAnimate,
    'ngCookies',
    'ui.router.metatags',
    'ngMessages',
    '720kb.socialshare'
]);


require('./_config');

angular.module('phenoCom').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    // config routing
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
});


require('./_run');
require('./_controllers');
require('./_directives');
