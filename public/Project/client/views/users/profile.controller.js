(function() {
    angular.module("FinalProject")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope, $routeParams,$location,UserService) {

        $scope.addevent=addevent;
        $scope.updatevent=updatevent;
        $scope.editevent=editevent;

        function init(){
            $scope.updateprofile=null;
        }init();

        $scope.changeprofile= function () {
            $scope.updateprofile=1;
        };

        $scope.update = function (newuser) {
            UserService.updateUser(newuser, $rootScope.user._id,function(cbuser)
            {
                $rootScope.user=cbuser;
                    alert("Profile Fields Updated")
                $scope.updateprofile=null;
            })


        }

        function addevent(obj,type)
        {
            UserService.addUserEvent(type, $rootScope.user._id,obj)
            $scope.interested=null
            $scope.going=null
            $scope.hosted=null
            $scope.tickets=null


        }
        function updatevent(obj,type)
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
