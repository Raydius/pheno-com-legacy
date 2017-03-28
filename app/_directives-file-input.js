/**
 * File Input Directive
 *
 * More visually flexible file input that follows AngularJS binding conventions
 *
 * Created by Ray Dollete on 3/28/2017
 */


angular.module('phenoCom').directive('fileInputContainer', function($compile) {
	return {
		restrict: 'A',
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

			// create input element
			var fileInput = angular.element('<input type="file" multiple />');
			fileInput.attr({
				'ng-model': attrs.fileInputContainer,
				'file-input': ''
			});
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

angular.module('phenoCom').directive('fileInput', function($parse) {
	return {
		require: 'ngModel',
		scope: {
			ngModel: '='
		},
		restrict: 'A',
		link: function(scope, el, attrs, ngModel) {
			var model = $parse(attrs.ngModel);
			var modelSetter = model.assign;

			el.on('change', function(e) {
				var files = el[0].files;
				scope.$apply(function() {
					attrs.multiple ? scope.ngModel = files : scope.ngMomdel = files[0];

					//modelSetter(scope, files);

					console.log('scope apply', scope.ngModel);
				});
			});

			scope.$watch('ngModel', function() {
				if(!scope.ngModel) {
					el[0].value = '';
				}
				el.parent().find('a').html(el[0].value.length > 0 ? 'Attached' : 'Attach Resume');

			});
		}
	}
});
