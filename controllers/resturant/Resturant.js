
const uploadFileToCloudinary = require("../../services/uploadToCloudinary")
const Restaurant =  require('../../models/resturant-modal/Restaurant')
const {restaurantValidation} = require("../../utils/validation/restaurantValidation")


const isFileSupported = (fileType, supportedType) => {
    return supportedType.includes(fileType);
}

exports.createRestaurant = async(req,res)=>{

    try {
        // get data from the the req ki body
         userId = req.user.id
     const {name,address,price} = req.body
     console.log("Request Body:", req.body);

   const validation = await  restaurantValidation(req.body)

   if(validation.error){
    return res.status(400).json({
        success : false,
        message : validation.error.details[0].message

    })
   }

     const file = req.files.imageFile

     console.log("image wali file",file);
     console.log(name,address,price);
    // validation on data
   if(!name || !address || !price){
    return res.status(400).json({
        success : false,
        message : "All Field are Required"
    })
   }

    //  upload to cloudinary
    

    const supportedType = ["jpg","jpeg","png"]
    const fileType = file.name.split(".")[1].toLowerCase()

    if(!isFileSupported(fileType,supportedType)){
        return res.status(400).json({
            success : false,
            message : "File type is not supported"
        })

    }


    const imageResponse = await uploadFileToCloudinary(file,"Codehelp")


    // create entry in the database
    const response = await Restaurant.create({
         name:name,
         address : address,
         price : price,
         imageUrl : imageResponse.secure_url
    })

    // return res

    return res.status(200).json({
        success : true,
        message : "Restaurant created successfuly",
        imageUrl : imageResponse.secure_url,
        data : response
        
    })


        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success : false,
            message : "unable to create resturant internal server error"
        })
        
    }
}




exports.getRestaurants = async (req, res) => {
    try {
      // Get all restaurants and populate only the "name" field of the "cuisine" reference
      const getAllRestaurant = await Restaurant.find({})
  
      // Check if any restaurants are found
      if (!getAllRestaurant || getAllRestaurant.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No restaurants found",
        });
      }
  
      // Return the restaurants with populated cuisine names
      return res.status(200).json({
        success: true,
        message: "All restaurants fetched successfully",
        data: getAllRestaurant,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  


  
exports.getRestaurantFromCusine = async(req,res)=>{
    const query = req.query.res
  
    if(!query){
        return res.status(400).json({
            success : false,
            message : "Please enter a valid data"
        })
    }


    const data = await Restaurant.find(
        { "cuisine": { $elemMatch: { $eq: query } } }
    ).populate("restaurant")

    if(!data){
        return res.status(400).json({
            success : false,
            message : "data is not found"
        })
    }

    return res.status(200).json({
        success : true,
        message : "data fetched success fully",
        data:data
    })

}




exports.deleteRes = async(req,res)=>{

    try {
        const  resId = req.query.resId
   if(!resId) return res.status(400).json({
    success : false,
    message : "Res Id does not found"
   })


   const response = await Restaurant.findByIdAndDelete({_id:resId})

   if(!response)  return res.status(400).json({
    success :false,
    message : "restaurant cannnot  be delted "
   })

   return res.status(200).json({
    success : true,
    message : "restaurant deleted successfuly"
   })

        
    } catch (error) {
        throw error
        
    }

   


     
}