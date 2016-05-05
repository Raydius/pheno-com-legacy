
var angular = require('angular');

angular.module('phenoCom').controller('phenoController', function($state, $scope, $cookies) {
    // temporary onload solution to hide unstyle content for now
    // don't forgot to remove display: none in layout.jade
    var $main = $('main');
    window.onload = function() {
        $('body').show(); 
    };

    // denote that user has been here, hold data for 15 days
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 30);
    $cookies.put('visited', 1, { 'expires': expireDate, 'path': '/' });

    // detect state and store in scope
    $scope.$state = $state;

    // use current state to determine which menu item is selected
    $scope.isSelected = function(sref) {
        var s = $state.$current.name; 
        // make work tab selected while view work detail page
        if(sref == s || sref == s.substring(0, s.indexOf('/'))) {
            return true;
        }

        return false;
    };



});


angular.module('phenoCom').controller('contactController', function($scope, $state, $http) {

    $scope.data = {
        fields: {
            resume: 'Resume',
            coverletter: 'Cover Letter'
        },
        labels: {
            resume: 'Choose a File',
            coverletter: 'Choose a File'
        },
        ga: {
            resume: 'resume',
            coverletter: 'cover_letter'
        }
    };


    $scope.setAttempted = function(element) {
        element.attempted = true;
        return;
    };

    $scope.sendData = function() {

        // fire GA event tracker
        ga('send', 'event', 'button', 'click', 'contact_submit');

        $scope.contactForm.attempted = true;

        if($scope.contactForm.$valid) {

            var message = "Incoming Application\n\n" +
                "First Name: " + $scope.data.firstName + "\n" +
                "Last Name: " + $scope.data.lastName + "\n" +
                "Email: " + $scope.data.email + "\n" +
                "Phone Number: " + $scope.data.phone + "\n\n" +
                "Portfolio URL: " + $scope.data.portfolioUrl + "\n" +
                "LinkedIn: " + $scope.data.linkedin;

            var url = '/sendMail';

            // prep data for API
            var data = ({
                'message': message,
                'type': 'Pheno VCU',
                'subject': 'Application from ' + $scope.data.firstName + ' ' + $scope.data.lastName
            });

            // create multipart/form-data format
            fd = new FormData();
            fd.append('data', JSON.stringify(data));
            fd.append('resume', $scope.resume);
            fd.append('coverletter', $scope.coverletter);

            // middleware API call
            $http({
                method: 'POST',
                url: url,
                data: fd,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity,
            }).then(function(response) {

                $state.go('thanks');

            },function(data, status, headers, config){
                errorCallback(data);
                console.log("Error------"+JSON.stringify(data)+" "+status)
            });

        }
        else {

            angular.forEach($scope.contactForm, function(value, key) {
                if (typeof value === 'object') {
                    var el = $scope.contactForm[key];
                    if(el.$invalid) {
                        el.attempted = true;
                    }
                }
            });

            $scope.contactForm.$setPristine();
            $scope.contactForm.$setUntouched();

        }

    };

});

