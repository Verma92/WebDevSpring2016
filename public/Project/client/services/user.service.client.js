(function()
{
    angular
        .module("FinalProject")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {
                "_id": 123, "firstName": "max", "lastName": "max", "username": "max", "password": "max",
                "interested": [1,2,3,4,5,6,7],
                "going": [1,2,3,4,5,6,7],
                "hosted": [1,2,3,4,5,6,7],
                "tickets": [1,2,3,4,5,6,7],


            },
            {
                "_id": 523, "firstName": "jacob", "lastName": "jacob", "username": "jacob", "password": "jacob",
                "interested": [1,2,3,4,5,6,7],
                "going": [1,2,3,4,5,6,7],
                "hosted": [1,2,3,4,5,6,7],
                "tickets": [1,2,3,4,5,6,7],


            },
            {
                "_id": 623, "firstName": "don", "lastName": "don", "username": "don", "password": "don",
                "interested": [1,2,3,4,5,6,7],
                "going": [1,2,3,4,5,6,7],
                "hosted": [1,2,3,4,5,6,7],
                "tickets": [1,2,3,4,5,6,7],


            },
            {
                "_id": 723, "firstName": "don", "lastName": "don", "username": "don", "password": "don",
                "interested": [1,2,3,4,5,6,7],
                "going": [1,2,3,4,5,6,7],
                "hosted": [1,2,3,4,5,6,7],
                "tickets": [1,2,3,4,5,6,7],


            },

        ];
        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            getUserById: getUserById,
            addUser: addUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            updateUserEvents:updateUserEvents,
            addUserEvent:addUserEvent
        };


        return service;

        function findUserByCredentials(username, password, callback) {
            for (i = 0; i < users.length; i++) {
                if ((users[i].username == username) && (users[i].password == password)) {
                    v1 = (users[i]);
                    break;
                }
                v1 = undefined;

            }
            callback(v1);

        }

        function findAllUsers() {
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
        }

        function addUser(user, callback) {
            var newuser = {
                "_id": (new Date).getTime(), "firstName": "", "lastName": "",
                "username": user.username, "password": user.password,
                "interested": null, "going": null,"hosted": null,
                "tickets": null
            };
            users.push(newuser);
            callback(newuser);
        }

        function deleteUserById(id, callback) {
            for (i = 0; i < users.length; i++) {
                if (users[i]._id == id) {
                    users.splice(i, 1)
                }
            }
            callback(users);
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
        function addUserEvent (type,UID,object)
        {
            for (i = 0; i < users.length; i++) {
                if (users[i]._id == UID) {

                    if(type=='interested')
                    {
                        users[i].interested.push(object);
                    }

                    if(type=='going')
                    {
                        users[i].going.push(object);
                    }

                    if(type=='hosted')
                    {
                        users[i].hosted.push(object);
                    }
                    if(type=='tickets')
                    {
                        users[i].tickets.push(object);
                    }
                    break;
                }
            }
        }



    }
})();

