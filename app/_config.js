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

angular.module('phenoCom').config(function($sceDelegateProvider) {

  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://tech.phenomenonstaging.com/**',
    'https://player.vimeo.com/**',
    'https://vimeo.com/**'
  ]);

});

angular.module('phenoCom').config(['UIRouterMetatagsProvider', defaultMetaTags]);