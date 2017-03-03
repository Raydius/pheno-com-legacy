/**
 * Created by rdollete on 5/12/16.
 */

import 'npm/owl-carousel-2/owl.carousel';

let copy = require('app/copy.js');

let templateHome = require('views/welcome.pug');
let templateAbout = require('views/about.pug');
let templateWork = require('views/work.pug');
//var templateEntertainment = require('views/entertainment.pug');
let templateCulture = require('views/culture.pug');
let templateContact = require('views/contact.pug');
let templateBlog = require('views/blog.pug');
let templateBlogPostSingle = require('views/blog-post-single.pug');
let templateError = require('views/404.pug');

let templateJobs = require('views/jobs.pug');
let templateJob = require('views/components/job-listing.pug');
let templateApplication = require('views/components/job-application.pug');
let templateApplicationThanks = require('views/thanks.pug');



angular.module('phenoCom').config(function($stateProvider, $urlRouterProvider, $locationProvider) {


    $urlRouterProvider.when('', '/');

	// TODO: 404 handler
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
                    'og:title': 'Phenomenon - Innovations Company | About',
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
                description: 'client work, projects, media',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation, work, clients, projects, media',
                properties: {
                    'og:type': 'website',
                    'og:title': 'Phenomenon - Innovations Company | Work',
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
					    return caseObject.client + ': ' + caseObject.title;
                    },
					'og:description': function(caseObject) {
					    return 'phenomenon - An independent agency for independent minds.';
                    },
					'og:image': function(caseObject) {
					    return caseObject.shareImg;
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


		/**
		 * Careers page routes
		 */
		// main careers landing page
        .state('careers', {
            url: '/careers/',
            template: templateJobs,
            controller: 'jobsController',
            metaTags: {
                title: 'phenomenon - Innovations Company | Careers',
                description: 'phenomenon - Innovations Company - jobs, careers, open positions',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation, jobs, careers',
                properties: {
                    'og:type': 'website',
                    'og:title': 'Phenomenon - Innovations Company | Careers',
                    'og:description': 'Phenomenon - Innovations Company',
                    'og:image': require('assets/images/fb-share-center.png')
                }
            }
        })
		// post application submission "thank you" page -- this comes before the job routes intentionally in order to capture the /thanks/ sub-route
		.state('thanks', {
			url: '/careers/thanks/',
			template: templateApplicationThanks,
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
        // job-specific description
		.state('job', {
			url: '/careers/:jobId/',
			controller: 'jobController',
			template: templateJob
		})
		// job-specific application
		.state('job.application', {
			url: 'apply/',
			controller: 'jobApplicationController',
			template: templateApplication
		})



		/**
		 * Blog-related routes
		 */

		.state('blog', {
            url: '/blog/',
            template: templateBlog,
            controller: 'blogController',
            metaTags: {
                title: 'phenomenon - Innovations Company | Blog',
                description: 'phenomenon Innovations Company - Contact us about careers, new business, and public relations.',
                keywords: 'phenomenon, agency, innovation, blog, marketing, UX, digital, cultural, advertising, ideation, PR',
                properties: {
                    'og:type': 'website',
                    'og:title': 'Phenomenon - Innovations Company | Blog',
					'og:description': 'Phenomenon - Innovations Company',
					'og:image': require('assets/images/fb-share-center.png')
                }
            }
        })
        .state('post', {
            url: '/blog/:slug/',
            template: templateBlogPostSingle,
            controller: 'blogPostController'
        })


		// contact page
		.state('contact', {
			url: '/contact/',
			template: templateContact,
			controller: 'contactController',
			metaTags: {
				title: 'phenomenon - Innovations Company | Contact',
				description: 'phenomenon Innovations Company - Contact us about careers, new business, and public relations.',
				keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation, contact us, jobs, new business, PR',
				properties: {
					'og:type': 'website',
					'og:title': 'Phenomenon - Innovations Company',
					'og:description': 'Phenomenon - Innovations Company',
					'og:image': require('assets/images/fb-share-center.png')
				}
			}
		})


		// error state (pseudo 404)
        .state('error', {
            url: '/error/',
            template: templateError
        })





    ;

    $locationProvider.html5Mode(true);

});
