const studentApp = require("../../models/studentApplication");

module.exports = {
    studentApplicationHandler: async (data) => {
      console.log("enterd");
        const bcrypt = require("bcrypt");
        const saltRounds = 10;
        try {
          const pass = await bcrypt.hash(data.password, saltRounds);
          console.log("ppp",pass);
    
          const {
            firstName,
            lastName,
            email,
            phonenumber,
            schoolname,
            advisor,
            std,
            rollnumber,
            board,
            pincode,
          } = data;
          await studentApp
            .create({
              firstName:firstName,
              lastName: lastName,
              email: email,
              phonenumber: phonenumber,
              schoolname: schoolname,
              advisor: advisor,
              std: std,
              rollnumber: rollnumber,
              
              password: pass,
              board: board,
              pincode: pincode,
              isAproved: false,
              isBlocked:false
            })
            .then((data) => {
              console.log("xstdnts", data);
            });
        } catch (Err) {
          console.log("application not registered",Err);
        }
      },
}