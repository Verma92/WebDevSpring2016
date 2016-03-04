
(function(){
    angular.module("FinalProject")
        .controller("HomeControler",HomeControler);

    function HomeControler($scope, $rootScope, $location,SearchService) {

        var vm=this;
        $scope.$location = $location;
        vm.details=details;


        function details(desc)
        {
            console.log(desc)
            $rootScope.description=desc;
            $location.path("/details");
        }


        function init()
        {
            var lat,long;
            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function (position) {
                   console.log(position.coords.latitude)
                    console.log(position.coords.longitude)
                    lat=position.coords.latitude
                    long=position.coords.longitude
                    $rootScope.loading=1;
                    SearchService.defaultsearch(lat,long).then(renderresults,rendererror);
                })


            }
            else {
                alert("Geolocation is not supported by this browser.");
            }
        }
        init();
        function renderresults(response)
        {
            $rootScope.loading=null;
            $rootScope.events=response.data.events;
            console.log($rootScope.events);
        }
        function rendererror()
        {
            alert("LOCATION ERROR")
        }

    }

})();




