const Restaurant = require("../models/resturant-modal/Restaurant")
const Menu = require("../models/resturant-modal/Menu")
const Dish = require("../models/resturant-modal/Dishes")
const uploadFileToCloudinary = require("../services/uploadToCloudinary")



const fileCheck = (fileType,suppoetedType)=>{
    return   suppoetedType.includes(fileType)

}


exports.createDishes = async(req,res)=>{

    try {
     //   fetch data from req ki body
       const {name,price,description,menu} = req.body
       console.log(menu);

     const file = req.files.imageFile
        
    // fetch restaurant id from req params me se
         const restaurantId = req.params.id
         console.log(restaurantId);
    // validate data
      if(!name || !price || !description || !menu) {
        return res.status(400).json({
            success : false,
            message : "all field are required",
        })
      }
    // chech restaurant exists or not

    const restaurant = await Restaurant.findById(restaurantId);


        if(!restaurant){
          return res.status(400).json({
            success : false,
            message : "Unable to find restaurant"
          })
        }


    // upload image to cloudinary  skip 


    const supportedType = ["jpg","png","jpeg"]
    const fileType = file.name.split(".")[1].toLowerCase()


    const imageUpload = fileCheck(fileType,supportedType)
   

    if(!imageUpload){

      return res.status(400).json({
        success : false,
        message : "image does not in right format"
      })
    }


    const upload = await uploadFileToCloudinary(file,"CodeHelp")
       
    // create entry in data base
      const dish = await Dish.create({
        name:name,
        price : price,
        description : description,
        restaurant : restaurantId,
        imageUrl : upload.secure_url
      })


    // update the menu array with new dish
    const updatedMenu = await Menu.findOneAndUpdate(
      {_id:menu},
      {$push:{dishes:dish}},
      {new:true}
    ).populate("dishes").exec()

    if(!updatedMenu){
      return res.status(400).json({
        success : false,
        message : "menu does not updtaed"
      })
    }




    // return response
    return res.status(200).json({
      success : true,
      message : "Dish created successfuly",
      updatedMenu
    })

        
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success : false,
            message : "unable tpo create dish internal server error",
            error : error
        })
        
    }  


}