var mongoose = require("mongoose");
//schema for a review that will go inside a hotel schema
var reviewSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    rating: {
        type : Number,
        min : 0,
        max : 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});
//rooms schema that will go inside hotel schema
var roomSchema = new mongoose.Schema({
    type: String,
    number: Number,
    description: String,
    photos: [String],
    price: Number
});
//hotel schema
var hotelSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    stars: {
        type: Number,
        min : 0,
        max : 5,
        "default" : 0
    },
    services : [String],
    description : String,
    phtotos : [String],
    currency : String,
    reviews : [reviewSchema],
    rooms : [roomSchema],
    location :{
        address : String,
        //always store (longitude, latitud) order
        coordinates :{ 
            type: [Number],
            index: '2dsphere'
        }
    }
});
//compiling the model, for the collection hotels
mongoose.model('Hotel', hotelSchema, 'hotels');