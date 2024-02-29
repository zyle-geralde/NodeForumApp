const express = require("express")
const router = express.Router();
const path = require("path");
const controller = require("../controller/LogSignCont.js")


router.get("^/$|/LogInSignUp(.html)?",controller.routeLogSign);

router.get("^/$|/homepage(.html)?",function(req,res){
    res.sendFile(path.join(__dirname,"..","frontEndFile","homepage.html"));
});
router.get("^/$|/yourpost(.html)?",function(req,res){
    res.sendFile(path.join(__dirname,"..","frontEndFile","yourpost.html"));
});

router.all("*",function(req,res){
    res.status(404)
    if(req.accepts("html")){
        res.sendFile(path.join(__dirname,"..","frontEndFile","404.html"));
    }
    else if(req.accepts("json")){
        res.json({"Error":"404 Not Found"})
    }
    else{
        res.type('txt').send("Not Found");
    }
})

module.exports = router;