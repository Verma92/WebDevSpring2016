module.exports = function() {
console.log("module OK")

    var users=require('./user.mock.json');
    console.log(users)

   var api = {

       Delete: Delete,
       Update: Update,
       findUserByUsername: findUserByUsername,
       FindById: FindById,
       FindAll: FindAll,
       Create: Create,
       findUserByCredentials: findUserByCredentials
    };

    return api;



    function findUserByCredentials(user) {

        for (i = 0; i < users.length; i++) {
            if ((users[i].username == user.username) && (users[i].password == user.password))
            {
                v1=(users[i]);
                break;
            }
            v1=null;

        }

   return v1
    }


    function Create(user) {
        users.push(user);
        console.log(users)
        return users
    }


    function FindAll() {
       return users
    }


    function FindById(userId) {
        for (i = 0; i < users.length; i++) {
            if (users[i]._id == userId)
            {
                v1=(users[i]);
                break;
            }
            v1=undefined;
        }
        return v1
    }

    function findUserByUsername(name) {
        for (i = 0; i < users.length; i++) {
            if (users[i].username == name)
            {
                v1=(users[i]);
                break;
            }
            v1=undefined;
        }
        return v1
    }

    function Update(id, user) {
        for (i = 0; i < users.length; i++) {
            if (users[i]._id == id)
            {
                users[i].firstName=user.firstName;
                users[i].lastName=user.lastName;
                users[i].username=user.username;
                users[i].password=user.password;
                break;
            }
        }
       return users[i];
    }




    function Delete(id)
    {
        for (i = 0; i < users.length; i++)
        {
            if (users[i]._id == id)
            {
                users.splice(i,1)
            }
        }
        return users;

    }


};