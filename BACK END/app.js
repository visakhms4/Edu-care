var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/students');
var schoolsRouter = require('./routes/schools');
var adminRouter = require('./routes/admin');
var cors = require('cors');
var mongoose = require('mongoose')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));

var corsOptions = {
  origin: '*',
  
 }
 app.use(cors(corsOptions ))

app.use('/', indexRouter);
app.use('/students', studentsRouter);
app.use('/schools', schoolsRouter);
app.use('/admin', adminRouter)

mongoose.connect('mongodb://localhost:27017/edu',{useNewUrlParser:true},(err)=>{
  if(err){
    console.log('db error');
  }else{
    console.log('db conected');
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
