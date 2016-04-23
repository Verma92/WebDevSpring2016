(function() {
    angular.module("FinalProject")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope, $routeParams,$location,UserService,$sce,EventService,SearchService) {
        var vm = this;
        vm.update=update
        vm.details=details
        vm.addeventorinvite=addeventorinvite;
       vm.updateevent=updateevent;
        vm.getuserslist=getuserslist;
        vm.sendinvite=sendinvite
        $scope.editevent=editevent;
        vm.invitesetter=invitesetter;
        vm.eventremove=eventremove

        function eventremove(event){
            console.log(event,event.eventid,event.type)
                    EventService.removestat(event.eventid,event.type).then(function(event){
                console.log(event)
            })
            UserService.deletevent($rootScope.user._id,{eventid:event._id}).then(function(user){
                $rootScope.user=user;
                console.log("Profile Fields Updated")
            })
        }

        function invitesetter(temp){
            console.log( vm.selection)
            var messages=temp
            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            for(var i=0;i<messages.length;i++){
                var n =new Date(messages[i].Date)

                if(!isNaN(n)){
                var value=monthNames[n.getMonth()]+' '+ n.getDate()+', '+n.getFullYear()+
                    ' at '+ n.getHours()+':'+n.getMinutes()
                messages[i].Date=value
                }
            }
            messages=messages.reverse()
            vm.messages=messages
            console.log(messages)

        }
        function sendinvite(obj){
            if(obj.username!=00){
              var invite={sender:$rootScope.user.username,
                          message:{ text:obj.message,
                                    Date:new Date()}  }
                console.log(invite,obj.username)

                UserService.sendinvite(obj.username,invite).then(function(user){
                    console.log(user)
                })

                vm.object=null
            }
            else{
                var message={ sender:$rootScope.user.username,
                              text:obj.message,
                              Date:new Date()}

                EventService.addbroadcast(message).then(function(broadcast){
                    console.log(broadcast)
                })
                console.log( obj.username)
                vm.object=null
            }
        }

        function init(){
            vm.selection='events'
        }init();


        function getuserslist(){
            vm.selection='newinvite'
            console.log("inside getuser controller")
            UserService.getuserslist().then(function(names){
                console.log(names)
                vm.names=names

            })


        }



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
