/**
 * AngularJS Controllers for Blog Pages
 */


// controller for blog landing page
angular.module('phenoCom').controller('blogController', function($scope, $state, $sce, $http, envService) {

	var apiUrl = envService.read('apiUrl');

	$scope.articles = [];

	console.log(apiUrl + '/blog/');

	// get all blog posts
	$http({
		method: 'GET',
		url: apiUrl + '/blog/'
	}).then(function (response) {

		var articles = response.data;

		console.log(articles);

		// get article object from phenomenon api
		for(var i=0, len=articles.length; i < len; i++) {
			$scope.articles.push(articles[i]);
		}

	});


});

// controller for individual blog posts
angular.module('phenoCom').controller('blogPostController', function($scope, $state, $sce, $http, $stateParams, envService) {

	var apiUrl = envService.read('apiUrl');

	var slug = $stateParams.slug;

	$scope.article = {};

	$http({
		method: 'GET',
		url: apiUrl + '/blog/article/' + slug + '/'
	}).then(function(response) {
		console.log(response.data);

		$scope.article = response.data;
	});

});
