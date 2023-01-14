const mongoose = require("mongoose");

const schoolApplication = new mongoose.Schema({

    schoolName:{
        type : String
    },
    email:{
        type:String,
        unique:true
    },
    manager:{
        type:String
    },
    principal:{
        type:String
    },
    batches:{
        type:Number
    },
    students:{
        type:Number
    },
    password:{
        type:String
    },
    advisor1:{
        type:String
    },
    advisor2:{
        type:String
    },
    phonenumber:{
        type:Number
    },
    board:{
        type:String
    },
    pincode:{
        type:Number
    },
    isAproved:{
        type:Boolean
    },
    isBlocked:{
        type:Boolean
    }
});
const schoolApp = mongoose.model("schoolApplication",schoolApplication);
module.exports = schoolApp;