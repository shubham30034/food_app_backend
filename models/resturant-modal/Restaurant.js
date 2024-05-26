const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl:{
     type : String
    },
    price:{
     type : Number,
     
    },
    address: {
        type: String,
        required: true,
        maxlength: 200 
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Menu"
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);


