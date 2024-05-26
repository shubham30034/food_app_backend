const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log("Db connected successfully");
    } catch (error) {
        console.log(error);
    }
};
