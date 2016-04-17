(function() {
    angular.module("FinalProject")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope, $routeParams,$location,UserService,$sce,EventService,SearchService) {
        var vm = this;
        vm.update=update
        vm.details=details
        vm.addeventorinvite=addeventorinvite;
       vm.updateevent=updateevent;
        $scope.editevent=editevent;



        function init(){
          /*  if($rootScope.user==undefined)
            {
                $location.path("/home");
            }
            else{

            }
            var eventIds=[]
            eventIds.push( $rootScope.user.interested,$rootScope.user.going,
                $rootScope.user.hosted ,$rootScope.user.tickets)
            console.log(eventIds)
            EventService.AllUserEvents(eventIds).then(function(events)
            {
               vm.userevents=events
                console.log(events)
            })*/
            vm.selection='events'
        }init();


        function addeventorinvite(obj)
        {
            console.log(obj)
            obj.type=vm.selection
            console.log(obj)
            UserService.addUserEventorinvite($rootScope.user._id,obj).then(function(user)
            {
                $rootScope.user=user;
                console.log(user)
                vm.selection='events'
                vm.object=null
                init();
            })

        }

        $scope.changeprofile= function () {
            $scope.updateprofile=1;
        };

        function update(newuser) {
            UserService.updateUser(newuser, $rootScope.user._id).then(
                function(newuser)
                {
                    console.log(newuser)
                    $rootScope.user=newuser;
                    alert("Profile Fields Updated")
                })



        }

        function details(event)
        {

            console.log(event)

            vm.newevent={"imageurl":event.imageurl,"eventid":event.eventid}

            $rootScope.event=vm.newevent


            SearchService.searchbyid(event.eventid).then(
                function (event) {
                   var desc=event.description.html
                    $rootScope.description=$sce.trustAsHtml(desc);
                    $location.path("/details");

                }
            )

        }

        function updateevent(obj,type)
        {
            UserService.updateUserEvents(type, $rootScope.user._id,obj)
            $scope.interested=null
            $scope.going=null
            $scope.hosted=null
            $scope.tickets=null

        }
        function editevent(type)
        {
            if(type=='interested')
            {
              $scope.interested=$scope.user.interested
            }

            if(type=='going')
            {
                $scope.going=$scope.user.going
            }

            if(type=='hosted')
            {
                $scope.hosted=$scope.user.hosted
            }
            if(type=='tickets')
            {
                $scope.tickets=$scope.user.tickets
            }
        }

    }
})();
