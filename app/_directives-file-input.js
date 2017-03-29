/**
 * File Input Directive
 *
 * More visually flexible file input that follows AngularJS binding conventions -- effectively we
 * maintain 2 "copies" of the element... one for the Angular scope and one for the HTML form.  This
 * is because as of 3/29/2017, "data binding and event handling via ng-model is
 * unsupported for input[file]" -- https://docs.angularjs.org/api/ng/directive/input
 *
 * The HTML form input for files has the proper security clearance to allow for file
 * uploads, whereas the Angular scope has the advantage of being customizable in appearance/behavior
 * as well as being accessed by methods within the scope.
 *
 *
 * Created by Ray Dollete on 3/28/2017
 */


// main template for layout
const fileInputContainerTemplate = require('components/file-input-container.pug');

// container for all file input elements -- creates the scope used by the uploader and provides functional methods
angular.module('phenoCom').directive('fileInput', function() {
	return {
		scope: {
			fileModel: '='
		},
		template: fileInputContainerTemplate,
		link: function(scope, element, attrs) {

			// empty FileList object
			scope.removeFiles = function(inputfile) {

				// clear the fileModel object in the scope
				scope.fileModel = '';

				// clear the file from the HTML form
				element.find('input').val(null);
			};

			// toggle button label text
			scope.updateButtonText = function() {
				if(!scope.fileModel) {
					scope.fileModel = '';
				}
				element.find('.attach-res').html(scope.fileModel.length > 0 ? 'Attached' : 'Attach Resume');
			};

			// enforce maximum filesize limit before user can submit
			scope.checkFileSize = function() {

				if(scope.fileModel) {
					if(scope.fileModel[0].size >= 10000000) {
						alert('ERROR: Maximum file size is 10MB.');
						scope.removeFiles(scope.fileModel[0]);
					}
				}

			};

		}
	}
});

// visible button to engage file input -- having this as a separate directive allows more robust manipulation of this element
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
			let fileInput = angular.element('<input type="file"  />');
			fileInput.attr({
				'ng-model': attrs.fileInputButton,
				'file-form-input': '',
				'accept': 'text/plain,application/zip,application/msword,application/pdf,image/jpeg,image/png',
				'update-button': 'updateButtonText()',
				'check-file-size': 'checkFileSize()'
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

// actual HTML form input element that captures files -- necessary since this type of element is not capable of binding with Angular scope
angular.module('phenoCom').directive('fileFormInput', function($parse, $compile) {
	return {
		require: 'ngModel',
		scope: {
			ngModel: '=',
			updateButton: '&',
			checkFileSize: '&'
		},
		restrict: 'A',
		link: function(scope, el, attrs, ngModel) {

			// detect changes to HTML form element (triggered when new/different files are queued for upload)
			el.on('change', function(e) {
				let files = el[0].files;
				scope.updateButton();

				scope.$apply(function() {
					scope.ngModel = files;
				});
			});

			// since we don't have direct binding, watch the Angular model for changes, as named by the text field 'ngModel' in this element
			scope.$watch('ngModel', function() {
				scope.updateButton();
				scope.checkFileSize();
			});
		}
	}
});
