const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const UserDB = require("../../model/Users.js");
const LoggedUserDB = require("../../model/LoggedUser.js")
const bcrypt = require("bcrypt");
require("dotenv").config();


router.route("/")
    .post(async function(req,res){
        var logData = {
            "username":req.body.username,
            "password":req.body.password
        };

        if(!req.body.username || !req.body.password){
            res.status(400).json({"message":"Required password and username"});
            return;
        }

        var foundUser = await UserDB.findOne({username:logData.username}).exec();

        if(!foundUser){
           return res.status(401).json({"message":"User not Found"})
        }

        try{

            var compPass = await bcrypt.compare(logData.password,foundUser.password);

            if(compPass){
                const accessTok = jwt.sign(
                    {"username":foundUser.username},
                    process.env.ACCESS_TOKEN,
                    {expiresIn: "1h"}
                )

                const refreshTok = jwt.sign(
                    {"username":foundUser.username},
                    process.env.REFRESH_TOKEN,
                    {expiresIn: "1d"}
                )

                foundUser.refreshToken = refreshTok;
                var result = await foundUser.save();


                res.cookie('jwt',refreshTok,{ httpOnly: true, secure: true, sameSite: 'None',maxAge: 24 * 60 * 60 * 1000});
                res.json({accessTok,foundUser:foundUser.username});
            }
            else{
                res.status(401).json({"message":"Log In Failed"});
            }
        }
        catch(err){
            res.status(500).json({"message":err.message});
        }
    })



module.exports  = router;