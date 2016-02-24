(function() {
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope,$rootScope, $routeParams,$location,UserService,FormService) {



        $scope.forms=FormService.findAllFormsForUser($rootScope.user._id)

/*
        FormService.findAllFormsForUser($rootScope.user._id,function(formsbyuser)
        {
            $scope.forms=formsbyuser
        });

        */


    }
})();
