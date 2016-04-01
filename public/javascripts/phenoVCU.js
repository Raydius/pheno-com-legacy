/**
 * Created by Ray Dollete on 3/11/16.
 */

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-51195233-3', 'auto');
ga('send', 'pageview');


var app = angular.module('phenoVCU',['ui.router','snap','ngAnimate','ngCookies', 'ngMessages']);

app.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider, snapRemoteProvider) {

	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'http://tech.phenomenonstaging.com/**',
		'https://player.vimeo.com/**',
		'https://vimeo.com/**'
	]);


  // setup Snap options
  snapRemoteProvider.globalOptions = {
    hyperextensible: false,
		disable: 'right'
  };

	// config routing
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/views/index',
			data: {
				pageTitle: 'PHENOMENON - Select Case Studies'
			}
		})

		.state('wilson-x', {
			url: '/wilson-x',
			templateUrl: '/views/wilson-x',
			data: {
				pageTitle: 'PHENOMENON - Wilson X case study'
			}
		})

		.state('wilson-anthem', {
			url: '/wilson-anthem',
			templateUrl: '/views/wilson-anthem',
			data: {
				pageTitle: 'PHENOMENON - Wilson Anthem case study'
			}
		})

		.state('xome', {
			url: '/xome',
			templateUrl: '/views/xome',
			data: {
				pageTitle: 'PHENOMENON - Xome case study'
			}
		})

		.state('think-thin', {
			url: '/think-thin',
			templateUrl: '/views/think-thin',
			data: {
				pageTitle: 'PHENOMENON - thinkThin case study'
			}
		})

		.state('contact', {
			url: '/contact',
			templateUrl: '/views/components/contact-form',
			controller: 'contactController',
			data: {
				pageTitle: 'PHENOMENON - Contact Us'
			}
		})

		.state('thanks', {
			url: '/thanks',
			templateUrl: '/views/components/thanks',
			data: {
				pageTitle: 'PHENOMENON - Thanks'
			}
		})
	;
});


app.run(function($rootScope, $window, $location, snapRemote) {
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


app.controller('phenoController', function($state, $scope, $cookies, snapRemote) {

	// manual function for closing drawer
	$scope.closeDrawer = function() {
		snapRemote.getSnapper().then(function (snapper) {
			snapper.close();
		});
	};

	// manual function for toggling drawer
	$scope.snapToggle = function() {
		snapRemote.getSnapper().then(function(snapper) {

			if(snapper.state().state != 'left' ) {
				$('#hamburger').addClass('open');
				snapper.open('left');
			}

		});
	};


	// denote that user has been here, hold data for 15 days
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() + 30);
	$cookies.put('visited', 1, { 'expires': expireDate, 'path': '/' });

	// detect state and store in scope
	$scope.$state = $state;

	// use current state to determine which menu item is selected
	$scope.isSelected = function(sref) {
		if(sref == $state.$current.name) {
			return true;
		}

		return false;
	};



});


app.controller('contactController', function($scope, $state, $http) {

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



app.directive('carouselComponent', function() {

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
app.directive('videoComponent', function() {
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
app.directive('scrollableComponent', function($window) {

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
app.directive('fileModel', ['$parse', function ($parse) {
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
app.directive('updateTitle', ['$rootScope', '$timeout',
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