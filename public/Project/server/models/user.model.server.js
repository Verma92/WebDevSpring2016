var q = require("q");


// Require the bcrypt package
var bcrypt = require('bcrypt-nodejs');

module.exports = function(mongoose, db) {

    var ProjectUserSchema = require("./user.schema.server.js")(mongoose);

    var ProjectUserModel = mongoose.model("ProjectUserModel", ProjectUserSchema);
    var users=require('./user.mock.json');

   var api = {

       Delete: Delete,
       Update: Update,
       UpdateUserEvent:UpdateUserEvent,
       UpdateUserInvite:UpdateUserInvite,
       findUserByUsername: findUserByUsername,
       FindById: FindById,
       FindAll: FindAll,
       Create: Create,
       findUserByCredentials: findUserByCredentials,
       check:check
    };

    return api;

function check(ign)
{
    return "sexy"
}
    function Create(user) {

        var deferred = q.defer();
        console.log("user in model"+ user)
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);

        ProjectUserModel.create(user, function(err,newuser) {
            if(err) {
                console.log("fassgaye")
                deferred.reject(err);
            }
            else{
                console.log(newuser)
                deferred.resolve(newuser);

            }
        });
        return deferred.promise;

    }




    function findUserByUsername(username) {
        var deferred = q.defer();
        console.log("by user"+username)
        ProjectUserModel.findOne({username: username}, function(err, user) {

            if(err) {
                console.log("its an error")
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        })

        return deferred.promise;
    }

    function UpdateUserEvent(uid,eventid) {


        for (i = 0; i < users.length; i++) {
            if (users[i]._id == uid)
            {
                console.log("user found for event")
                users[i].hosted.push(eventid)
                break;
            }
        }
        console.log("returning User:"+users[i])
        return users[i];
    }


    function UpdateUserInvite(uid,invite) {


        for (i = 0; i < users.length; i++) {
            if (users[i]._id == uid)
            {
                var sender=users[i].username
                console.log("sender found")
                break

            }
        }
        var newinvite =
        { "sender":sender,
          "message":invite.message};

        for (i = 0; i < users.length; i++) {
            if (users[i].firstName == invite.personname)
            {
                console.log("reciever found")
                if(users[i].invites==undefined)
                {
                    users[i].invites=[]
                    console.log("empty invites")
                }
                users[i].invites.push(newinvite)
             break
            }
        }
        console.log("returning User:"+users[i])

        return users[i];
    }


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