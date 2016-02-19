(function() {
    angular.module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.$location = $location;

        $scope.logout = function(){
            $rootScope.user = undefined;
            $rootScope.UID = "garbage";
            $location.path("/home");
        };
    }

})();