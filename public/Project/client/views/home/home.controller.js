
(function(){
    angular.module("FinalProject")
        .controller("HomeControler",HomeControler);

    function HomeControler($scope, $rootScope, $location,SearchService,$sce) {

        var vm=this;
        $scope.$location = $location;
        vm.details=details;


        function details(desc)
        {
            console.log(desc)
            $rootScope.description=$sce.trustAsHtml(desc);
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
            console.log(response);
            $rootScope.loading=null;
            $rootScope.events=response.events;
            var venues=[];
            for (i = 0; i < $rootScope.events.length; i++) {
                if ($rootScope.events[i].venue_id) {
                    venues.push($rootScope.events[i].venue_id)
                }

            }
            console.log(venues);
            console.log($rootScope.events);
        }
        function rendererror()
        {
            alert("LOCATION ERROR")
        }

    }

})();




