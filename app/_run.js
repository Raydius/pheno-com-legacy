/**
 * Created by rdollete on 4/1/16.
 */

require('angular-snap');

angular.module('phenoCom').run(function($rootScope, $window, $location, snapRemote) {
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

    // disable/close snapper if bigger than 640
    snapRemote.getSnapper().then(function(snapper) {
        function onResizeCallback() {
            if ($window.innerWidth <= 736) {

                snapper.enable();

                snapper.settings({
                    maxPosition: $('snap-content').width() - 70 // leave room for 'X' interaction
                });

            } else {
                snapper.close();
                snapper.disable();
            }
        }

        onResizeCallback();

        $(window).resize(onResizeCallback);

        snapper.on('animated', function() {

            if(snapper.state().state == 'left') {
                $('#hamburger').addClass('open');
            }
            else {
                $('#hamburger').removeClass('open');
            }
        });

        snapper.on('close', function() {
            $('#hamburger').removeClass('open');
        });

        $main.on('routeChange', function(){
            snapper.close();
        })

    });


});
