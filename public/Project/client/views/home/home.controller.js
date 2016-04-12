
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
            var events=[]
                events=response.events;
            console.log(events)
            var arr = new Array(new Array());
            console.log(arr)
            for (i = 0; i <=(events.length/6); i++)
            {
                arr[i]=[]
                for (j = 0; j <6; j++)
                {
                    if(events[(i*6)+j]!=null)
                    {
                    arr[i][j]=events[(i*6)+j]
                    }
                }
            }
            console.log(arr)
            vm.eventparts=arr
            $rootScope.events=response.events;
            var venues=[];
            for (i = 0; i < $rootScope.events.length; i++) {
                if ($rootScope.events[i].venue_id) {
                    venues.push($rootScope.events[i].venue_id)
                }

            }



        }
        function rendererror()
        {
            alert("LOCATION ERROR")
        }

    }

})();




