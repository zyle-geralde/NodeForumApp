const express = require("express");
const router = express.Router();
const DBSchema = require("../../model/Users.js")
const bcrypt = require("bcrypt");


router.route("/")
    .post(async function(req,res){
        var signData = {
            username:req.body.username,
            password:req.body.password
        }
        if(!signData.username || !signData.password){
            return res.sendStatus(400)
        }

        var userFound = await DBSchema.findOne({username:signData.username}).exec();
        if(userFound){
            res.status(409);
            res.json({"message":"Conflicting username"});
            return;
        }

        try{
            var hashPass = await bcrypt.hash(signData.password,10);
            signData.password = hashPass;

            var result = await DBSchema.create({
                username:signData.username,
                password:signData.password
            })

            res.status(201);
            res.json({"message":"Success"});
        }
        catch(err){
            res.status(500)
            return res.json({"message":err.message})
        }


    })

module.exports = router;