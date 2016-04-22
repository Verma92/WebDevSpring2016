
(function(){
    angular.module("FinalProject")
        .controller("HomeControler",HomeControler);

    function HomeControler($scope, $rootScope, $location,SearchService,$sce,EventService) {

        var vm=this;
        $scope.$location = $location;
        vm.details=details;
        vm.eventchange=eventchange
        vm.eventincr=eventincr
        vm.eventdecr=eventdecr
        vm.checknoimage=checknoimage
        vm.searchbycat=searchbycat

        vm.getdate=getdate




        function getdate(Date)
        {


            return "BAIBAI"
        }



        function searchbycat(cat){


                $rootScope.events=null
                $location.path("/search/"+cat);


        }

        function eventincr(curr,max)
        {
            if(curr<50)
            { console.log("in eventincr"+curr+max)
            if((curr+1)>max)
            {
                vm.bottom=vm.bottom+1
            }
            $rootScope.count=curr


            $scope.event =$rootScope.events[$rootScope.count]

                vm.checknoimage($scope.event)

            }
        }
        function checknoimage(event){

            if(event.logo==null)
            {
                console.log( "NULL IMAGE")
                event.logo={}
                event.logo.url="http://www.sitra.fi/sites/default/files/styles/wide_third/public/" +
                               "default_images/event-default.jpg?itok=IPu5UrvW"
            }




        }
        function eventdecr(curr,min)
        {
            if(curr>1)
            { console.log("in eventdecr"+curr+min)
                if((curr-1)<min)
                {
                    vm.bottom=vm.bottom-1
                }
                $rootScope.count=(curr-2)


                $scope.event =$rootScope.events[$rootScope.count]
                vm.checknoimage($scope.event)
            }
        }



        function eventchange( value){
            console.log("in")
            $rootScope.count=value-1
            $scope.event =$rootScope.events[$rootScope.count]
            vm.checknoimage($scope.event)
        }

        function details(desc,event)
        {
            console.log(event)

            vm.newevent={"imageurl":event.logo.url,"eventid":event.id}
            console.log(vm.newevent.imageurl)
            $rootScope.event=vm.newevent
            console.log($rootScope.event)
            $rootScope.description=$sce.trustAsHtml(desc);
            $location.path("/details");
        }


        function init()
        {
            if($rootScope.count==null)
                $rootScope.count=0

            $rootScope.events=null
            vm.bottom=$rootScope.count+1


            EventService
                .allbroadcasts()
                .then(function(broadcasts){

                    var monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];


                  for(var i=0;i<broadcasts.length;i++){
                      var n =new Date(broadcasts[i].Date)
                      var value=monthNames[n.getMonth()]+' '+ n.getDate()+', '+n.getFullYear()+
                                ' at '+ n.getHours()+':'+n.getMinutes()
                      broadcasts[i].Date=value
                  }



                    broadcasts=broadcasts.reverse()

                    $rootScope.broadcasts=broadcasts
                    console.log($rootScope.broadcasts)
                })



             var lat,long;
            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function (position) {
                   console.log(position.coords.latitude)
                    console.log(position.coords.longitude)
                    lat=position.coords.latitude
                    long=position.coords.longitude
                    vm.lat=lat
                    vm.long=long
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

          $scope.event =events[$rootScope.count]

            vm.checknoimage($scope.event)

        }
        function rendererror()
        {
            alert("LOCATION ERROR")
        }

    }

})();




