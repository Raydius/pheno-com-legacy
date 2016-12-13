
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

});

angular.module('phenoCom').controller('welcomeController', function($state, $scope, $window) {

  $('.indie-agency').animate({
    'opacity':'1',
    'transition-delay':'1s'
})
setTimeout(function(){
  $('.indie-minds').animate({
    'opacity':'1',
  },1000)

},2500)

});



/**
 * Controller for Jobs Page
 *
 * Pulls data from Greenhouse.io job board
 */
angular.module('phenoCom').controller('jobsController', function($scope, $state, $http) {

    $scope.jobs = {
        departments: []
    };

    $http({
        method: 'GET',
        url: 'https://api.greenhouse.io/v1/boards/phenomenon/embed/departments'
    }).then(function (response) {

        var departments = response.data.departments;

        // step through all departments
        for(var i=0, len = departments.length; i < len; i++) {

            var depJobs = departments[i].jobs;
            var openPositions = [];

            // step through all jobs in the department
            for (var n=0, jlen = depJobs.length; n < jlen; n++) {

                var job = depJobs[n];

                // job must have a LinkedIn URL in order to be listed on the jobs page
                if(job.metadata[0].value) {

                    var position = {
                        title: job.title,
                        url: job.metadata[0].value,
                        location: job.location.name
                    };
                    openPositions.push(position);
                }

            }

            // if there were jobs in this department...
            if(openPositions.length > 0) {

                // push department to scope
                var department = {
                    'name': departments[i].name,
                    'openPositions': openPositions
                };

                $scope.jobs.departments.push(department);
            }

        }

        console.log($scope.jobs);
    });

});

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
        return;
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

// controller for blog landing page
angular.module('phenoCom').controller('blogController', function($scope, $state, $sce, $http) {


    $scope.articles = [];

    // get all blog posts
    $http({
        method: 'GET',
        url: 'http://phenomenon.com:2088/wp-json/wp/v2/article'
    }).then(function (response) {

        var articles = response.data;

        for(var i=0, len=articles.length; i < len; i++) {

            var articleData = articles[i];

            var article = {
                title: articleData.title.rendered,
                slug: articleData.slug,
                preview: articleData.excerpt.rendered,
                thumbnail: articleData.better_featured_image.media_details.sizes.medium.source_url,
                alt: articleData.better_featured_image.alt_text,
                author: articleData.acf.author
            };

            $scope.articles.push(article);

        }

    });

});

// controller for individual blog posts
angular.module('phenoCom').controller('blogPostController', function($scope, $state, $sce, $http, $stateParams) {

    var slug = $stateParams.slug;

    $scope.article = {};

    $http({
        method: 'GET',
        url: 'http://phenomenon.com:2088/wp-json/wp/v2/article?filter[name]='+slug
    }).then(function(response) {
        console.log(response.data);

        if (response.data.length == 1) {
            // success
            var post = response.data[0];

            $scope.article = {
                title: post.title.rendered,
                content: post.content.rendered,
                date: post.date,
                image: post.better_featured_image.source_url,
                author: post.acf.author,
                byline: post.acf.byline
            };
            console.log($scope.article);
        }
        else {
            // error
            console.log('error');
        }

    });

});

angular.module('phenoCom').controller('scrollController', function(){
  $('#culture-animate-1').mouseenter(function(){
    $('#culture-animate-2').css('left','0')
  })

  $('#culture-animate-2').mouseenter(function(){
    $('#culture-animate-3').animate({'opacity': '1'},2000)
    $('#culture-animate-3-quote').animate({'opacity': '1'},2000)
  })
  $('#culture-animate-3').mouseenter(function(){
    $('#culture-animate-4').animate({'opacity': '1'},1400).addClass('animated').addClass('fadeInLeft')
    $('#culture-animate-4-quote').animate({'opacity': '1'},2000).addClass('animated').addClass('slideInRight')
  })

  $('#culture-animate-4').mouseenter(function(){
    $('#culture-animate-5').animate({'opacity': '1'},1400).addClass('animated').addClass('fadeInLeft')
    $('#culture-animate-5-quote').animate({'opacity': '1'},2500).addClass('animated').addClass('slideInRight')
    $('#culture-animate-7').animate({'opacity': '1'},4000).addClass('animated').addClass('slideInLeft')
    $('#culture-animate-6').animate({'opacity': '1'},4000).addClass('animated').addClass('fadeInUp')
  })
  $('.culture-animate-last, #culture-animate-7, #culture-animate-8, #culture-animate-5').mouseenter(function(){
    $('#culture-animate-8').animate({'opacity': '1'},2000).addClass('animated').addClass('fadeInLeft')
    $('#culture-animate-9').animate({'opacity': '1'},2000).addClass('animated').addClass('fadeInRight')
  })

  function getXY(event) {
      var element = document.getElementById('culture-animate-1');  //replace elementId with your element's Id.
      var rect = element.getBoundingClientRect();
      var scrollTop = document.documentElement.scrollTop?
                      document.documentElement.scrollTop:document.body.scrollTop;
      var scrollLeft = document.documentElement.scrollLeft?
                      document.documentElement.scrollLeft:document.body.scrollLeft;
      var elementLeft = rect.left+scrollLeft;
      var elementTop = rect.top+scrollTop;

          if (document.all){ //detects using IE
              x = event.clientX+scrollLeft-elementLeft; //event not evt because of IE
              y = event.clientY+scrollTop-elementTop;
          }
          else {
            $('#culture-animate-2').animate({'opacity': '1'},1500).addClass('animated').addClass('slideInLeft')
            $('#culture-animate-2-quote').animate({'opacity': '1'},1500).addClass('animated').addClass('slideInRight')

      }
    }

            $('#culture-animate-1, #culture-animate-2, #culture-animate-3').mousemove(function(e){
                var m = getXY(e, this);
            });

var checkScrollSpeed = (function(settings){

                settings = settings || {};

                var lastPos, newPos, timer, delta,
                    delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

                function clear() {
                  lastPos = null;
                  delta = 0;
                }

                clear();

                return function(){
                  newPos = window.scrollY;
                  if ( lastPos != null ){ // && newPos < maxScroll
                    delta = newPos -  lastPos;
                  }
                  lastPos = newPos;
                  clearTimeout(timer);
                  timer = setTimeout(clear, delay);
                  return delta;

                  if (delta > 15) {
                    console.log(delta + ' delta exceeded 15')
                    $('#culture-animate-1, #culture-animate-2, #culture-animate-3, #culture-animate-3-quote,#culture-animate-4, #culture-animate-4-quote, #culture-animate-5, #culture-animate-5-quote, #culture-animate-6, #culture-animate-7, #culture-animate-8, #culture-animate-9').animate(
                      {'opacity':'1'},400).addClass('animated').addClass('fadeIn')
                  }
                };
            })();

            // listen to "scroll" event
            window.onscroll = function(){
              console.log( checkScrollSpeed );
            };



// $(window).bind('mousewheel', function(event) {
//
//     var x = event.clientX;
//     var y = event.clientY;
//     var coords = "X coords: " + x + ", Y coords: " + y;
//
//   if (event.originalEvent.wheelDelta <= 0) {
//   $('#culture-animate-1').animate({'opacity': '1'},1500).addClass('animated').addClass('zoomIn')
// }
//   else {
//     console.log('Scroll up');
//     }
//   });
});




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
