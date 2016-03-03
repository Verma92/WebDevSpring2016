(function(){
    angular.module("FinalProject")
        .controller("SearchControler",SearchControler);

    function SearchControler($scope, $rootScope, $location) {

        var vm=this;
        vm.details=details;
        $scope.$location = $location;


        function details(desc)
        {
           console.log(desc)
            $rootScope.description=desc;
            $location.path("/details");
        }


    }

})();




