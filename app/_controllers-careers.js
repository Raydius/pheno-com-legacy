/**
 * AngularJS Controllers for Careers Pages
 */


var angular = require('angular');


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
						url: '/careers/'+job.id+'/',
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


/**
 * Controller for individual job landing page
 *
 * Queries job data from Greenhouse.io
 */
angular.module('phenoCom').controller('jobController', function($scope, $stateParams, $http, $sce) {

	var jobId = $stateParams.jobId;
	var url = 'https://api.greenhouse.io/v1/boards/phenomenon/embed/job?id='+jobId+'&questions=true';

	$scope.applyUrl = '/careers/'+jobId+'/apply/';

	$http({
		method: 'GET',
		url: url
	}).then(function (response) {
		$scope.data = response.data;
		console.log($scope.data);

	});

	$scope.renderHtml = function(html_code) {
		var txt = document.createElement("textarea");
		txt.innerHTML = html_code;
		return $sce.trustAsHtml(txt.value);
	};

});
