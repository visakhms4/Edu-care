var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("hellloo mak");
  // console.log(req.body);
  res.sendStatus(201);
}); 

module.exports = router; 
