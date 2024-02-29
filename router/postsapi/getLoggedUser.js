const express = require("express");
const router = express.Router();
const varifyJWT = require("../../controller/varifyJWT.js");
const CommentDB = require("../../model/Comments.js");
const LoggedUserDB = require("../../model/LoggedUser.js");

router.route("/")
    .get(varifyJWT.verifyToken,async function(req,res){
        const result=  await LoggedUserDB.find();

        res.status(200).json(result);
    })

module.exports = router;