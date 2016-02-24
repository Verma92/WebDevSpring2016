(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope,$routeParams, FormService,UserService) {
        $scope.forms=function(){
            FormService.findAllFormsForUser

            $rootScope.UID

        }






















    }
})();