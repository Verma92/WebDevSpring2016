module.exports = function(app,mongoose,db) {

    var otherusermodel=require('./../../../Project/server/models/user.model.server.js')(mongoose,db);

    var modeluser = require("./models/user.model.js")(mongoose, db);
    require("./services/user.service.server.js")(app, modeluser,otherusermodel);

     var modelforms = require("./models/form.model.js")(mongoose, db);
    require("./services/form.service.server.js")(app, modelforms);

    require("./services/field.service.server.js")(app, modelforms);
};
