const jwt = require("jsonwebtoken")
require("dotenv").config()

function verifyToken(req,res,next){
    const authHead = req.headers.authorization || req.headers.Authorization;
    console.log(authHead);

    if(!authHead){
        res.sendStatus(401);
        return;
    }

    const token = authHead.split(" ")[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        function(err,decoded){
            if(err){
                res.sendStatus(403)
                return;
            }
            else{
                req.user = decoded.username;
                next();
            }
        }
    )
}

module.exports = {verifyToken};