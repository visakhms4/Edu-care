const studentApp = require("../../models/studentApplication");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports={
    signin:(data)=>{
        return new Promise((resolve,reject)=>{
            const response = {};
            const {email,password} =data;
            studentApp.findOne({email:email}).then(async (student)=>{
                if(student) {
                    console.log("AAA",student);

                    if(student.isAproved){
                        
                        const info = await bcrypt.compare(password,student.password);

                              console.log(password,"///////",student.password);
                              console.log(info,"info");
                              if(info){
                                  response.data = "approved";
                                   response.accessToken =await jwt.sign(
                                    { email: email,_id:student._id,schoolname:student.schoolname,isBlocked:student.isBlocked },
                                    process.env.ACCESS_TOKEN_SCECRET
                                  );
                                  console.log("token",response);
                                 
                              }else{
                                console.log("pass doesnt match"); 
                                console.log("token",response);
                                response.data = "invalidpassword"
                              }
                          


                    }else{
                        response.data = "pending"
                    }
                }else{
                    response.data = "not registered"
                }
                console.log("fk",response.accessToken);
                resolve(response)
            })
        })
    },
}