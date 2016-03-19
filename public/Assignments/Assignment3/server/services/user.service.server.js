module.exports = function(app, model) {

    var user_model = model;

    console.log("Service OK")
    app.get('/api/assignment/user',checkquery)
    app.post('/api/assignment/user',adduser)
    app.get('/api/assignment/user/:id',GetUserById)
    app.put('/api/assignment/user/:id',updateuser)
    app.delete('/api/assignment/user/:id',deleteUserById)


    function deleteUserById(req, res) {
        var userId = req.params.id;
        var updateduser=user_model.Delete(userId)
        res.json(updateduser);
    }


    function updateuser(req, res) {
        var user = req.body;
        var userId = req.params.id;
        user.id = userId;
        var newuser=user_model.Update(userId, user)
        console.log(newuser)
        res.json(newuser);

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