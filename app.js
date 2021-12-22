var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var eventsRouter = require('./src/routes/events');

// add DB
const connection = mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true });
// connection.then(
//     (db) => {
//     console.log("Successfully connected to DB!");
// },
//  (err) => { console.log(err); }).catch(err=>console.log("Error in Connecting Mongodb"));

// server instance
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/event', eventsRouter);

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
  res.send('error');
});

app.listen(process.env.PORT || 8080)
module.exports = app;
