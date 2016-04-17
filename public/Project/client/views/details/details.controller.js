
(function(){
    angular.module("FinalProject")
        .controller("DetailsControler",DetailsControler);

    function DetailsControler($scope, $rootScope, $location,UserService,EventService) {

        var vm=this;

        vm.selection=selection

      function init()
    {
        EventService.geteventstats($rootScope.event.eventid)
            .then(function(event){
                vm.eventstats=event


                if(event!=null)
                {    statsupdate(event)

                }

                console.log(event)
            })



    }init()



      function statsupdate(eventstats)
      {
        vm.likes=0
        vm.dislikes=0
        vm.going=0

          console.log(eventstats)
        for(var i=0;i<eventstats.stats.length;i++)
        {
            console.log('array traverse')

            if (eventstats.stats[i]=="going")
            {
                vm.going=vm.going+1
                console.log('going incr')
            }

            if (eventstats.stats[i]=="like")
            {     vm.likes=vm.likes+1
            console.log('like incr')
        }

            if (eventstats.stats[i]=="dislike")
            {    vm.dislikes=vm.dislikes+1
          console.log('dislike incr')
      }

        }

       console.log(vm.likes,vm.dislikes,vm.going)
      }

        function selection(type)
        {
            if( $rootScope.user!=null)
            {
                var newuser=$rootScope.user

                var exists=0
                var alreadytype=[]
                for(var i= 0;i<newuser.events.length;i++)
                {
                    if(newuser.events[i].eventid==$rootScope.event.eventid)
                    {
                        console.log("id there")
                        alreadytype.push(newuser.events[i].type)
                        exists=1
                    }
                }

                if( (exists==1)&&((type=='like')||(type=='dislike'))&&
                    ((alreadytype.indexOf('like')!=-1)||(alreadytype.indexOf('dislike')!=-1)))
                {
                    console.log("id there like/dislike")
                    alert("already liked/disliked")
                }
                else if( (exists==1)&&(type=='going')&&(alreadytype.indexOf('going')!=-1))
                {
                    console.log("id there going")
                    alert("already marked going!!")
                }
                else{
                    $rootScope.event.type=type

                    vm.event={"type":type,"details":$rootScope.event}

                    EventService.updateoraddevent($rootScope.event.eventid,type)
                        .then(function(event){
                            vm.eventstats=event
                            statsupdate(event)
                            console.log(event)
                        })

                    UserService.updateuserevent(newuser._id, $rootScope.event)
                        .then(function(changeduser)
                        {
                            console.log("user in controller:"+changeduser)
                            $rootScope.user=changeduser
                        });
                }

            }


            else
            {
                alert("first login")
                $location.path("/login");
            }
        }




    }

})();




