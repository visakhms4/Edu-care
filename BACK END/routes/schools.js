var express = require('express');
const { Types } = require('mongoose');
const { applicationHandler, getApplications, approveApplication, getStudentApplications, approveStudentsApplication, getStudentStatus, blockStudent,unBlockStudent } = require('../controllers/schools/application');
const { login, authUser } = require('../controllers/schools/auth');
const schoolApp = require('../models/schoolApplications');
var router = express.Router();
var Razorpay = require('razorpay');
const { purchase } = require('../controllers/schools/subscribe');

require("dotenv").config();

var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});



var options = {
  amount: 50000,  // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11"
};


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("school");
  res.send('respond with a resource');
});
router.post('/form', (req,res)=>{
  console.log("form");
  console.log(req.body);
  applicationHandler(req.body)
  
  res.sendStatus(200);
})

router.post('/login',(req,res)=>{
  console.log("checked");
  console.log(req.body);
  login(req.body).then((response)=>{
    console.log("main",response);
    res.status(200).json(response)
  })

})
router.post('/course/subscribe',authUser, (req,res)=>{
  console.log(req.body);
  
  purchase(req.body).then(()=>{
    console.log("sub");
  })
})

router.post('/course/payments',authUser,(req,res)=>{
  instance.orders.create(options, function(err, order) {
    console.log(order);
  });
})



///// school dash

router.get('/applications',authUser, async(req,res)=>{
  console.log("entered");
  const token = req.headers.token;
  console.log("fkkk",token);
  const applications = await getStudentApplications();
  console.log("jjjj",applications);
   res.status(200).json(applications);
});

router.put('/applications/approval',authUser,(req,res)=>{
  console.log("stdnts",req.body); 
 approveStudentsApplication(req.body).then(()=>{

   res.sendStatus(200);
 })
})
router.get('/students/status',authUser,(req,res)=>{
  getStudentStatus().then((data)=>{
    res.status(200).json(data)
  })
})
router.put('/students/accesscontrol',authUser,(req,res)=>{
  console.log(req.body,"block maker");
  unBlockStudent(req.body).then(()=>{
    res.sendStatus(200)
  }) 
})


module.exports = router;
 