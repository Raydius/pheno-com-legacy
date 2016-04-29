/**
 * Created by rdollete on 4/1/16.
 */

angular.module('phenoCom').run(function($rootScope, $window, $location, $anchorScroll) {

    $( document ).ready(function() {
         $('.home .icon-right-arrow').click(function() {
            $('html, body').animate({
                    scrollTop: 260
                }, 200, function(){
            });
        })
    });
   

    var $main = $('main');
    var $body = $('body');
    // detect state change
    $(window).on('hashchange', function(e){
       $('html, body').animate({
                scrollTop: 0
            }, 300, function(){
        });
       $('body').removeClass('opend');
    });

    var fixedheader = $("nav.topnav, .logo-wrapper");

    $(window).scroll(function(){
       if ($(document).scrollTop() > 0 && $(window).width() > 768) {
        fixedheader.addClass("fixed");
        $('.featured-contributors').addClass('show');
      } else {
        fixedheader.removeClass("fixed"); 
      }  
    })

    $('#hamburger').click(function(){
        $body.toggleClass('opend');
        $(this).toggleClass('open');
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
