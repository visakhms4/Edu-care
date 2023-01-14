const schoolApp = require("../../models/schoolApplications");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    login:(data)=>{
        return new Promise((resolve,reject)=>{
            const response = {};
            const {email,password} =data;
            schoolApp.findOne({email:email}).then(async (school)=>{
                if(school) {
                    console.log("AAA",school);

                    if(school.isAproved){
                        const info = await bcrypt.compare(password,school.password);

                              console.log(password,"///////",school.password);
                              console.log(info,"info");
                              if(info){
                                  response.data = "approved";
                                   response.accessToken =await jwt.sign(
                                    { email: email,_id:school._id,schoolname:school.schoolName,isBlocked:school.isBlocked },
                                    process.env.ACCESS_TOKEN_SCECRET
                                  );
                                  console.log("token",response.accessToken);
                                 
                              }else{
                                console.log("pass doesnt match"); 
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
    authUser: (req, res, next) => {
        const token = req.headers.token;
        console.log("here",req.headers.token);
        console.log("reached", token);
        if (token) {
          jwt.verify(token, process.env.ACCESS_TOKEN_SCECRET, (err, user) => {
            if (err) {
              res.sendStatus(400);
            } else {
               console.log("check",user);
               if(user.isBlocked){
                res.sendStatus(500)
               }else{
                 req.user = user
                 next();

               }
            }
          });
        } else {
          res.sendStatus(400);
        }
      },
}
