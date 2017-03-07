/**
 * AngularJS Controllers for Careers Pages
 *
 * These controllers are used within the careers page and sub-pages in order to integrate
 * Greenhouse.io and LinkedIn through the middleware API whose URL is part of the initial envService
 * configuration.
 *
 * @author Ray Dollete <rdollete@phenomenon.com>
 */


/**
 * Main Careers Listing Page
 */
angular.module('phenoCom').controller('jobsController', function($scope, $state, $http, envService, genericJobId) {

	// use appropriate API based on current environment
	$scope.apiUrl = envService.read('apiUrl');

	$scope.genericUrl = '/careers/' + genericJobId + '/apply/';

	$scope.jobs = {
		departments: []
	};

	$http({
		method: 'GET',
		url: $scope.apiUrl + '/jobs/'
	}).then(function (response) {
		$scope.jobs.departments = response.data;
	});

});


/**
 * Controller for individual job landing page
 *
 * Queries job data from API middleware which sources its data from Greenhouse.io
 */
angular.module('phenoCom').controller('jobController', function($scope, $stateParams, $http, $sce, envService, genericJobId) {

	// use appropriate API based on current environment
	$scope.apiUrl = envService.read('apiUrl');

	// get jobId from URL parameter
	$scope.jobId = $stateParams.jobId;

	// set flag that toggles whether this is a generic application or a job-specific one
	$scope.genericApplication = ($scope.jobId == genericJobId);

	// placeholder to prevent page from showing 'undefined' for job data before API call has returned data
	$scope.data = {
		content: ''
	};

	if($scope.genericApplication) {

		// job title for general application breadcrumb
		$scope.data.title = 'General Application';

	}
	else {
		// get Greenhouse job details from middleware API
		$http({
			method: 'GET',
			url: $scope.apiUrl + '/jobs/job/' + $scope.jobId + '/'
		}).then(function (response) {
			$scope.data = response.data;
		});
		// TODO: add error handling in case API is unreachable or gives an error
	}

	// allow stored HTML for job description to be displayed literally
	$scope.renderHtml = function(html_code) {
		let txt = document.createElement("textarea");
		txt.innerHTML = html_code;
		return $sce.trustAsHtml(txt.value);
	};

});


/**
 * Controller for Job Application Form
 *
 * NOTE: this controller will inherit the scope from jobController
 */
angular.module('phenoCom').controller('jobApplicationController', function($scope, $state, $stateParams, $location, $http) {

	/**
	 * We use $scope.disableSubmit as a flag variable instead of HTML button disable to indicate whether the form
	 * can be submit or not because it plays better with the validation functions we use that override normal
	 * submit functionality
	 */
	$scope.allowSubmit = function(allow) {

		if(allow) {
			$scope.disableSubmit = false;
			$scope.submitText = 'Submit Application';
		}
		else {
			$scope.disableSubmit = true;
			$scope.submitText = 'Saving...';
		}
	};

	// functionality that only applies to the generic (non-job-specific) form
	if($scope.genericApplication) {

		$scope.data.title = 'General Application';

		// store currently selected department ID
		$scope.selectedDepartment = 'Select Department';

		// initial loading state of 'Select Department' dropdown while waiting for Greenhouse API results
		$scope.data.departments = [{id: 0, name: 'Loading departments...'}];

		// set selected department ID when dropdown option is chosen
		$scope.selectNewDepartment = function(departmentName) {
			$scope.selectedDepartment = departmentName;
		};

		// get list of departments from Greenhouse
		$http({
			method: 'GET',
			url: $scope.apiUrl + '/jobs/departments/'
		}).then(function (response) {
			$scope.data.departments = response.data;
		});

	}

	// LinkedIn integration
	/*
	$scope.authLinkedIn = function() {
		// this functionality is temporarily disabled -RD
		let url = $scope.apiUrl + '/jobs/linkedin/oauth';
		window.open(url, 'li_auth', 'toolbar=no,scrollbars=no,resizable=yes,top=500,left=500,width=480,height=550');
	};*/


	// form validation and submission
	$scope.submitForm = function() {

		// only process form if the submit is not disabled
		if($scope.disableSubmit == false) {

			// disable submit to keep user from submitting multiple times
			$scope.allowSubmit(false);

			if ($scope.userForm.$valid) {

				// compile form fields into data object
				let data = ({
					'id': $scope.jobId,
					'first_name': $scope.user.firstname,
					'last_name': $scope.user.lastname,
					'email': $scope.user.email,
					'phone': $scope.user.phone,
					'website': $scope.user.website,
					'department': $scope.selectedDepartment,
					'linkedin': $scope.user.linkedin

				});

				// create FormData object from form fields and optional file attachment
				let fd = new FormData();
				fd.append('data', JSON.stringify(data));
				fd.append('resume', $scope.resume);

				$http({
					method: 'POST',
					url: $scope.apiUrl + '/jobs/apply/',
					data: fd,
					headers: {'Content-Type': undefined},
					transformRequest: angular.identity
				}).then(function (response) {

					// if successful, go to thank you page
					if (response.data.success == "Candidate saved successfully") {
						$state.go('thanks');
					}

					// if not (either proxy API unreachable, or Greenhouse API unreachable)
					else {
						console.log(response);
						// handle errors
						$scope.allowSubmit(true);
					}

					// $('.resume-attached-hidden').show()


				}, function (data, status, headers, config) {

					// handle errors

					// re-enable submit
					$scope.allowSubmit(true);

				});

			}
			else {

				// re-enable submit
				$scope.allowSubmit(true);

				// step through all form fields
				angular.forEach($scope.userForm, function (value, key) {

					// add field-level error messages after attempted submit even if user has never entered those fields
					if (typeof value === 'object') {
						let el = $scope.userForm[key];

						if (el.$invalid) {
							el.attempted = true;
						}
					}

				});

				// reset form status so that it can be submit again
				$scope.userForm.$setPristine();
				$scope.userForm.$setUntouched();

				alert('Please fill out all of the required fields.');
			}
		}
	};

	// enable form submission
	$scope.allowSubmit(true);
});
