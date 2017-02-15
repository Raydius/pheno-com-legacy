/**
 * AngularJS Controllers for Careers Pages
 */

angular.module('phenoCom').controller('jobsController', function($scope, $state, $http, envService) {

	let apiUrl = envService.read('apiUrl');

	$scope.jobs = {
		departments: []
	};

	$http({
		method: 'GET',
		url: apiUrl + '/jobs/'
	}).then(function (response) {

		$scope.jobs.departments = response.data;

		console.log($scope.jobs);
	});

});


/**
 * Controller for individual job landing page
 *
 * Queries job data from Greenhouse.io
 */
angular.module('phenoCom').controller('jobController', function($scope, $stateParams, $http, $sce, envService) {

	// use appropriate API based on current environment
	$scope.apiUrl = envService.read('apiUrl');

	// initial placeholder data
	$scope.data = {
		departments: [''],
		title: '',
		content: ''
	};

	// get jobId from URL parameter
	$scope.jobId = $stateParams.jobId;

	$scope.applyUrl = '/careers/' + $scope.jobId + '/apply/';

	$http({
		method: 'GET',
		url: $scope.apiUrl + '/jobs/job/' + $scope.jobId + '/',
	}).then(function (response) {
		$scope.data = response.data;
	});

	$scope.renderHtml = function(html_code) {
		let txt = document.createElement("textarea");
		txt.innerHTML = html_code;
		return $sce.trustAsHtml(txt.value);
	};


});


/**
 * Controller for Job-Specific Application Form
 */
angular.module('phenoCom').controller('jobApplicationController', function($scope, $stateParams, $location, $http) {


	$scope.submitForm = function() {


		if($scope.userForm.$valid) {

			console.log('form is valid');

			// compile form fields into data object
			let data = ({
				'id': jobId,
				'first_name': $scope.user.firstname,
				'last_name': $scope.user.lastname,
				'email': $scope.user.email,
				'phone': $scope.user.phone,
				'website': $scope.user.website,
				'linkedin': $scope.user.linkedin,
				'etc': $scope.user.etc
			});

			// create FormData object from form fields and optional file attachment
			let fd = new FormData();
			fd.append('data', JSON.stringify(data));
			fd.append('resume', $scope.resume);

			$http({
				method: 'POST',
				url: apiUrl + '/jobs/apply/',
				data: fd,
				headers: {'Content-Type': undefined},
				transformRequest: angular.identity
			}).then(function(response) {

				// go to thank you page
				window.location.href = '/thanks/';

			}, function(data, status, headers, config) {

				// handle errors

			});

		}
		else {

			console.log('form is invalid');

			angular.forEach($scope.userForm, function(value, key) {

				// add field-level error messages after attempted submit even if user has never entered those fields
				if (typeof value === 'object') {
					let el = $scope.userForm[key];

					if(el.$invalid) {
						el.attempted = true;
					}
				}

			});

			$scope.userForm.$setPristine();
			$scope.userForm.$setUntouched();

			alert('Please fill out all of the required fields.');
		}
	};
});