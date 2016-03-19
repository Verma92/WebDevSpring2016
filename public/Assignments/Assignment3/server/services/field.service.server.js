module.exports = function(app, model) {

    app.get("/api/assignment/form/:formId/field", getAllFieldsForForm);
    app.post("/api/assignment/form/:formId/field", addFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteField);

    function getAllFieldsForForm(req, res) {
        var formId = req.params["formId"];
        var form= model.FindById(formId)
        var fields=form.fields
        res.json(fields);
    }

    function deleteField(req,res){
        var formId=req.params["formId"];
        var fieldId=req.params["fieldId"];
        var form=model.deleteField(formId,fieldId)
        var fields=form.fields
        res.json(fields);

    }

    function addFieldForForm(req,res){
        var formId=req.params["formId"];
        var field=req.body;
        var form=model.addFieldForForm(formId,field)
        var fields=form.fields
        res.json(fields);

    }


};