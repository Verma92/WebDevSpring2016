module.exports = function(app, model) {

    app.put("/api/events/ids",AllUserEvents);
   /* app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", get);
    app.get("/api/assignment/form", getAllForms);
    app.post("/api/assignment/user/form", addForm);
    app.delete("/api/assignment/user/:userId/form/:formId", deleteForm);
    app.delete("/api/assignment/form/:formId", deleteData);
    app.put("/api/assignment/form/:formId",updateForm);
*/
    function AllUserEvents(req, res)
    {
        var eventIds = req.body;
        console.log("recieved event IDs:"+eventIds)

        var events= model.AllUserEvents(eventIds)

        console.log("recieved events:"+events)
        res.json(events);

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
