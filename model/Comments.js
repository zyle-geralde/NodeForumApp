const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    uId:{
        type:Number
    },
    username:{
        type:String,
        required:true
    },
    bodyPost:{
        type:String,
        required:true
    },
    reply:{
        RepuId:{
            type:Number,
        },
        Replyusername:{
            type:String,
        },
        bodyReply:{
            type:String,
        }
    }
})


module.exports = mongoose.model("Comments",CommentSchema);