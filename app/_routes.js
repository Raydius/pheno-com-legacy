/**
 * Created by rdollete on 5/12/16.
 */

import 'npm/owl-carousel-2/owl.carousel';

var copy = require('app/copy.js');

var templateHome = require('views/welcome.pug');
var templateAbout = require('views/about.pug');
var templateWork = require('views/work.pug');
var templateWorkAnthem = require('views/wilson-anthem.pug');
var templateWorkAetna = require('views/aetna-potential.pug');
var templateWorkWilsonX = require('views/wilson-x.pug');
var templateWorkSLS = require('views/sls.pug');
var templateWorkXome = require('views/xome.pug');
var templateWorkThinkThin = require('views/think-thin.pug');
var templateWorkMens = require('views/mens-wearhouse.pug');
var templateWorkSunny = require('views/sunny.pug');
var templateWorkCooper = require('views/cooper.pug');
var templateWorkFederer = require('views/federer.pug');
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
        .state('work/aetna-potential/', {
            url: '/work/aetna-potential/',
            template: templateWorkAetna,
            metaTags: {
                title: "Aetna Brings Out Medicare's Potential",
                description: 'Healthcare giant takes a more human approach with B2B initiative.',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation, work, clients, projects, media, aetna',
                properties: {
                    'og:type': 'website',
                    'og:title': 'phenomenon - Innovations Company | Work - Aetna Potential',
                    'og:description': 'phenomenon - Innovations Company - client work, projects, media - Aetna',
                    'og:image': require('assets/images/aetna/aetna-thumb.jpg')
                }
            },
            data: {
				shareUrl: 'http://phenomenon.com/work/aetna-potential/'
            }
        })
        .state('work/federer/', {
            url: '/work/federer/',
            template: templateWorkFederer,
            metaTags: {
                title: "From Federer by Federer.",
                description: 'Tennis legend includes a personal touch with launch of his first co-designed racket.',
                keywords: 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation, work, clients, projects, media, wilson, federer',
                properties: {
                    'og:type': 'website',
                    'og:title': 'phenomenon - Innovations Company | Work - From Federer',
                    'og:description': 'phenomenon - Innovations Company - client work, projects, media - Federer',
                    'og:image': require('assets/images/federer-work-image.jpg')
                }
            },
            data: {
				shareUrl: 'http://phenomenon.com/work/federer/'
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
            },
            data: {
                shareUrl: 'http://phenomenon.com/work/wilson-anthem/'
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
            },
            data: {
				shareUrl: 'http://phenomenon.com/work/wilson-x/'
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
            },
            data: {
				shareUrl: 'http://phenomenon.com/work/xome/'
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
            },
            data: {
				shareUrl: 'http://phenomenon.com/work/mens-wearhouse/'
            }
        })

        .state('work/think-thin/', {
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
            },
            data: {
				shareUrl: 'http://phenomenon.com/work/think-thin/'
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
