/**
 * Created by rdollete on 5/12/16.
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
var defaultTitle = 'phenomenon - Innovations Company';
var defaultDescript = 'phenomenon - Innovations Company';
var defaultShareImgSrc = 'assets/images/fb-share-center.png';

angular.module('phenoCom').config(function($stateProvider, $urlRouterProvider) {
    
    // config routing
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            template: templateHome,
            controller: 'homeController',
            metaTags: {
                title: 'phenomenon - Innovations Company | Marketing, UX, Digital, Cultural Innovation',
                description: 'phenomenon - Innovations Company.  We help consumer companies refocus their marketing spend, evolve their brands, and take advantage of "big idea" thinking.',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation',
                properties: {
                    'og:title': 'Frontpage'
                }
            }
        })

        .state('about', {
            url: '/about',
            template: templateAbout,
            metaTags: {
                title: 'phenomenon - Innovations Company | About Us',
                description: 'phenomenon - Innovations Company.  We help consumer companies refocus their marketing spend, evolve their brands, and take advantage of "big idea" thinking.',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation',
            }
        })

        .state('work', {
            url: '/work',
            template: templateWork,
            metaTags: {
                title: 'phenomenon - Innovations Company | Work',
                description: 'phenomenon - Innovations Company - client work, projects, media',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation, work, clients, projects, media',
                properties: {
                    'og:title': 'Frontpage'
                }
            }
        })
        .state('work/wilson-anthem', {
            url: '/work/wilson-anthem',
            template: templateWorkAnthem,
            metaTags: {
                title: 'phenomenon - Innovations Company | Work - Wilson',
                description: 'phenomenon - Innovations Company - client work, projects, media - Wilson',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation, work, clients, projects, media, Wilson',
                properties: {
                    'og:type': 'website',
                    'og:title': 'phenomenon - Innovations Company | Work - Wilson',
                    'og:description': 'phenomenon - Innovations Company - client work, projects, media - Wilson',
                    'og:image': require('assets/images/work-1.jpg')
                }
            }
        })

        .state('work/wilson-x', {
            url: '/work/wilson-x',
            template: templateWorkWilsonX,
            properties: {
                'og:type': 'website',
                'og:title': 'phenomenon - Innovations Company | Work - Wilson X',
                'og:description': 'phenomenon - Innovations Company - client work, projects, media - Wilson X',
                'og:image': require('assets/images/work-4.png')
            }
        })

        .state('work/xome', {
            url: '/work/xome',
            template: templateWorkXome,
            properties: {
                'og:type': 'website',
                'og:title': 'phenomenon - Innovations Company | Work - Xome',
                'og:description': 'phenomenon - Innovations Company - client work, projects, media - Xome',
                'og:image': require('assets/images/work-2.jpg')
            }
        })

        .state('work/mens-wearhouse', {
            url: '/work/mens-wearhouse',
            template: templateWorkMens,
            properties: {
                'og:type': 'website',
                'og:title': 'phenomenon - Innovations Company | Work - Men\'s Wearhouse',
                'og:description': 'phenomenon - Innovations Company - client work, projects, media - Men\'s Wearhouse',
                'og:image': require('assets/images/work-3.jpg')
            }
        })

        .state('work/think-thin', {
            url: '/work/think-thin',
            template: templateWorkThinkThin,
            properties: {
                'og:type': 'website',
                'og:title': 'phenomenon - Innovations Company | Work - thinThin',
                'og:description': 'phenomenon - Innovations Company - client work, projects, media - thinkThin',
                'og:image': require('assets/images/work-6.jpg')
            }
        })

        .state('work/sls', {
            url: '/work/sls-hide',
            template: templateWorkSLS,
            data: {
                pageShareImg: require('assets/images/work-1.jpg')

            }
        })

        .state('think-thin', {
            url: '/think-thin',
            templateUrl: '/views/think-thin',
            data: {
                pageShareImg: require('assets/images/work-1.jpg')
            }
        })

        .state('work/sunny', {
            url: '/work/sunny-hide',
            template: templateWorkSunny,
            data: {
                pageShareImg: require('assets/images/work-1.jpg')

            }
        })

        .state('work/cooper', {
            url: '/work/cooper-hide',
            template: templateWorkCooper,
            data: {
                pageShareImg: require('assets/images/work-1.jpg')
            },
            metaTags: {
                title: 'phenomenon - Innovations Company | Marketing, UX, Digital, Cultural Innovation',
                description: 'phenomenon - Innovations Company.  We help consumer companies refocus their marketing spend, evolve their brands, and take advantage of "big idea" thinking.',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation',
            }
        })

        .state('entertainment', {
            url: '/entertainment-hide',
            template: templateEntertainment,
            metaTags: {
                title: 'phenomenon - Innovations Company | Marketing, UX, Digital, Cultural Innovation',
                description: 'phenomenon - Innovations Company.  We help consumer companies refocus their marketing spend, evolve their brands, and take advantage of "big idea" thinking.',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation',
            }
        })

        .state('culture', {
            url: '/culture',
            template: templateCulture,
            metaTags: {
                title: 'phenomenon - Innovations Company | Culture',
                description: 'phenomenon - Innovations Company.  We help consumer companies refocus their marketing spend, evolve their brands, and take advantage of "big idea" thinking.',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation',
            }
        })

       
        .state('jobs', {
            url: '/jobs',
            template: templateJobs,
            metaTags: {
                title: 'phenomenon - Innovations Company | Jobs',
                description: 'phenomenon - Innovations Company - jobs, careers, open positions',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation',
            }
        })
        .state('contact', {
            url: '/contact',
            template: templateContact,
            controller: 'contactController',
            metaTags: {
                title: 'phenomenon - Innovations Company | Contact', 
                description: 'phenomenon Innovations Company - Contact us about jobs, new business, and public relations.',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation, contact us, jobs, new business, PR',
            }
        })

        .state('thanks', {
            url: '/thanks',
            templateUrl: '/views/components/thanks',
            metaTags: {
                title: 'phenomenon - Innovations Company | Thanks',
                description: 'phenomenon - Innovations Company.  We help consumer companies refocus their marketing spend, evolve their brands, and take advantage of "big idea" thinking.',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation',
            }
        })
    ;
});
