const { Types } = require("mongoose");
const schoolApp = require("../../models/schoolApplications");
const studentApp = require("../../models/studentApplication");

module.exports = {
  applicationHandler: async (data) => {
    const bcrypt = require("bcrypt");
    const saltRounds = 10;
    try {
      const pass = await bcrypt.hash(data.password, saltRounds);

      const {
        schoolName,
        email,
        manager,
        principal,
        batches,
        students,
        advisor1,
        advisor2,
        phonenumber,
        board,
        pincode,
      } = data;
      await schoolApp
        .create({
          schoolName: schoolName,
          email: email,
          manager: manager,
          principal: principal,
          batches: batches,
          students: students,
          password: pass,
          advisor1: advisor1,
          advisor2: advisor2,
          phonenumber: phonenumber,
          board: board,
          pincode: pincode,
          isAproved: false,
          isBlocked:false,
        })
        .then((data) => {
          console.log("xxxx", data);
        });
    } catch (Err) {
      console.log("application not registered");
    }
  },
  getApplications: () => {
    return new Promise((resolve, reject) => {
      schoolApp
        .find({})
        .then((data) => {
          console.log("all apps", data);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  approveApplication: (id) => {
    return new Promise((resolve, reject) => {
      console.log("rea", id);
      let ID = Types.ObjectId(id);
      schoolApp.updateOne({ _id: ID }, { $set: {isAproved:true} }).then((data)=>{
        console.log("upda",data);
      })
      resolve();
    });
  },
  getStudentApplications: () => {
    return new Promise((resolve, reject) => {
      studentApp
        .find({})
        .then((data) => {
          console.log("all apps", data);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  approveStudentsApplication: (id) => {
    return new Promise((resolve, reject) => {
      console.log("studentsapp", id);
      let ID = Types.ObjectId(id);
      studentApp.updateOne({ _id: ID }, { $set: {isAproved:true} }).then((data)=>{
        console.log("upda",data);
      })
      resolve();
    });
 
},
getApprovedSchools:()=>{
  return new Promise ((resolve,reject)=>{
    schoolApp.find({isAproved:true}).then((data)=>{
      console.log("approves",data);
      resolve(data)
    })
  })
},
getStudentStatus:()=>{
  return new Promise((resolve,reject)=>{
    studentApp.find({isAproved:true}).then((data)=>{
      console.log(data,"stude");
      resolve(data)
    })
  })
},
blockStudent :(id)=>{
return new Promise((resolve,reject)=>{
  const ID = Types.ObjectId(id)
  console.log(ID,"ggggg");
  studentApp.updateOne({_id:ID},{$set:{isBlocked:true}}).then((data)=>{
    console.log("updated",data);
    resolve()
  })
})
},
unBlockStudent :(id)=>{
  return new Promise((resolve,reject)=>{
    const ID = Types.ObjectId(id)
    console.log(ID,"ggggg");
 
    studentApp.findOne({_id:ID},(err,doc)=>{
      if(err){
        console.log(err);
      }else{
        doc.isBlocked=!doc.isBlocked;
        doc.save((error)=>{
          if(error){
            console.log(error);
          }else{
            resolve()
          }
        })
      }
    })
    
   
  })
  },
}
