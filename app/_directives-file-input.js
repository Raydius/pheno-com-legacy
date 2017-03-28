/**
 * File Input Directive
 *
 * More visually flexible file input that follows AngularJS binding conventions
 *
 * Created by Ray Dollete on 3/28/2017
 */


// main template for layout
const fileInputContainerTemplate = require('components/file-input-container.pug');

// container for all file input elements
angular.module('phenoCom').directive('fileInput', function($filter, $compile) {
	return {
		scope: {
			fileModel: '='
		},
		template: fileInputContainerTemplate,
		link: function(scope, element, attrs) {

			scope.removeFiles = function(inputfile) {
				scope.fileModel = '';
			};

			scope.updateButtonText = function() {
				if(!scope.fileModel) {
					scope.fileModel = '';
				}
				element.find('.attach-res').html(scope.fileModel.length > 0 ? 'Attached' : 'Attach Resume');
			};

		}
	}
});

// visible button to engage file input
angular.module('phenoCom').directive('fileInputButton', function($compile) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {

			var el = angular.element(element);
			var button = el.children()[0];

			// hide original anchor element
			el.css({
				position:'relative',
				overflow:'hidden',
				width: button.offsetWidth,
				height: button.offsetHeight
			});

			// create input element to instantiate fileFormInput directive
			var fileInput = angular.element('<input type="file"  />');
			fileInput.attr({
				'ng-model': attrs.fileInputButton,
				'file-form-input': '',
				'accept': 'text/plain,application/zip,application/msword,application/pdf,image/jpeg,image/png',
				'update-button': 'updateButtonText()'
			});

			// ensure clickable area has the same dimensions as pseudo button
			fileInput.css({
				position:'absolute',
				top:0,
				left:0,
				'z-index': '2',
				width:'100%',
				height:'100%',
				opacity:'0',
				cursor:'pointer'

			});

			// add new input element to DOM
			el.append($compile(fileInput)(scope));
		}
	}
});

// actual HTML form element that captures files
angular.module('phenoCom').directive('fileFormInput', function($parse, $compile) {
	return {
		require: 'ngModel',
		scope: {
			ngModel: '=',
			updateButton: '&'
		},
		restrict: 'A',
		link: function(scope, el, attrs, ngModel) {

			el.on('change', function(e) {
				let files = el[0].files;
				scope.updateButton();

				scope.$apply(function() {
					scope.ngModel = files;
					//attrs.multiple ? scope.ngModel = files : scope.ngModel = files[0];
				});
			});

			scope.$watch('ngModel', function() {
				scope.updateButton();
			});
		}
	}
});
