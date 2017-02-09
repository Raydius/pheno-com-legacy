
var angular = require('angular');

// main global controller
angular.module('phenoCom').controller('phenoController', function($state, $scope, $cookies, envService) {

    $scope.baseUrl = envService.read('baseUrl');

    // temporary onload solution to hide unstyle content for now
    // don't forgot to remove display: none in layout.jade

    $scope.$on('$viewContentLoaded', function(){
        $('body').addClass('loaded');
    });

    // check if mobile
    (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

    // denote that user has been here, hold data for 15 days
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 30);
    $cookies.put('visited', 1, { 'expires': expireDate, 'path': '/' });

    // detect state and store in scope
    $scope.$state = $state;

    // use current state to determine which menu item is selected
    $scope.isSelected = function(sref) {
        var s = $state.$current.name;
        // make work tab selected while view work detail page
        if(sref == s || sref == s.substring(0, s.indexOf('/'))) {
            return true;
        }

        return false;
    };

    $scope.toggleDrawer = function () {
        if ($.browser.mobile || $(window).outerWidth() < 640 ) {

            $('body, html').toggleClass('opend');
            $('#hamburger').toggleClass('open');

        }
    }

});

angular.module('phenoCom').controller('homeController', function($state, $scope, $window) {

    // adjust homepage headline height to be fullscreen all the time

    var $topSection = $('.top-main');
    var $nav = $('.topnav');

    $topSection.css('height', $(window).height() - $nav.height());

    angular.element($window).bind('resize',function(){
        $topSection.css('height', $(window).height() - $nav.height());
    })

    setTimeout(function(){
      $('.indie-minds').animate({
        'opacity':'1',
      },1000)

    },1000)

});

/**
 * Controller for Jobs Page
 *
 * Pulls data from Greenhouse.io job board
 */


angular.module('phenoCom').controller('contactController', function($scope, $state, $http) {

    $scope.data = {
        fields: {
            resume: 'Resume',
            coverletter: 'Cover Letter'
        },
        labels: {
            resume: 'Choose a File',
            coverletter: 'Choose a File'
        },
        ga: {
            resume: 'resume',
            coverletter: 'cover_letter'
        }
    };


    $scope.setAttempted = function(element) {
        element.attempted = true;
    };

    $scope.sendData = function() {

        // fire GA event tracker
        ga('send', 'event', 'button', 'click', 'contact_submit');

        $scope.contactForm.attempted = true;

        if($scope.contactForm.$valid) {

            var message = "Incoming Application\n\n" +
                "First Name: " + $scope.data.firstName + "\n" +
                "Last Name: " + $scope.data.lastName + "\n" +
                "Email: " + $scope.data.email + "\n" +
                "Phone Number: " + $scope.data.phone + "\n\n" +
                "Portfolio URL: " + $scope.data.portfolioUrl + "\n" +
                "LinkedIn: " + $scope.data.linkedin;

            var url = '/sendMail';

            // prep data for API
            var data = ({
                'message': message,
                'type': 'Pheno VCU',
                'subject': 'Application from ' + $scope.data.firstName + ' ' + $scope.data.lastName
            });

            // create multipart/form-data format
            fd = new FormData();
            fd.append('data', JSON.stringify(data));
            fd.append('resume', $scope.resume);
            fd.append('coverletter', $scope.coverletter);

            // middleware API call
            $http({
                method: 'POST',
                url: url,
                data: fd,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
            }).then(function(response) {

                $state.go('thanks');

            },function(data, status, headers, config){
                errorCallback(data);
                console.log("Error------"+JSON.stringify(data)+" "+status)
            });

        }
        else {

            angular.forEach($scope.contactForm, function(value, key) {
                if (typeof value === 'object') {
                    var el = $scope.contactForm[key];
                    if(el.$invalid) {
                        el.attempted = true;
                    }
                }
            });

            $scope.contactForm.$setPristine();
            $scope.contactForm.$setUntouched();

        }

    };

});


angular.module('phenoCom').controller('aniDistances', ['$scope',
    function($scope) {
        $scope.getScrollOffsets = function(w) {

            // Use the specified window or the current window if no argument
            w = w || window;

            // This works for all browsers except IE versions 8 and before
            if (w.pageXOffset !== null) {
                return {
                    x: w.pageXOffset,
                    y: w.pageYOffset
                };
            }

            // For IE (or any browser) in Standards mode
            var d = w.document;
            if (document.compatMode === 'CSS1Compat') {
                return {
                    x: d.documentElement.scrollLeft,
                    y: d.documentElement.scrollTop
                };
            }

            // For browsers in Quirks mode
            return {
                x: d.body.scrollLeft,
                y: d.body.scrollTop
            };
        };
        $scope.getPosition = function(e) {
            return {
                x: e[0].offsetLeft,
                y: e[0].offsetTop
            };
        };
        $scope.getViewPortSize = function(w) {

            return {
                x: Math.max(document.documentElement.clientWidth, w.innerWidth || 0),
                y: Math.max(document.documentElement.clientHeight, w.innerHeight || 0)
            }

        };
    }
]);





/**
 * Holiday Card Controller Revisited
 */
angular.module('phenoCom').controller('holidayController', function($scope) {

    // set initial visibility of the gif and the video
    $scope.videoHide = true;

    $scope.playTheVideo = function() {

		// toggle visibility of the gif and the video
        $scope.videoHide = false;

        // play the video
        $('#holidayvideo').get(0).play();
    };

});
