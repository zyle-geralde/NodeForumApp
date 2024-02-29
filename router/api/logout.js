const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserDB = require("../../model/Users.js");
const LoggedUserDb = require("../../model/LoggedUser.js");


router.route("/")
    .get(async function(req,res){
        var cookieVar = req.cookies;

        if(!cookieVar || !cookieVar.jwt){
            return res.sendStatus(204)//OK but no content
        }

        const refreshTok = cookieVar.jwt;
        var findUser = await UserDB.findOne({refreshToken:refreshTok}).exec();

        if(!findUser){
            res.clearCookie("jwt",{httpOnly:true});
            return res.sendStatus(204)
        }


        findUser.refreshToken = '';
        var result = await findUser.save();


        res.clearCookie("jwt",{ httpOnly: true, secure: true, sameSite: 'None'});
        res.sendStatus(204)
    })


module.exports = router;