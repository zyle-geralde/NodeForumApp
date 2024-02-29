const mongoose = require("mongoose");
require("dotenv").config()

async function connectToDB(){
    try{
        await mongoose.connect(process.env.DATABASE_URI);
    }catch(err){
        console.log(err);
    }
}


module.exports = {connectToDB}