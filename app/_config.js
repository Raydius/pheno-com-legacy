/**
 * Created by rdollete on 4/1/16.
 */

import 'npm/owl-carousel-2/owl.carousel';

angular.module('phenoCom').config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {


    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://tech.phenomenonstaging.com/**',
        'https://player.vimeo.com/**',
        'https://vimeo.com/**'
    ]);


});
