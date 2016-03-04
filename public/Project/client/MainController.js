(function(){
    angular
        .module("FinalProject")
        .controller("MainController", MainController);

    function MainController($scope, $location,$rootScope) {
        $scope.$location = $location;

    }
})();
