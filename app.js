var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();
const cors = require('cors')

var MultiParser = require('./multiparser');
var timeout = require('connect-timeout'); //express v4

app.use(timeout('10s'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use(express.static(path.join(__dirname, 'build')));
// Handle React routing, return all requests to React app
app.use(MultiParser());
//app.use('/api/accounts',require('./routes/auth/VerifyToken'),require('./routes/accounts'));
app.use('/api/account',cors(),require('./routes/accounts'));
app.use('/api/user',cors(),require('./routes/user'));

app.get('*', function(req, res) {
 return    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(express.json());


app.use(function(req, res, next) {
    next();
});

// error handler
app.use(function(err, req, res, next) {
    console.log(err);
});

module.exports = app;
