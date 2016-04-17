module.exports=function(mongoose){

    var EventSchema=require("./event.schema.server.js")(mongoose);
    var ProjectUserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        events:[{type:String,details:EventSchema}]

    }, {
        collection: "Project.User",

    });

    return ProjectUserSchema;

};