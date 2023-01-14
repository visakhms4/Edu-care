const mongoose = require('mongoose')
const courseCollection = new mongoose.Schema({
    courseName:{
        type:String
    },
    description:{
        type:String
    },
    duration:{
        type:Number
    },
    price:{
        type:Number
    },
    discount:{
        type:Number
    },
    playlist:{
        type:Array
    },
    schools:{
        type:Array
    }


})
const courses = mongoose.model("courseCollection",courseCollection);
module.exports = courses;