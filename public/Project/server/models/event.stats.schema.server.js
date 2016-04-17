module.exports=function(mongoose){

    var EventStatsSchema = mongoose.Schema({
        eventid:String,
        stats:[String]
    }, {
        collection: "Project.event.stats",

    });

    return EventStatsSchema;

};