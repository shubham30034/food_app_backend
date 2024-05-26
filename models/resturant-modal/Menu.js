const { default: mongoose } = require("mongoose");

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    restaurant : {
     type : mongoose.Schema.ObjectId,
     ref : "Restaurant",
     required : true,
    },
    imageUrl:{
     type : [String] // Array of strings for multiple image URLs
    },
    
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }],
   
});

module.exports = mongoose.model("Menu",menuSchema)
