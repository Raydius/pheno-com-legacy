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