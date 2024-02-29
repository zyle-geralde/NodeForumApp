const express = require("express");
const router = express.Router();
const varifyJWT = require("../../controller/varifyJWT.js")
const CommentDB = require("../../model/Comments.js");


router.route("/")
    .get(varifyJWT.verifyToken,async function(req,res){
        var AllComment = await CommentDB.find();

        res.status(200).json(AllComment);

    })


module.exports = router;