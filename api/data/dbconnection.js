var mongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017/meanHotels';
var _connection = null;
var open = function(){
    mongoClient.connect(dbUrl, function(err, db) {
         if(err){
             console.log("DB connection failed");
             return;
         }
        _connection = db;
        console.log("DB connection open", db);
    });
};

var get = function() {
    return _connection;
};

module.exports = {
    open: open,
    get: get
};