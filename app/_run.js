/**
 * Created by rdollete on 4/1/16.
 */

angular.module('phenoCom').run(function($rootScope, $window, $location) {
    var $main = $('main');

    // detect state change
    $rootScope.$on('$stateChangeSuccess', function() {

        // scroll to the top
        $main.animate({ scrollTop: 0 }, 400);

        // close snap drawer
        $main.trigger('routeChange');

        // fire Google Analytics tracking
        $window.ga('send', 'pageview', { page: $location.url() });
    });

});
