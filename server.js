const signale = require('signale')
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/config.js');

//importing router
const defaultRouter = require('./app/routes/default-router.js');

//initialising express
const app = express();

//database Connection
mongoose.connect(config.mongodb.dbURI)
.then(()=>{
  signale.success('*****Database Connection Successfull******');
}).catch(err=>{
  signale.fatal(new Error(err));
  signale.warn('Could not connect to Database. Exiting now...');
  process.exit();
})
let db = mongoose.connection

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Home Route
app.get('/',(req,res)=>{
  res.render('users/user')
})

app.use('/default', defaultRouter);

app.listen(3000,()=> {
  signale.success('Server Started on port: 3000');
})
