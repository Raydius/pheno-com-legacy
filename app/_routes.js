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
                    'og:type': 'website',
                    'og:title': 'Phenomenon - Innovations Company',
                    'og:description': 'Phenomenon - Innovations Company',
                    'og:image': require('assets/images/fb-share-center.png')
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
                properties: {
                    'og:type': 'website',
                    'og:title': 'Phenomenon - Innovations Company',
                    'og:description': 'Phenomenon - Innovations Company',
                    'og:image': require('assets/images/fb-share-center.png')
                }
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
                    'og:type': 'website',
                    'og:title': 'Phenomenon - Innovations Company',
                    'og:description': 'Phenomenon - Innovations Company',
                    'og:image': require('assets/images/fb-share-center.png')
                }
            }
        })
        .state('work/wilson-anthem/', {
            url: '/work/wilson-anthem/',
            template: templateWorkAnthem,
            metaTags: {
                title: 'phenomenon - Innovations Company | Work - Wilson',
                description: 'phenomenon - Innovations Company - client work, projects, media - Wilson',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation, work, clients, projects, media, Wilson',
                properties: {
                    'og:type': 'website',
                    'og:title': 'phenomenon - Innovations Company | Work - Wilson Anthem',
                    'og:description': 'phenomenon - Innovations Company - client work, projects, media - Wilson',
                    'og:image': require('assets/images/work-1.jpg')
                }
            }
        })

        .state('work/wilson-x/', {
            url: '/work/wilson-x/',
            template: templateWorkWilsonX,
            metaTags: {
                title: 'phenomenon - Innovations Company | Work - Wilson',
                description: 'phenomenon - Innovations Company - client work, projects, media - Wilson X',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation, work, clients, projects, media, Wilson X',
                properties: {
                    'og:type': 'website',
                    'og:title': 'phenomenon - Innovations Company | Work - Wilson X',
                    'og:description': 'phenomenon - Innovations Company - client work, projects, media - Wilson X',
                    'og:image': require('assets/images/work-4.png')
                }
            }
        })

        .state('work/xome/', {
            url: '/work/xome/',
            template: templateWorkXome,
            metaTags: {
                title: 'phenomenon - Innovations Company | Work - Xome',
                description: 'phenomenon - Innovations Company - client work, projects, media - Xome',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation, work, clients, projects, media, Xome',
                properties: {
                    'og:type': 'website',
                    'og:title': 'phenomenon - Innovations Company | Work - Xome',
                    'og:description': 'phenomenon - Innovations Company - client work, projects, media - Xome',
                    'og:image': require('assets/images/work-2.jpg')
                }
            }
        })

        .state('work/mens-wearhouse/', {
            url: '/work/mens-wearhouse/',
            template: templateWorkMens,
            metaTags: {
                title: 'phenomenon - Innovations Company | Work - Mens Wearhouse',
                description: 'phenomenon - Innovations Company - client work, projects, media - Men\'s Wearhouse',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation, work, clients, projects, media, Men\'s Wearhouse',
                properties: {
                    'og:type': 'website',
                    'og:title': 'phenomenon - Innovations Company | Work - Men\'s Wearhouse',
                    'og:description': 'phenomenon - Innovations Company - client work, projects, media - Men\'s Wearhouse',
                    'og:image': require('assets/images/work-3.jpg')
                }
            }
        })

        .state('work/think-thin', {
            url: '/work/think-thin/',
            template: templateWorkThinkThin,
             metaTags: {
                title: 'phenomenon - Innovations Company | Work - think Thin',
                description: 'phenomenon - Innovations Company - client work, projects, media - think Thin',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation, work, clients, projects, media, think Thin',
                properties: {
                    'og:type': 'website',
                    'og:title': 'phenomenon - Innovations Company | Work - think Thin',
                    'og:description': 'phenomenon - Innovations Company - client work, projects, media - think Thin',
                    'og:image': require('assets/images/work-6.jpg')
                }
            }
        })

        .state('work/sls/', {
            url: '/work/sls-hide/',
            template: templateWorkSLS,
            data: {
                pageShareImg: require('assets/images/work-1.jpg')

            }
        })

        .state('work/sunny/', {
            url: '/work/sunny-hide/',
            template: templateWorkSunny,
            data: {
                pageShareImg: require('assets/images/work-1.jpg')

            }
        })

        .state('work/cooper/', {
            url: '/work/cooper-hide/',
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

        .state('entertainment/', {
            url: '/entertainment-hide/',
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
                properties: {
                    'og:type': 'website',
                    'og:title': 'Phenomenon - Innovations Company',
                    'og:description': 'Phenomenon - Innovations Company',
                    'og:image': require('assets/images/fb-share-center.png')
                }
            }
        })

       
        .state('jobs', {
            url: '/jobs',
            template: templateJobs,
            metaTags: {
                title: 'phenomenon - Innovations Company | Jobs',
                description: 'phenomenon - Innovations Company - jobs, careers, open positions',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation',
                properties: {
                    'og:type': 'website',
                    'og:title': 'Phenomenon - Innovations Company',
                    'og:description': 'Phenomenon - Innovations Company',
                    'og:image': require('assets/images/fb-share-center.png')
                }
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
                properties: {
                    'og:type': 'website',
                    'og:title': 'Phenomenon - Innovations Company',
                    'og:description': 'Phenomenon - Innovations Company',
                    'og:image': require('assets/images/fb-share-center.png')
                }
            }
        })

        .state('blog', {
            url: '/blog',
            template: 'test'
        })

        .state('thanks', {
            url: '/thanks',
            templateUrl: '/views/components/thanks',
            metaTags: {
                title: 'phenomenon - Innovations Company | Thanks',
                description: 'phenomenon - Innovations Company.  We help consumer companies refocus their marketing spend, evolve their brands, and take advantage of "big idea" thinking.',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation',
                properties: {
                    'og:type': 'website',
                    'og:title': 'Phenomenon - Innovations Company',
                    'og:description': 'Phenomenon - Innovations Company',
                    'og:image': require('assets/images/fb-share-center.png')
                }
            }
        })
    ;
});
