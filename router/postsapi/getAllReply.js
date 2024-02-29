const express = require("express");
const router = express.Router();
const ReplyDB = require("../../model/ReplyUser.js");
const verifyJWT = require("../../controller/varifyJWT.js")

router.route("/")
    .post(verifyJWT.verifyToken,async function(req,res){
        if(!req || !req.body || !req.body.postIdref){
            return res.status(400).json({"Message":"Post Id required"})//Bad Request
        }

        var postId = req.body.postIdref;

        var Allrep = await ReplyDB.find({postIdref:postId});

        res.status(200).json(Allrep);
    })

module.exports = router;