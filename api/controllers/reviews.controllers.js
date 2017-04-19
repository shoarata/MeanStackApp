var mongoose = require("mongoose");
var Hotel = mongoose.model('Hotel');


//controller to get all the reviews from one hotel
module.exports.GetAllReviews = function(req, res) {
    console.log("get one hotel");
        
    //get the hotel id from the request
    var hotelId = req.params.hotelId;
    //using the model to do our query
    Hotel
        .findById(hotelId)
        .select({
                    _id : false,
                    reviews: true
                })
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
//controller to get one review from one hotel
module.exports.GetOneReview = function(req, res) {
    //extracting hotel id and review id
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    
    console.log("get review " + reviewId + " from hotel "+ hotelId);
    
    
    Hotel
        .findById(hotelId)
        .select({
                    _id : false,
                    reviews: true
                })
        .exec(function(err, hotel) {
        if(err){
            console.log("error getting hotel " + hotelId);
            return
        }
        var review = hotel.reviews.id(reviewId);
        res
            .status(200)
            .json(review);
    });
};
