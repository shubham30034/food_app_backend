const mongoose = require("mongoose")


const topPics = new mongoose.Schema({
name :{
    type : String,
    required : true,
    max : 50
},
price : {
    type : Number,
    min : 0
},
title : {
    type : String,
    max : 100
},
description : {
    type : String,
    max : 200
},
imgUrl : {
    type : String
}
})


module.exports = mongoose.model("TopPics",topPics)