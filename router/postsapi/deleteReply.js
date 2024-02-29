const express= require("express");
const router = express.Router();
const ReplyDB = require("../../model/ReplyUser.js");
const verifyJWT = require("../../controller/varifyJWT.js");

router.route("/")
    .post(verifyJWT.verifyToken,async function(req,res){
        if(!req || !req.body || !req.body.uid){
            return res.status(400).json({"Message":"replyid needed"})//Bad Request
        }

        var repId = req.body.uid;

        var delrep = await ReplyDB.findOneAndDelete({uid:repId});

        res.status(200).json(delrep);
    })

module.exports = router;