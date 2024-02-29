require('dotenv').config();
const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors");
const DBconnect = require("./controller/connectDB.js");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParse = require("body-parser");
const verifyCont = require("./controller/varifyJWT.js")



const PORT = process.env.PORT || 3500 

DBconnect.connectToDB();

originList = ["http://localhost:3500",'http://127.0.0.1:5500','http://localhost:3000','http://localhost:5000','https://nodeforumapp.onrender.com'];
corseOption = {
    origin:function(origin,callback){
        if(originList.includes(origin) || !origin){
            callback(null,true);
        }
        else{
            callback(new Error("Origin not allowed"))
        }
    },
    optionSuccessStatus:200,
}

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (originList.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

app.use(credentials);

app.use(cors(corseOption));

app.use(express.urlencoded({extended:false}));

//app.use(bodyParse.json());

app.use(express.json())

app.use(cookieParser());


app.use("/refreshme",require("./router/api/refresh.js"))

app.use(express.static(path.join(__dirname,"frontEndFile")))

app.use("/logout",require("./router/api/logout.js"))
app.use("/authenticate",require("./router/api/login.js"))
app.use("/register",require("./router/api/register.js"))
app.use("/clickme",require("./router/conj.js"));
app.use("/createPost",require("./router/postsapi/createPost.js"))
app.use("/getUser",require("./router/postsapi/getLoggedUser.js"))
app.use("/getAllPost",require("./router/postsapi/getAllPost.js"))
app.use("/deletePost",require("./router/postsapi/deletePost.js"))
app.use("/replyPost",require("./router/postsapi/replyPost.js"))
app.use("/getReply",require("./router/postsapi/getAllReply.js"))
app.use("/deleteReply",require("./router/postsapi/deleteReply.js"))
app.use("/getYourPost",require("./router/postsapi/getYourPost.js"));

app.use("/",require("./router/LogSign.js"))








app.use(function(err,req,res,next){
    console.log(`Error:${err.message}`);
    res.status(500).send(err.message)
})


mongoose.connection.once("open",function(){
    console.log("Connected to DB");
    app.listen(PORT,function(){
        console.log("Listening")
    })
})
