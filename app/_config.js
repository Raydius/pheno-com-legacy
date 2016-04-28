/**
 * Created by rdollete on 4/1/16.
 */
import 'npm/owl-carousel-2/owl.carousel';

var copy = require('app/copy.js');

var templateHome = require('views/welcome.jade');
var templateAbout = require('views/about.jade');
var templateWork = require('views/work.jade');
var templateWorkAnthem = require('views/wilson-anthem.jade');
var templateWorkWilsonX = require('views/wilson-x.jade');
var templateWorkSLS = require('views/sls.jade'); 
var templateWorkXome = require('views/xome.jade'); 
var templateWorkThinkThin = require('views/think-thin.jade'); 
var templateWorkMens = require('views/mens-wearhouse.jade');  
var templateWorkSunny = require('views/sunny.jade');
var templateWorkCooper = require('views/cooper.jade');  
var templateEntertainment = require('views/entertainment.jade');
var templateCulture = require('views/culture.jade');
var templateContact = require('views/contact.jade');
var templateJobs = require('views/jobs.jade'); 

angular.module('phenoCom').config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {


    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://tech.phenomenonstaging.com/**',
        'https://player.vimeo.com/**',
        'https://vimeo.com/**'
    ]);


    // config routing
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            template: templateHome,
            data: {
                pageTitle: 'PHENOMENON'
            }
        })

        .state('about', {
            url: '/about',
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
        .state('work/wilson-anthem', {
            url: '/work/wilson-anthem',
            template: templateWorkAnthem, 
            data: {
                pageTitle: 'PHENOMENON - Wilson Anthem case study'
            }
        })

        .state('work/wilson-x', {
            url: '/work/wilson-x',
            template: templateWorkWilsonX, 
            data: {
                pageTitle: 'PHENOMENON - Wilson X case study'
            }
        })

        .state('work/xome', {
            url: '/work/xome',
            template: templateWorkXome, 
            data: {
                pageTitle: 'PHENOMENON - Xome case study'
            }
        })

        .state('work/mens-wearhouse', {
            url: '/work/mens-wearhouse',
            template: templateWorkMens, 
            data: {
                pageTitle: 'PHENOMENON - Wilson Anthem case study'
            }
        })

        .state('work/think-thin', {
            url: '/work/think-thin',
            template: templateWorkThinkThin, 
            data: {
                pageTitle: 'PHENOMENON - Think Thin case study'
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
