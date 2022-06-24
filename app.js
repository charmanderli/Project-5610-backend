const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const postRoutes = require("./routes/postsRoutes");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

const cors = require("cors");
const { NOTFOUND } = require("dns");
require("dotenv").config();
app.use(cors());

// const uri = "mongodb://127.0.0.1/post_database";
// Connecting to Mongoose
const uri = process.env.DB_URL;

console.log(uri);
try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// middleware

const notFoundMiddleware = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(express.json());
app.use("/api/posts", postRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname + "/public", "index.html"))
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(process.env.PORT || 80, () => {
  console.log("app is listening on port ");
});

// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
