/*eslint no-unused-vars: "off"*/
"use strict";

var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');

var app = express();

if (process.env.START_CHAT) {
    var chatServer = require('./chat-server');
}

// if (app.get('env') === 'development') {
//     app.locals.pretty = true;
// }

app.use(cors());
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');

    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({msg: err.message});
});

module.exports = app;

if (process.env.START_CHAT) {
    module.exports.chatServer = chatServer;
}
