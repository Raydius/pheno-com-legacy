/**
 * Created by rdollete on 4/1/16.
 */


import 'npm/owlcarousel/owl-carousel/owl.carousel';
import 'angular-snap';

var copy = require('app/copy.json');

var templateWilsonX = require('views/wilson-x.jade');
var templateContact = require('components/contact-form.jade');


angular.module('phenoCom').config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider, snapRemoteProvider) {


    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://tech.phenomenonstaging.com/**',
        'https://player.vimeo.com/**',
        'https://vimeo.com/**'
    ]);


    // setup Snap options
    snapRemoteProvider.globalOptions = {
        hyperextensible: false,
        disable: 'right'
    };

    // config routing
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            template: '',
            data: {
                pageTitle: 'PHENOMENON - Select Case Studies'
            }
        })

        .state('wilson-x', {
            url: '/wilson-x',
            template: templateWilsonX,
            data: {
                pageTitle: 'PHENOMENON - Wilson X case study'
            }
        })

        .state('wilson-anthem', {
            url: '/wilson-anthem',
            templateUrl: '/views/wilson-anthem',
            data: {
                pageTitle: 'PHENOMENON - Wilson Anthem case study'
            }
        })

        .state('xome', {
            url: '/xome',
            templateUrl: '/views/xome',
            data: {
                pageTitle: 'PHENOMENON - Xome case study'
            }
        })

        .state('think-thin', {
            url: '/think-thin',
            templateUrl: '/views/think-thin',
            data: {
                pageTitle: 'PHENOMENON - thinkThin case study'
            }
        })

        .state('contact', {
            url: '/contact',
            template: templateContact,
            controller: 'contactController',
            data: {
                pageTitle: 'PHENOMENON - Contact Us'
            }
        })

        .state('thanks', {
            url: '/thanks',
            templateUrl: '/views/components/thanks',
            data: {
                pageTitle: 'PHENOMENON - Thanks'
            }
        })
    ;
});
