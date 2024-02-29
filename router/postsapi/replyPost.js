const express = require("express");
const router = express.Router();
const verifyJWT = require("../../controller/varifyJWT.js")
const ReplyDB = require("../../model/ReplyUser.js")


router.route("/")
    .post(verifyJWT.verifyToken,async function(req,res){
        if(!req || !req.body || !req.body.postIdref || !req.body.username || !req.body.bodyReply){
            return res.status(400),json({"Message":"username,postId,and Replyneeded"})//Bad Request
        }

        try{
            var alldata = await ReplyDB.find();
            var idUniq;

            if(alldata.length == 0){
                idUniq = 1;
            }
            else{
                idUniq = alldata[alldata.length - 1].uid + 1
            }

            const NewReply = await ReplyDB.create({
                "uid":idUniq,
                "postIdref":req.body.postIdref,
                "username":req.body.username,
                "bodyReply":req.body.bodyReply
            })

            res.status(201).json(NewReply);
        }
        catch(err){
            console.log(err);
        }

    })

module.exports = router;