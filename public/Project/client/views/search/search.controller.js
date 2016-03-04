(function(){
    angular.module("FinalProject")
        .controller("SearchControler",SearchControler);

    function SearchControler($scope, $rootScope, $location,$sce) {

        var vm=this;
        vm.details=details;
        $scope.$location = $location;


        function details(desc)
        {
           console.log(desc)
            $rootScope.description=$sce.trustAsHtml(desc);
            $location.path("/details");
        }


    }

})();




