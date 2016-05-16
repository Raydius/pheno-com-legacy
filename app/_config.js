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
//var templateWorkSLS = require('views/sls.jade');
//var templateWorkXome = require('views/xome.jade');
var templateWorkThinkThin = require('views/think-thin.jade'); 
var templateWorkMens = require('views/mens-wearhouse.jade');  
//var templateWorkSunny = require('views/sunny.jade');
//var templateWorkCooper = require('views/cooper.jade');
//var templateEntertainment = require('views/entertainment.jade');
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
            controller: 'homeController',
            data: {
                pageTitle: 'phenomenon - Innovations Company | Marketing, UX, Digital, Cultural Innovation'
            }
        })

        .state('about', {
            url: '/about',
            template: templateAbout,
            controller: 'aboutController',
            data: {
                pageTitle: 'phenomenon - Innovations Company | About Us'
            }
        })

        .state('work', {
            url: '/work',
            template: templateWork,
            data: {
                pageTitle: 'phenomenon - Innovations Company | Work'
            }
        })
        .state('work/wilson-anthem', {
            url: '/work/wilson-anthem',
            template: templateWorkAnthem, 
            controller: 'workController',
            data: {
                pageTitle: 'phenomenon - Innovations Company | Work - Wilson',
                pageShareImg: require('assets/images/work-1.jpg')                
            }
        })

        .state('work/wilson-x', {
            url: '/work/wilson-x',
            template: templateWorkWilsonX, 
            data: {
                pageTitle: 'phenomenon - Innovations Company | Work - Wilson X'
            }
        })
/*
        .state('work/xome', {
            url: '/work/xome-hide',
            template: templateWorkXome, 
            data: {
                pageTitle: 'phenomenon - Innovations Company | Work - Xome',
                pageShareImg: require('assets/images/work-1.jpg')
            }
        })
*/
        .state('work/mens-wearhouse', {
            url: '/work/mens-wearhouse',
            template: templateWorkMens, 
            data: {
                pageTitle: 'phenomenon - Wilson Anthem case study',
                pageShareImg: require('assets/images/work-1.jpg')

            }
        })

        .state('work/think-thin', {
            url: '/work/think-thin',
            template: templateWorkThinkThin, 
            data: {
                pageTitle: 'phenomenon - Innovations Company | Work - thinkThin',
                pageShareImg: require('assets/images/work-1.jpg')

            }
        })
/*
        .state('work/sls', {
            url: '/work/sls-hide',
            template: templateWorkSLS, 
            data: {
                pageTitle: 'phenomenon - Innovations Company | Work - SLS Las Vegas',
                pageShareImg: require('assets/images/work-1.jpg')

            }
        })

        .state('work/sunny', {
            url: '/work/sunny-hide',
            template: templateWorkSunny, 
            data: {
                pageTitle: 'phenomenon - Innovations Company | Work - Sunny',
                pageShareImg: require('assets/images/work-1.jpg')

            }
        })
        
        .state('work/cooper', {
            url: '/work/cooper-hide',
            template: templateWorkCooper, 
            data: {
                pageTitle: 'phenomenon - Mr.Cooper case study',
                pageShareImg: require('assets/images/work-1.jpg')                
            }
        })
*/
        .state('culture', {
            url: '/culture',
            template: templateCulture,
            data: {
                pageTitle: 'phenomenon - Innovations Company | Culture'
            }
        })

        .state('jobs', { 
            url: '/jobs',
            template: templateJobs,
            data: {
                pageTitle: 'phenomenon - Innovations Company | Jobs'
            }
        })
        .state('contact', {
            url: '/contact',
            template: templateContact,
            controller: 'contactController',
            data: {
                pageTitle: 'phenomenon - Innovations Company | Contact Us'
            }
        })

    ;
});
