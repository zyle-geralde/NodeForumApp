const express = require("express");
const router = express.Router();
const varifyJWT = require("../../controller/varifyJWT.js")
const CommentDB = require("../../model/Comments.js");


router.route("/")
    .post(varifyJWT.verifyToken,async function(req,res){
        if(!req || !req.body || !req.body.username || !req.body.bodyPost){
            return res.status(400).json({"message":"Username and bodyPost Required"});
        }

        try{
            var alldata = await CommentDB.find();
            var idUniq;

            if(alldata.length == 0){
                idUniq = 1;
            }
            else{
                idUniq = alldata[alldata.length - 1].uId + 1
            }
            const NewPost = await CommentDB.create({
                "uId":idUniq,
                "username":req.body.username,
                "bodyPost":req.body.bodyPost,
                "reply":{}
            })

            res.status(201).json(NewPost);
        }
        catch(err){
            console.log(err);
        }

    })


module.exports = router;