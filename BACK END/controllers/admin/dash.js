const courses = require("../../models/courses");

module.exports = {
    courseCreater:(data)=>{
        return new Promise((resolve,reject)=>{
            let {courseName,description,duration,price,discount} = data;

            courses.create({
                courseName:courseName,
                description:description,
                duration:duration,
                price:price,
                discount:discount,
                schools:[],
                playlist:[],
            }).then((data)=>{
                console.log(data);
                resolve()
            })
        })

    }
}