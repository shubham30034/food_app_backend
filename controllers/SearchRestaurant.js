const Restaurant = require("../models/resturant-modal/Restaurant")
const Cuisine = require("../models/resturant-modal/Cuisine")


exports.searchRestaurant = async(req,res)=>{
    try {
        // get query from the user
const {searchQuery} = req.query
console.log(searchQuery);

if(!searchQuery){
    return res.status(400).json({
        success : false,
        message : "please enter write query"
    })
}
// validate query
// create index on name field
//  aready created a mongo shell


// make search query from the db using user query
const searchResult = await Restaurant.find({$text:{$search:searchQuery}})

console.log(searchResult);
if(!searchResult){
    return res.status(400).json({
        success : false,
        message : "result does not fetched"
    })
}


// return response
return res.status(200).json({
    success : true,
    message : 'serach result founded',
    data : searchResult
})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "internal server error"
        })
        
    }


}


exports.searchCuisine = async(req,res)=>{
    try {
        const {searchQuery} = req.query
        console.log(searchQuery);
        if(!searchQuery){
            return res.status(400).json({
                success : false,
                message : "please enter write query"
            })
        }
    
       
    

const searchResult = await Cuisine.find({name:searchQuery}).populate("resId")

if(!searchResult){
    return res.status(400).json({
        success : false,
        message : "result does not fetched"
    })
}


return res.status(200).json({
    success : true,
    message : 'serach result founded',
    data : searchResult
})
    

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "internal server error"
        })
        
        
    }

}