const express = require("express");
const router  = express.Router();
const varifyJWT = require("../controller/varifyJWT")

router.route("/")
    .post(varifyJWT.verifyToken,function(req,res){
        res.json({"message":"Hello World"});
    })


module.exports = router