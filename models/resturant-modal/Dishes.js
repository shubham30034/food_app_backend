const mongoose = require("mongoose");

const dishesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl :{
        type : String
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    menu : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "Menu"
    },
    toppics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TopPics"
    }],
    nonveg: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "NonVeg"
    }]
});

module.exports = mongoose.model("Dish", dishesSchema);
