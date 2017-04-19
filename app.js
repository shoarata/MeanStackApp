var db = require('./api/data/db.js');
var express = require("express");
var path  = require("path");
var routes = require(path.join(__dirname,"api","routes"));
var bodyParser = require('body-parser');
//initialize
var app = express();
//log all the requests
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

//use body parser for post requests
app.use(bodyParser.urlencoded({extended : false}));

// use routes from file route
app.use('/api', routes);


// use public folder as a static folder
app.use(express.static(path.join(__dirname,'public')));

//setting app port
app.set('port',3000)


//listen for requests in port 3000
var server = app.listen(app.get('port'), function() {
    var port  = server.address().port;
    console.log("magic happening in port " + port);
});


