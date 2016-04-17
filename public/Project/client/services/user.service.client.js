(function()
{
    angular
        .module("FinalProject")
        .factory("UserService", UserService);

    function UserService($q,$http) {

        var service = {
            findUserByCredentials: findUserByCredentials,
           /* findAllUsers: findAllUsers,
            getUserById: getUserById,*/
            addUser: addUser,
          /*  deleteUserById: deleteUserById,*/
            updateUser: updateUser,
            updateUserEvents:updateUserEvents,
            addUserEventorinvite:addUserEventorinvite
        };


        return service;


        function updateUser(user,id)
        {
            var deferred = $q.defer();
               console.log(user,id)
            console.log("service")
            $http.put("/api/project/user/" + id, user).success(function(response){
                deferred.resolve(response);
            });
            console.log(deferred.promise)
            return deferred.promise;

        }

        function addUserEventorinvite (UID,object)
        {
            var deferred = $q.defer();
            console.log(UID)
            console.log(object)
            $http.put("/api/project/user/"+ UID,object)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;

        }
        function findUserByCredentials(username,password)
        {
            var deferred = $q.defer();
            $http.get("/api/project/user?username=" + username + "&password=" + password)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


      /*  function findAllUsers() {
            return users;
        }

        function getUserById(ID) {
            for (i = 0; i < users.length; i++) {
                if (users[i]._id == id) {
                    v1 = (users[i]);
                    break;
                }
                v1 = undefined;

            }
            callback(v1);
        }*/

        function addUser(user) {
            /*var newuser = {
                "_id": (new Date).getTime(), "firstName": "", "lastName": "",
                "username": user.username, "password": user.password,
                "interested": null, "going": null,"hosted": null,
                "tickets": null
            };*/

            var newuser = { "username": user.username, "password": user.password,"email":user.email};


            var deferred = $q.defer();
            $http.post("/api/project/user",newuser).success(function(response){
                deferred.resolve(response);


            });
            return deferred.promise;
        }
/*

        function deleteUserById(id, callback) {
            for (i = 0; i < users.length; i++) {
                if (users[i]._id == id) {
                    users.splice(i, 1)
                }
            }
            callback(users);
        }

*/

        function updateUserEvents(type,UID,object)
        {
            for (i = 0; i < users.length; i++) {
                if (users[i]._id == UID) {

                    if(type=='interested')
                    {
                        users[i].interested= JSON.parse("[" + object + "]");
                    }

                    if(type=='going')
                    {
                        users[i].going= JSON.parse("[" + object + "]");
                    }

                    if(type=='hosted')
                    {
                        users[i].hosted= JSON.parse("[" + object + "]");
                    }
                    if(type=='tickets')
                    {
                        users[i].tickets= JSON.parse("[" + object + "]");
                    }
                    break;
                }
            }
        }




    }
})();



/*
------------------------
    function findUserByCredentials(username,password)
    {
        var deferred = $q.defer();
        $http.get("/api/assignment/user?username=" + username + "&password=" + password)
            .success(function(response){
                deferred.resolve(response);
            });
        return deferred.promise;
    }

function findAllUsers()
{
    var deferred = $q.defer();
    $http.get("/api/assignment/user").success(function(response){
        deferred.resolve(response);
    });
    return deferred.promise;
}
function getUserById(id)
{
    var deferred=$q.defer();
    $http.get("/api/assignment/user/"+id).success(function(response){
        deferred.resolve(response);
    });

    return deferred.promise;
}
function addUser(user)
{
    var newuser ={"_id":(new Date).getTime(), "firstName":"",  "lastName":"",
        "username":user.username,  "password":user.password};

    var deferred = $q.defer();
    $http.post("/api/assignment/user",newuser).success(function(response){
        deferred.resolve(response);


    });
    return deferred.promise;

 function updateUser(user,id)
 {
 var deferred = $q.defer();

 $http.put("/api/assignment/user/" + id, user).success(function(response){
 deferred.resolve(response);
 });

 return deferred.promise;

 }



 function updateUser(newuser, uid, callback) {
 for (i = 0; i < users.length; i++) {
 if (users[i]._id == uid) {
 users[i].firstName = newuser.firstName;
 users[i].lastName = newuser.lastName;
 users[i].username = newuser.username;
 users[i].password = newuser.password;
 break;
 }
 }
 callback(users[i]);

 }

 }*/

