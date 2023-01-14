var express = require('express');
const { authUser } = require('../controllers/schools/auth');
const { studentApplicationHandler } = require('../controllers/students/application');
const { signin } = require('../controllers/students/auth');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("home students");
});
router.get('/check',authUser,(req,reas)=>{
  console.log("tested ok");
})
router.post('/form',(req,res)=>{
console.log("studentss",req.body);
studentApplicationHandler(req.body);
res.sendStatus(200);
})

router.post('/login',(req,res)=>{
  console.log("checked student");
  console.log(req.body);
  signin(req.body).then((response)=>{
    console.log("main",response);
    res.status(200).json(response)
  })

})
module.exports = router;
