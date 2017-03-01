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
		departments: [{id: 0, name: 'Loading departments...'}],
		title: '',
		content: ''
	};

	// get jobId from URL parameter
	$scope.jobId = $stateParams.jobId;

	// otherwise get the information from Greenhouse for this job
	//else {
		$scope.applyRoute = 'job.application';
		//$scope.applyUrl = '/careers/' + $scope.jobId + '/apply/';

		$http({
			method: 'GET',
			url: $scope.apiUrl + '/jobs/job/' + $scope.jobId + '/'
		}).then(function (response) {
			$scope.data = response.data;

		});

		$scope.renderHtml = function(html_code) {
			let txt = document.createElement("textarea");
			txt.innerHTML = html_code;
			return $sce.trustAsHtml(txt.value);
		};
	//}


});


/**
 * Controller for Job-Specific Application Form
 */
angular.module('phenoCom').controller('jobApplicationController', function($scope, $state, $stateParams, $location, $http, envService) {

	// allow submit status (prevent multiple submits while form is uploading)
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

	// initial placeholder data
	$scope.data = {
		departments: [{id: 0, name: 'Loading departments...'}],
		title: '',
		content: ''
	};
	$scope.selectedDepartment = 0;

	$scope.selectNewDeptartment = function(departmentId) {
		$scope.selectedDepartment = departmentId;
	};

	// LinkedIn integration
	/*
	$scope.authLinkedIn = function() {

		// this functionality is temporarily disabled -RD
		let url = $scope.apiUrl + '/jobs/linkedin/oauth';
		window.open(url, 'li_auth', 'toolbar=no,scrollbars=no,resizable=yes,top=500,left=500,width=480,height=550');
	};*/

	// get jobId from URL parameter
	$scope.jobId = $stateParams.jobId;

	// use appropriate API based on current environment
	$scope.apiUrl = envService.read('apiUrl');


	// functionality that only applies to the generic (non-job-specific) form
	if($scope.jobId == 0) {

		// get list of departments from Greenhouse
		$http({
			method: 'GET',
			url: $scope.apiUrl + '/jobs/departments/'
		}).then(function (response) {
			$scope.data.departments = response.data;
		});

	}

	$scope.submitForm = function() {

		// only process form if the submit is not disabled
		if($scope.disableSubmit == false) {

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
					'linkedin': $scope.user.linkedin,
					'department': $scope.selectedDepartment
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
					$scope.allowSubmit(true);

				});

			}
			else {

				$scope.allowSubmit(true);

				angular.forEach($scope.userForm, function (value, key) {

					// add field-level error messages after attempted submit even if user has never entered those fields
					if (typeof value === 'object') {
						let el = $scope.userForm[key];

						if (el.$invalid) {
							el.attempted = true;
						}
					}

				});

				$scope.userForm.$setPristine();
				$scope.userForm.$setUntouched();

				alert('Please fill out all of the required fields.');
			}
		}
	};

	$scope.allowSubmit(true);
});
