const express = require("express");
const router = express.Router();
const PostDB = require("../../model/Comments.js");
const verifyJWT = require("../../controller/varifyJWT.js");

router.route("/")
    .post(verifyJWT.verifyToken,async function(req,res){
        if(!req || !req.body || !req.body.username){
            return res.status(400).json({"Message":"Post User needed"});//Bad Request
        }

        var postusername = req.body.username;
        var YourPost = await PostDB.find({username:postusername});

        res.status(200).json(YourPost)
    })

module.exports = router;