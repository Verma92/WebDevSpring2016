module.exports = function(app, model) {

    app.post('/api/project/brodcast/',addbroadcast)
    /*app.put('/api/project/event/:id',addorupdateevent)*/
    app.put("/api/project/event/:eventid", addorupdateevent)
    app.get("/api/project/event/:eventid",geteventstats)

    app.get('/api/project/brodcasts/', allbroadcasts)
   /* app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", get);
    app.get("/api/assignment/form", getAllForms);
    app.post("/api/assignment/user/form", addForm);
    app.delete("/api/assignment/user/:userId/form/:formId", deleteForm);
    app.delete("/api/assignment/form/:formId", deleteData);
    app.put("/api/assignment/form/:formId",updateForm);
*/


    function addbroadcast(req,res){

        var message=req.body
        model
            .addbroadcast(message)
            .then(function(message){
                console.log("event in server service addbroadcast:"+message)
                res.json(message)});
    }
    function allbroadcasts(req,res){

        model
            .getallbroadcasts()
            .then(function(broadcasts){
                console.log("all broadcasts:"+broadcasts)
                res.json(broadcasts)});


    }


    function geteventstats(req, res){

        var eventid = req.params.eventid;


        console.log("geteventstats:"+eventid)
        model
            .geteventstats(eventid)
            .then(function(event){
                console.log("event in server service geteventstats:"+event)
                res.json(event)});


    }
    function addorupdateevent(req, res)
    {
        var eventid = req.params.eventid;
        var type = req.body.type;

        console.log("addorupdateevent:"+eventid+type)
        model
            .addorupdateevent(eventid,type)
            .then(function(event){
                console.log("event in server service:"+event)
                res.json(event)});

    }

/*

    function addForm(req, res) {

         var form = req.body;
         var forms=model.Create(form)
         res.json(forms);


    }


    function getFormsForUser(req, res)
    {
       var id=req.params.userId

          var userId = req.params["userId"];

        var form= model.getFormByUser(userId)

         res.json(form);

    }

    function updateForm(req,res){

        var form = req.body;
        var fid = req.params.formId;

       var updated=model.Update(fid,form)

            res.json(updated);


    }

    function deleteForm(req, res) {
           var fid = req.params["formId"];
         var uid = req.params["userId"];

       var forms= model.Delete(fid, uid)

         res.json(forms);


    }



    function deleteData(req, res) {

       /!* var fid = req.params["formId"];
        model
            .del(fid)
            .then(function(form) {
                res.json(form);

            })*!/

    }



    function get(req, res) {
      /!*  var fid = req.params["formId"];
        model
            .get(fid)
            .then(function(form) {
                res.json(form);

            })*!/
    }

    function getAllForms(req, res) {
      /!*  model
            .findAllForms()
            .then(function(form) {
                res.json(form);
            })*!/

    }
*/

}
