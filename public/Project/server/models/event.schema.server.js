module.exports=function(mongoose){

    var EventSchema = mongoose.Schema({
      imageurl:String,
      eventid:String
    }, {
        collection: "Project.User",

    });

    return EventSchema;

};