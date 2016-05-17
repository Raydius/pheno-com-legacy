import 'npm/owl-carousel-2/owl.carousel';

var copy = require('app/copy.js');

angular.module('phenoCom').config(function($sceDelegateProvider) {


  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://tech.phenomenonstaging.com/**',
    'https://player.vimeo.com/**',
    'https://vimeo.com/**'
  ]);

});
