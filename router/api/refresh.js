const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const UserDb = require("../../model/Users.js");
const cookieParser = require("cookie-parser");


router.get("/",async function(req,res){
        var cookieVar = req.cookies;
        console.log(cookieVar);

        if(!cookieVar || !cookieVar.jwt){
            return res.sendStatus(401)//Unauthorize
            
        }

        const refreshTok = cookieVar.jwt;

        var foundUser = await UserDb.findOne({refreshToken:refreshTok}).exec();

        if(!foundUser){
            return res.sendStatus(403)//Forbidden
        }


        jwt.verify(
            refreshTok,
            process.env.REFRESH_TOKEN,
            function(err,decoded){
                if(err || decoded.username != foundUser.username){
                    return res.sendStatus(403)//Forbidden
                }

                const accessTok = jwt.sign(
                    {username:decoded.username},
                    process.env.ACCESS_TOKEN,
                    {expiresIn:"1h"}
                )

                res.json({accessTok,foundUser:decoded.username});
            }
        )
    })


module.exports = router;