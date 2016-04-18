/**
 * Created by rdollete on 4/1/16.
 */

angular.module('phenoCom').run(function($rootScope, $window, $location, $anchorScroll) {
    var $main = $('main');
    // detect state change
    $(window).on('hashchange', function(e){
       $('html, body').animate({
                scrollTop: 0
            }, 300, function(){
        });
    });

    $rootScope.$on('$stateChangeSuccess', function() {
        // scroll to the top
        $main.animate({ scrollTop: 0 }, 400);

        // close snap drawer
        $main.trigger('routeChange');

        // fire Google Analytics tracking
        $window.ga('send', 'pageview', { page: $location.url() });


    });

});
