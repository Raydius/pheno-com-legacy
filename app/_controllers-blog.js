/**
 * AngularJS Controllers for Blog Pages
 */


var angular = require('angular');


// controller for blog landing page
angular.module('phenoCom').controller('blogController', function($scope, $state, $sce, $http, envService) {

	var apiUrl = envService.read('apiUrl');

	$scope.articles = [];

	// get all blog posts
	$http({
		method: 'GET',
		url: apiUrl + '/wp-json/wp/v2/article'
	}).then(function (response) {

		var articles = response.data;

		for(var i=0, len=articles.length; i < len; i++) {

			var articleData = articles[i];

			var article = {
				title: articleData.title.rendered,
				slug: articleData.slug,
				preview: articleData.acf.preview,
				thumbnail: articleData.better_featured_image.media_details.sizes.medium.source_url,
				alt: articleData.better_featured_image.alt_text,
				author: articleData.acf.author,
				position: (articleData.acf.position) ? articleData.acf.position : ''
			};

			$scope.articles.push(article);

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
		url: apiUrl + '/wp-json/wp/v2/article?slug='+slug
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
				positionTitle: post.acf.position
			};
			console.log($scope.article);
		}
		else {
			// error
			console.log('WP Error: Number of articles returned was not 1.');
		}

	});

});
