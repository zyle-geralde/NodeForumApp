const express = require("express");
const router = express.Router();
const varifyJWT = require("../../controller/varifyJWT.js")
const CommentDB = require("../../model/Comments.js");
const ReplyDB = require("../../model/ReplyUser.js");

router.route("/")
    .post(varifyJWT.verifyToken,async function(req,res){
        if(!req || !req.body || !req.body.uId){
            res.status(400).json("Need uId");//Bad Request
            return;
        }

        var foundPost = await CommentDB.findOneAndDelete({uId:req.body.uId}).exec();

        var foundReplies =await ReplyDB.deleteMany({postIdref:req.body.uId}).exec();

        res.status(201).json(foundPost);
    })


module.exports = router