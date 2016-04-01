module.exports = function(app, model) {

    var user_model = model;


    app.get('/api/assignment/user',checkquery)
    app.post('/api/assignment/user',adduser)
    app.get('/api/assignment/user/:id',GetUserById)
    app.put('/api/assignment/user/:id',updateuser)
    app.delete('/api/assignment/user/:id',deleteUserById)


    function deleteUserById(req, res) {
        var userId = req.params.id;
        user_model
            .Delete(userId)
            .then(function(updateduser){
                res.json(updateduser)});
    }

    function adduser(req, res)
    {
        var user = req.body;
        user_model.Create(user)
            .then(function(users){
                res.json(users)});

    }

    function updateuser(req, res) {
        var user = req.body;
        var userId = req.params.id;
       user_model
           .Update(userId, user)
           .then(function(newuser){
               console.log(newuser)
            res.json(newuser)});

    }
    function GetUserById(req, res) {
        var userId = req.params.id;
       user_model.findById(userId)
       .then(function(user){
        res.json(user)});
    }

        function checkquery(req,res)
    {
        if (req.query.username !== undefined) {
            if (req.query.password !== undefined) {
                var credentials = {
                    username: req.query.username,
                    password: req.query.password
                };
                user_model.findUserByCredentials(credentials)
                    .then(function(user){
                        res.json(user)});
    }
            else {
       user_model.findUserByUsername(req.query.username)
           .then(function(user){
               res.json(user)});
     }
        }
        else {
            user_model.FindAll()
                .then(function(users){
                    res.json(users)});
        }

    }

};