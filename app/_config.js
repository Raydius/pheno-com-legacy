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

angular.module('phenoCom').config(['UIRouterMetatagsProvider', defaultMetaTags]);


angular.module('phenoCom').config(function($sceDelegateProvider, envServiceProvider) {

  // whitelist for CORS
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://staging.phenomenon.com/**',
    'https://player.vimeo.com/**',
    'https://vimeo.com/**'
  ]);

  /*
   * define environment-specific vars -- if you get a "Cannot read property 'baseUrl' of undefined" error
   * most likely it is because the deployed domain is not properly configured here
   */
  envServiceProvider.config({
    domains: {
		local: ['localhost', '127.0.0.1'],
		dev: ['dev.phenomenon.com'],
		staging: ['staging.phenomenon.com'],
		production: ['phenomenon.com']
    },
    vars: {
		local: {
			baseUrl: '//localhost',
			apiUrl: 'http://localhost:8080'
		},
		dev: {
			baseUrl: '//dev.phenomenon.com',
			apiUrl: 'http://dev.phenomenon.com:8080'
		},
		staging: {
			baseUrl: '//staging.phenomenon.com',
			apiUrl: 'http://api-staging.phenomenon.com'
		},
		production: {
			baseUrl: '//phenomenon.com',
			apiUrl: 'http://api.phenomenon.com'
		}
    }

  });

  // run the environment check to recall the correct set of vars
  envServiceProvider.check();

});




// html render filter for recalling HTML-formatted blog entries
angular.module('phenoCom').filter('toTrusted', ['$sce', function($sce) {

    return function(text) {
        return $sce.trustAsHtml(text);
    };

}]);
