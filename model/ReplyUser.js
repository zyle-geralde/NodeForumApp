const mongoose = require("mongoose");
const Schema = mongoose.Schema


const ReplySchema = new Schema({
    uid:{
        type:Number
    },
    postIdref:{
        type:Number
    },
    username:{
        type:String,
        required:true
    },
    bodyReply:{
        type:String,
        required:true
    }

})


module.exports = mongoose.model("ReplyUser",ReplySchema)