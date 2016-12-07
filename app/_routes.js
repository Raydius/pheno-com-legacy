/**
 * Created by rdollete on 5/12/16.
 */

import 'npm/owl-carousel-2/owl.carousel';

var copy = require('app/copy.js');

var templateHome = require('views/welcome.pug');
var templateAbout = require('views/about.pug');
var templateWork = require('views/work.pug');
var templateEntertainment = require('views/entertainment.pug');
var templateCulture = require('views/culture.pug');
var templateContact = require('views/contact.pug');
var templateJobs = require('views/jobs.pug');
var templateBlog = require('views/blog.pug');
var templateBlogPostSingle = require('views/blog-post-single.pug');
var templateError = require('views/404.pug');
var templateJob = require('views/job.pug');
var templateApplication = require('views/application.pug');


angular.module('phenoCom').config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    // TODO: 404 handler
    $urlRouterProvider.when('', '/');
    /*$urlRouterProvider.otherwise(function($injector, $location) {
        console.log('otherwise');
    });*/

    $urlRouterProvider.otherwise('/error/');

    // config routing
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
            url: '/about/',
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
            url: '/work/',
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
        .state('work-case', {
            url: '/work/:case/',
            resolve: {
                caseObject: function($stateParams) {
                    return copy.content[$stateParams.case];
                }
            },
            template: function($stateParams) {
                return require('views/'+$stateParams.case+'.pug');
			},
            metaTags: {
				title: function(caseObject) { return caseObject.title },
				description: function(caseObject) {
				    return caseObject.ogDescription;
                },
				keywords: function(caseObject) {
				    return 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation, work, clients, projects, media, ' + caseObject.client;
                },
				properties: {
					'og:type': 'website',
					'og:title': function(caseObject) {
					    return 'phenomenon - Innovations Company | Work - ' + caseObject.title;
                    },
					'og:description': function(caseObject) {
					    return 'phenomenon - Innovations Company - client work, projects, media - ' + caseObject.client;
                    },
					'og:image': function(caseObject) {
					    return caseObject.imageUrl;
					}
				}
			},
			data: {
				shareUrl: 'link'
			}

        })


        .state('culture', {
            url: '/culture/',
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
            url: '/jobs/',
            template: templateJobs,
            controller: 'jobsController',
            metaTags: {
                title: 'phenomenon - Innovations Company | Jobs',
                description: 'phenomenon - Innovations Company - jobs, careers, open positions',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation',
                properties: {
                    'og:type': 'website',
                    'og:title': 'Phenomenon - Innovations Company',
                    'og:description': 'Phenomenon - Innovations Company',
                    'og:image': require('assets/images/fb-share-center.png')
                },
                ncyBreadcrumb: {
                label: 'Jobs'
              }
            }
        })
        .state('contact', {
            url: '/contact/',
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
            url: '/blog/',
            template: templateBlog,
            controller: 'blogController'
        })
        .state('post', {
            url: '/blog/:slug/',
            template: templateBlogPostSingle,
            controller: 'blogPostController'
        })
        .state('error', {
            url: '/error/',
            template: templateError,
        })
        .state('job', {
            url: '/job/',
            template: templateJob,
            ncyBreadcrumb: {
            label: 'job name'
          }
        })
        .state('application', {
            url: '/job/application/',
            template: templateApplication,
            ncyBreadcrumb: {
            // label: 'job name'
          }
        })

        .state('thanks', {
            url: '/job/thanks/',
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

    $locationProvider.html5Mode(true);

});
