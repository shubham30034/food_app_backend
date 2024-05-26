const mongoose = require("mongoose");

const cuisineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["indian", "italian", "thai"]
  },
  resId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant"
  }]
});

module.exports = mongoose.model("Cuisine", cuisineSchema);
