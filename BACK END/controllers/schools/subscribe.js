const { Types } = require("mongoose")
const courses = require("../../models/courses")

module.exports ={
    purchase:(course)=>{
        const {id,school} = course;
        console.log("reached",id);
        console.log(school);
    return new Promise((resolve,reject)=>{
        courses.updateOne({_id:id},{$push:{schools:school}}).then((data)=>{
            console.log(data,"jjjj");
            resolve()
        })
    })
        
         
    }
}