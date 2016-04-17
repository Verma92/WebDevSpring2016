module.exports=function(mongoose){

    var EventSchema = mongoose.Schema({
      imageurl:String,
      eventid:String,
      type: String,
      like:Number,
      dislike:Number,
      going:Number
    }, {
        collection: "Project.event",

    });

    return EventSchema;

};