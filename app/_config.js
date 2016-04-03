/**
 * Created by rdollete on 4/1/16.
 */

require('angular-snap');
var indexTemplate = require('views/index.jade');

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
            template: indexTemplate,
            data: {
                pageTitle: 'PHENOMENON - Select Case Studies'
            }
        })

        .state('wilson-x', {
            url: '/wilson-x',
            template: '/views/wilson-x',
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
            templateUrl: '/views/components/contact-form',
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
