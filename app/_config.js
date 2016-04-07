/**
 * Created by rdollete on 4/1/16.
 */
import 'npm/owlcarousel/owl-carousel/owl.carousel';
import 'snapjs/snap.css';
import 'angular-snap'; 


var copy = require('app/copy.js');

var templateAbout = require('views/about.jade');
var templateWork = require('views/work.jade');
var templateWorkWilsonX = require('views/wilson-x.jade');
var templateWorkSLS = require('views/sls.jade'); 
var templateWorkSunny = require('views/sunny.jade');
var templateWorkCooper = require('views/cooper.jade');  
var templateEntertainment = require('views/entertainment.jade');
var templateCulture = require('views/culture.jade');
var templateContact = require('views/contact.jade');
var templateJobs = require('views/jobs.jade'); 

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
        .state('about', {
            url: '/',
            template: templateAbout,
            data: {
                pageTitle: 'PHENOMENON'
            }
        })

        .state('work', {
            url: '/work',
            template: templateWork,
            data: {
                pageTitle: 'PHENOMENON - Wilson X case study'
            }
        })

        .state('work/wilson-x', {
            url: '/work/wilson-x',
            template: templateWorkWilsonX, 
            data: {
                pageTitle: 'PHENOMENON - Wilson X case study'
            }
        })

        .state('work/sls', {
            url: '/work/sls',
            template: templateWorkSLS, 
            data: {
                pageTitle: 'PHENOMENON - SLS case study'
            }
        })
        
        .state('work/sunny', {
            url: '/work/sunny',
            template: templateWorkSunny, 
            data: {
                pageTitle: 'PHENOMENON - Sunny case study'
            }
        })
        
        .state('work/cooper', {
            url: '/work/cooper',
            template: templateWorkCooper, 
            data: {
                pageTitle: 'PHENOMENON - Mr.Cooper case study'
            }
        })

        .state('entertainment', {
            url: '/entertainment',
            template: templateEntertainment,
            data: {
                pageTitle: 'PHENOMENON - Wilson Anthem case study'
            }
        })

        .state('culture', {
            url: '/culture',
            template: templateCulture,
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
        .state('jobs', { 
            url: '/jobs',
            template: templateJobs,
            data: {
                pageTitle: 'PHENOMENON - Jobs'
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
