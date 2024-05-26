const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 25
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String, // Changed type to String
        enum: ["User", "Creater"], // Enum values
        required: true // Marking the field as required
    }
})

module.exports = mongoose.model("User", userSchema)
