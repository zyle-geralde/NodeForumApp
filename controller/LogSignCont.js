const path = require("path");


function routeLogSign(req,res){
    res.sendFile(path.join(__dirname,"..","frontEndFile","LogInSignUp.html"));
}


module.exports = {routeLogSign};