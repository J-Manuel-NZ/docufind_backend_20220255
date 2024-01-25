var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require("./routes/auth");
// app.use("./files", express.static("files"));

const { MongoClient, ServerApiVersion } = require('mongodb');


// Enable CORS
app.use(cors());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
//setup database 
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const uri = "mongodb+srv://justinmanuelnz:qjdybk1wto6eKlDx@docufind.mpepoji.mongodb.net/NODE-API?retryWrites=true&w=majority";

async function main() {
  await mongoose.connect(uri);
}
main().catch((err) => console.log(err));

// Multer Setup
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + '-' + file.originalname)
  },
})

require("./models/document.js")
const DocumentSchema = mongoose.model("Document")
const upload = multer({ storage: storage })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
