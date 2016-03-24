module.exports = function(app, user_model,event_model) {

    app.get('/api/project/user',checkquery)
    app.post('/api/project/user',adduser)
    app.get('/api/project/user/:id',GetUserById)
    app.put('/api/project/user/:id',updateuser)
    app.delete('/api/project/user/:id',deleteUserById)


    function updateuser(req, res) {
        var userId = req.params.id;
        var newuser=null
        if(req.body.type==undefined)
        {
            var user = req.body;
            console.log(user)
            newuser=user_model.Update(userId, user)
            console.log(newuser)
        }
        else if(req.body.type=="newevent"){
            var event = req.body;
          var eventID= event_model.Create(event);
            console.log(event)
           newuser = user_model.UpdateUserEvent(userId,eventID)
            console.log(newuser)
        }
        else if(req.body.type=="newinvite"){
            var invite = req.body;
            newuser = user_model.UpdateUserInvite(userId,invite)
            console.log(newuser)
        }
        res.json(newuser);

    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var updateduser=user_model.Delete(userId)
        res.json(updateduser);
    }


    function GetUserById(req, res) {
        var userId = req.params.id;
        var user=user_model.findById(userId)
            res.json(user);

    }

    function adduser(req, res)
     {
        var user = req.body;
       var users=user_model.Create(user);
          console.log(users)
         res.json(users);

    }

        function checkquery(req,res)
    {
        if (req.query.username !== undefined) {
            if (req.query.password !== undefined) {
                //return user which mathces username and password
                var credentials = {
                    username: req.query.username,
                    password: req.query.password
                };
                var user=user_model.findUserByCredentials(credentials);
                 res.json(user);
    }
            else {
       var users=user_model.findUserByUsername(req.query.username)
       res.json(users);
     }
        }
        else {
            var users=user_model.FindAll();
        }

    }

};