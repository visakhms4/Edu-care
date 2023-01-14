var express = require('express');
const { courseCreater } = require('../controllers/admin/dash');
const { getApplications,approveApplication, getApprovedSchools } = require('../controllers/schools/application');
const { authUser } = require('../controllers/schools/auth');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/applications', async(req,res)=>{
  console.log("entered");
   
  const applications = await getApplications();
  console.log("jjjj",applications);
   res.status(200).json(applications);
});
router.put('/applications/approval', (req,res)=>{

  console.log("sdsds",req.body);
 approveApplication(req.body).then(()=>{

   res.sendStatus(200);
 })
})
router.get('/schools/status',(req,res)=>{
getApprovedSchools().then((data)=>{
  console.log("main",data);
  res.status(200).json(data);


})
})


router.post('/course/create',(req,res)=>{
  console.log("heee",req.body);
   courseCreater(req.body).then(()=>{
    console.log("course created");
  })
})

module.exports = router;
