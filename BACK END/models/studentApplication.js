const mongoose = require("mongoose");

const studentApplication = new mongoose.Schema({

    firstName:{
        type : String
    },
    lastName:{
        type : String
    },
    email:{
        type:String,
        unique:true
    },
    phonenumber:{
        type:Number
    },
    schoolname:{
        type:String
    },
    // studentid:{
    //     type:Number
    // },
    advisor:{
        type:String
    },
    password:{
        type:String
    },
   
    std:{
        type:Number
    },
    rollnumber:{
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
const studentApp = mongoose.model("studentApplication",studentApplication);
module.exports = studentApp;