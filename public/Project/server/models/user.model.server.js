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

function check(ignore)
{
    return "sexy"
}
    function Create(user) {

        var deferred = q.defer();

        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);

        ProjectUserModel.create(user, function(err,newuser) {
            if(err) {

                deferred.reject(err);
            }
            else{

                deferred.resolve(newuser);

            }
        });
        return deferred.promise;

    }




    function findUserByUsername(username) {
        var deferred = q.defer();

        ProjectUserModel.findOne({username: username}, function(err, user) {

            if(err) {

                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        })

        return deferred.promise;
    }

    function UpdateUserEvent(id,event) {

        var deferred = q.defer();
        ProjectUserModel.findById(id, function(err, user) {

            user.events.push(event)
            user.save(function(err, user)
            {
                if(err) {
                    console.log("in error")
                    deferred.reject(err);
                }
                else{
                    console.log("after saving user"+user)
                    deferred.resolve(user);
                }
            });
        });

        return deferred.promise;


    }


    function UpdateUserInvite(uid,invite) {

      /*  for (i = 0; i < users.length; i++) {
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

        return users[i];*/
    }


    function findUserByCredentials(user) {

        var newuser=user
        var deferred = q.defer();
        ProjectUserModel.findOne({
            username: newuser.username
        }, function(err, founduser) {

            if(founduser==null) {
                deferred.reject(err);
                console.log("error")
            }
            else{
                console.log("checking")
                if (bcrypt.compareSync(newuser.password, founduser.password))
                {
                    deferred.resolve(founduser);

                }
                else
                    deferred.reject(err);
            }
        });
        return deferred.promise;
    }



    function FindAll() {
       return users
    }



    function FindById(userId) {
        var deferred = q.defer();

        ProjectUserModel.findById({
            _id: userId
        }, function(err, user) {

            if(err) {

                deferred.reject(err);
            }
            else{

                deferred.resolve(user);
            }
        });

        return deferred.promise;

    }

    function Update(id, newuser) {

        var deferred = q.defer();
        var uname = newuser.username;
        var pass = bcrypt.hashSync(newuser.password, bcrypt.genSaltSync(10), null);
        var fname = newuser.firstName;
        var lname = newuser.lastName;
        var email = newuser.email;

        ProjectUserModel.findById(id, function(err, user) {

            user.username = uname;
            console.log(uname)
            user.password = pass;
            console.log(pass)
            user.firstName = fname;
            console.log(fname)
            user.lastName = lname;
            console.log(lname)
            user.email =email;
            console.log(email)
            console.log("user in server nodel"+user)
            user.save(function(err, user)
            {
                if(err) {
                    console.log("in error")
                    deferred.reject(err);
                }
                else{
                    console.log("after saving user"+user)
                    deferred.resolve(user);
                }
            });
        });

        return deferred.promise;

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