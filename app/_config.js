import 'npm/owl-carousel-2/owl.carousel';


function defaultMetaTags(UIRouterMetatagsProvider) {
	var defaultTitle = 'phenomenon - Innovations Company | Marketing, UX, Digital, Cultural Innovation';
	var defaultDescription = 'phenomenon - Innovations Company.  We help consumer companies refocus their marketing spend, evolve their brands, and take advantage of "big idea" thinking.';
	var defaultKeywords = 'phenomenon, agency, innovation, marketing, UX, digital, cultural, advertising, ideation';
	var defaultShareImgSrc = require('assets/images/fb-share-center.png');

    UIRouterMetatagsProvider
        .setDefaultTitle(defaultTitle)
        .setDefaultDescription(defaultDescription)
        .setDefaultKeywords(defaultKeywords)
        .setStaticProperties({
                'og:type': 'website',
                'og:title': defaultTitle,
                'og:description': defaultDescription,
                'og:image': defaultShareImgSrc

            })
        .setOGURL(true);
}

angular.module('phenoCom').config(function($sceDelegateProvider, envServiceProvider) {

  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://tech.phenomenonstaging.com/**',
    'https://player.vimeo.com/**',
    'https://vimeo.com/**'
  ]);

  envServiceProvider.config(
    {
      domains: {
      local: ['localhost', '127.0.0.1'],
      staging: ['tech.phenomenonstaging.com'],
      production: ['latest.phenomenon.com','phenomenon.com']
    },
    vars: {

    }

  });

});

angular.module('phenoCom').config(['UIRouterMetatagsProvider', defaultMetaTags]);

// remove html5 mode for now since we need to deal with rewrite problem in server side
// also remove base(href="/") in layout.jade

/*angular.module('phenoCom').config(function($locationProvider) {
    $locationProvider.html5Mode(true);
});*/

angular.module('phenoCom').config([  
    '$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);