const Cuisine = require("../../models/resturant-modal/Cuisine");
const Restaurant = require("../../models/resturant-modal/Restaurant");

exports.createCuisine = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Unable to find data"
            });
        }

        // Check if this cuisine name already exists
        const existingCuisine = await Cuisine.findOne({ name: name });
        if (existingCuisine) {
            return res.status(400).json({
                success: false,
                message: "This cuisine already exists. Please update instead of creating a new one."
            });
        }

        // Create the cuisine
        const cuisine = await Cuisine.create({
            name: name,
        });

        return res.status(200).json({
            success: true,
            message: "Cuisine created successfully",
            data: cuisine
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


exports.updateResInCuisine = async (req, res) => {
  const { name, resId } = req.body;

  if (!name || !resId) {
      return res.status(400).json({
          success: false,
          message: "Please send all data"
      });
  }

  try {
      // Check if restaurant exists in the database
      const restaurant = await Restaurant.findById(resId);
      if (!restaurant) {
          return res.status(400).json({
              success: false,
              message: "Restaurant not found"
          });
      }

      // Update the resId array in the Cuisine model
      const updatedCuisine = await Cuisine.findOneAndUpdate(
          { name: name },
          { $push: { resId: resId } },
          { new: true } // To return the updated document
      );

      return res.status(200).json({
          success: true,
          message: "Restaurant updated successfully",
          data: updatedCuisine
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success: false,
          message: "Internal server error"
      });
  }
};


exports.getAllCuisine = async (req, res) => {
  try {
      const allCuisines = await Cuisine.find({});
      return res.status(200).json({
          success: true,
          message: "All cuisines retrieved successfully",
          data: allCuisines
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success: false,
          message: "Internal server error"
      });
  }
};