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
       allusersnames:allusersnames,
       Create: Create,
       findUserByCredentials: findUserByCredentials,
       check:check,
       updateuserinvite:updateuserinvite,
       deleteevent:deleteevent
    };

    return api;

    function deleteevent(id,eventid){
        var deferred = q.defer();

        ProjectUserModel.findById(id,function(err,user) {
                if (err) {

                    deferred.reject(err);
                    console.log("rejected")
                }
                else {
                for (var i=0;i<user.events.length;i++){

                    if(user.events[i]._id==eventid)
                    {user.events.splice(i,1)
                        console.log("event found and deleted")
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

                    }
                }
                }
            });

        return deferred.promise;
    }
    function updateuserinvite(username,invite){

        var deferred = q.defer();
        console.log("in server Model :"+username,invite.message.text,invite.message.Date,invite.sender)

        ProjectUserModel.findOne({username: username}, function(err,user) {
            if(err) {

                deferred.reject(err);
                console.log("rejected")
            }
            else {
                console.log("invite details"+invite.sender+invite.messsage)
                console.log("found user")
                      var found=0



                console.log(user.invites.length)
                console.log(user.invites)
                for(var i=0;i<user.invites.length;i++) {
                    console.log("user sender details"+user.invites[i].sender)

                   if(user.invites[i].sender==invite.sender){
                       found=1
                       console.log("found sender")


                       user.invites[i].message.push({ text:invite.message.text,
                           Date:invite.message.Date})
                       console.log("added message"+user.invites[i] )
                       break;
                   }
                    else{
                       found=0
                   }

                }
                if(found==0){
                    console.log(" sender not found")

                    var temp=[]
                    temp.push({ text:invite.message.text,
                                Date:invite.message.Date})
                    var tempinvite={sender:invite.sender,message:temp}
                    user.invites.push(tempinvite)
                }

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

                deferred.resolve(user);

            }
            });
        return deferred.promise;
    }



    function allusersnames(){

        var deferred = q.defer();

        ProjectUserModel.find(users, function(err,users) {
            if(err) {

                deferred.reject(err);
            }
            else{
               console.log("users in model users"+users)
                var names=[]
                for(var i=0;i<users.length;i++)
                {
                    console.log("in loop"+i)
                    names.push(users[i].username)
                    console.log("in loop output"+users[i].username)

                }
                console.log("users in model names:"+names)
                deferred.resolve(names);

            }
        });
        return deferred.promise;
    }

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