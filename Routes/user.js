const express = require("express");
const router = express.Router();

const { signup, login,getUserDetails,updateUser } = require("../controllers/Auth");
const { createRestaurant, getRestaurants ,getRestaurantFromCusine } = require("../controllers/resturant/Resturant");
const { auth, isUser, isCreater } = require("../middleware/auth");
const {createMenu,getMenuByRestaurantId} = require("../controllers/Menu")
const {createDishes} = require("../controllers/Dish")
const {searchRestaurant,searchCuisine} = require("../controllers/SearchRestaurant")
const {createCuisine,updateResInCuisine,getAllCuisine} = require("../controllers/resturant/Cuisine")




// search api

router.get("/searchRestaurant",auth,isUser,searchRestaurant)
router.get("/searchCuisine",auth,isUser,searchCuisine)

// Restaurant routes
router.post("/createRes",auth,isCreater,createRestaurant);
router.get("/getRes",auth, getRestaurants);
router.get("/queryRes/:id",auth,isUser,getRestaurantFromCusine )


// Cusine 
router.post("/createCuisine",createCuisine );
router.put("/updateCuisine",updateResInCuisine)
router.get("/getCuisine",auth,isUser,getAllCuisine)



// Menu routes
 router.post("/createMenu",createMenu)
 router.get("/getMenu/:id",auth,isUser,getMenuByRestaurantId)


//  dishes route
router.post("/createDish/:id",createDishes)


// Login and signup routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/getUser",auth,getUserDetails)
router.put("/updateUser",auth,updateUser)

module.exports = router;
