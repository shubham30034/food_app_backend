const Menu = require("../models/resturant-modal/Menu")
const Restaurant = require("../models/resturant-modal/Restaurant")
const uploadFileToCloudinary = require("../services/uploadToCloudinary")


  
const isFileSupported = (fileType, supportedType) => {
    return supportedType.includes(fileType);
}


exports.createMenu = async (req, res) => {
    try {
        // Fetch data from req.body
        const { name, restaurant } = req.body;
        const file = req.files.imageFile

        // Validate data
        if (!name || !restaurant) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

    //   validate Restaurant
    const findRestaurant = await Restaurant.findById(restaurant)

    if(!findRestaurant){
        return res.status(400).json({
            success : false,
            message : "restaurant does not find"
        })
    }
    // upload to cloudinary
    const supportedType = ["jpg","jpeg","png"]
    const fileType = file.name.split(".")[1].toLowerCase()

    if(!isFileSupported(fileType,supportedType)){
        return res.status(400).json({
            success : false,
            message : "File type is not supported"
        })

    }

    
        const imageResponse = await uploadFileToCloudinary(file,"Codehelp")
    
       
    


        // Create entry in the database
        const menu = await Menu.create({
            name: name,
            imageUrl: imageResponse.secure_url,
            restaurant: restaurant
        });

        // add menu in the restaurant

      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        restaurant,
        {menu:menu._id},
        {new:true}
      )



        // Return success response
        return res.status(200).json({
            success: true,
            message: "Menu created successfully",
            restaurant : updatedRestaurant
        });
    } catch (error) {
        // Return error response if there's an exception
        console.error("Error creating menu:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the menu"
        });
    }
};




exports.getMenuByRestaurantId = async (req, res) => {
    try {
        // get restaurant id from request body
        const restaurantId = req.params.id

        // verify if restaurant exists or not 
        const verifyRestaurant = await Restaurant.findById(restaurantId);

        if (!verifyRestaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant not found with this ID"
            });
        }

        // find menus associated with the restaurant ID
        const menu = await Menu.find({ restaurant: restaurantId }).populate("dishes").populate("restaurant").exec()

        // send data in response
        return res.status(200).json({
            success: true,
            message: "Menus fetched successfully",
            data: menu
        });
    } catch (error) {
        // Return error response if there's an exception
        console.error("Error fetching menu:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the menu"
        });
    }
};
