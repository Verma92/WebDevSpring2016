(function(){
    angular.module("FinalProject")
        .controller("SearchControler",SearchControler);

    function SearchControler($scope, $rootScope, $location) {
        $scope.$location = $location;


    }

})();




