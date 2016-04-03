/**
 * Created by rdollete on 4/1/16.
 */


angular.module('phenoCom').directive('carouselComponent', function() {

    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var animationSpeed = 150;

            $(element).owlCarousel({
                singleItem: true,
                navigation: true,
                navigationText: [
                    "<button class='icon-left-arrow'></button>",
                    "<button class='icon-right-arrow'></button>"
                ],
                slideSpeed: animationSpeed,
                paginationSpeed: animationSpeed,
                rewindSpeed: animationSpeed,
                touchDrag: true

            });

        }
    };

});

// embedded vimeo player
angular.module('phenoCom').directive('videoComponent', function() {
    return {
        scope: {
            thumb: '@', alt: '@', title: '@', vimeo: '@'
        },
        templateUrl: '/views/components/video-component',
        link: function (scope, element, attrs) {
            scope.vimeoUrl = 'https://player.vimeo.com/video/' + scope.vimeo;
        }
    };

});

// currently not in use: embedded scrollable website
angular.module('phenoCom').directive('scrollableComponent', function($window) {

    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var $element = $(element),
                scrollFlag = false,
                scrollClass = 'scroll-active';

            angular.element($window).bind("scroll", function() {
                if( (this.pageYOffset >= $element.offset().top) &&
                    (this.pageYOffset <= $element.offset().top + 20) ){
                    if(!scrollFlag){
                        $element.toggleClass(scrollClass);
                        scrollFlag = true;
                    }
                }
                else{
                    if(scrollFlag){
                        $element.toggleClass(scrollClass);
                        scrollFlag = false;
                    }
                }
            });
        }
    };

});


// use this directive to bring file data into controller scope
angular.module('phenoCom').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            var model = $parse(attr.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){

                    // make file available in scope
                    modelSetter(scope, element[0].files[0]);

                    // update the H4 (pseudo-field)
                    var fileName = jQuery('#'+attr.id).val().split('\\').pop();
                    scope.data.labels[attr.id] = scope.data.fields[attr.id] + ' Attached: ' + fileName;

                    // fire off GA event tracker
                    ga('send', 'event', 'upload', 'attach', scope.data.ga[attr.id]);
                });

            });
        }
    };
}]);


// handle page title changes on state change
angular.module('phenoCom').directive('updateTitle', ['$rootScope', '$timeout',
    function($rootScope, $timeout) {
        return {
            link: function(scope, element) {

                var listener = function(event, toState) {

                    var title = 'Default Title';
                    if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;

                    $timeout(function() {
                        element.text(title);
                    }, 0, false);
                };

                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }
]);