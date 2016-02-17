(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService()
    {
        var users = [
            {"_id":123, "firstName":"Alice",  "lastName":"Wonderland","username":"alice",  "password":"alice"},
            {"_id":234, "firstName":"Bob",    "lastName":"Hope",      "username":"bob",    "password":"bob"},
            {"_id":345, "firstName":"Charlie","lastName":"Brown",     "username":"charlie","password":"charlie"},
            {"_id":456, "firstName":"Dan",    "lastName":"Craig",     "username":"dan",    "password":"dan"},
            {"_id":567, "firstName":"Edward", "lastName":"Norton",    "username":"ed",     "password":"ed"}
        ];


        var service = {
            findAllUsers : findAllUsers,
            findUserById : findUserById
        };



        return service;

        function findAllUsers()
        {
            return users;
        }

        function findUserById(id)
        {
            return users[id];
        }

    }
})();


/*
findUserByUsernameAndPassword(username, password, callback)
findAllUsers(callback)
createUser(user, callback)
deleteUserById(userId, callback)
updateUser(userId, user, callback)*/
