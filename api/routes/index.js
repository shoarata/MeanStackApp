var express = require('express');
var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

var router = express.Router();
//all hotels routes
router
    .route('/hotels')
    .get(ctrlHotels.GetAllHotels);
//one hotel route
router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.GetOneHotel);

//add hotel route
router
    .route('/hotels/add')
    .post(ctrlHotels.addHotel);

// get all reviews from a specific hotel
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.GetAllReviews);
// get one review from a specific hotel
router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.GetOneReview);

module.exports = router;