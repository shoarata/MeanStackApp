//use mongoose
var mongoose = require("mongoose");
// hotel model
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    
    // a geojson point
    var point = {
        type : "Point",
        coordinates: [lng, lat]
    };
    //options to make the query faster
    var geoOptions = {
        spherical : true,
        maxDistance : 2000,
        num : 5
    };
    Hotel
        .geoNear(point, geoOptions, function(err, hotels, stats) {
        console.log("coordinates : ", point);
        console.log("hotels : ", hotels);
        console.log("stats : ", stats);
        
        res
            .status(200)
            .json(hotels);
        
    });
    
};
// controller to get all hotels with optional offset and count
module.exports.GetAllHotels = function(req, res) 
{
    console.log("get all hotels");    
    var offset = 0;
    var count = 5;
    
    //lat and long filtering
    if(req.query && req.query.lat && req.query.lng){
        runGeoQuery(req, res);
        return;
    }
    
    //checking if request has offset and count variables
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    }
    
    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, hotels) {
        console.log(" found hotels : ", hotels.length);
        res.json(hotels);
    });
    
};

//controller to get one hotel based on its id
module.exports.GetOneHotel = function(req, res) 
{
    console.log("get one hotel");
        
    //get the hotel id from the request
    var hotelId = req.params.hotelId;
    //using the model to do our query
    Hotel
        .findById(hotelId)
        .exec(function(err, hotel) {
        if(err){
            console.log("error getting hotel " + hotelId);
            return
        }
        res
            .status(200)
            .json(hotel);
    });   
};
module.exports.addHotel = function(req, res) 
{
    console.log("add one hotel");
    var newHotel;
    
    //get connection to the dataBase
    var db = dbCon.get();
    console.log("db :",db);
    //define collection to use
    var collection = db.collection("hotels");
    
    

    //checking required fields in the data
    if(req.body && req.body.stars && req.body.name) {
        newHotel = req.body;
        //parsing the hotel stars to be Int
        newHotel.stars = parseInt(req.body.stars,10);
        //insert to db
        collection.insertOne(newHotel, function(err, response) {
           if(err){
               console.log("error inserting one hotel to the data base");
               return;
           }
            //if no error log it and send response
            console.log(response.ops);
            res
            .status(201)
            .json(response.ops);
        });
    }
    else{
        console.log("required data missing from body");
        res.status(400)
        .json({message : "missing data"});
    }
    
};