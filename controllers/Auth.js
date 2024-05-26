const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {userValidation} = require("../utils/validation/validation")
const {loginValidation} = require("../utils/validation/validation")
const { use } = require("../Routes/user")

require("dotenv").config()


exports.signup = async(req,res)=>{

    // fetch data from req ki body
  const {name,email,number,password,role} = req.body


 

//    validation on data use joi library 
     const values = {
        name,
        email,
        number,
        password,
        role
     }

      const validation = await userValidation(values)
    //   console.log("validation ka data",validation.error.details[0].message)

      if(validation.error){
        return res.status(400).json({
            success : false,
            message : validation.error.details[0].message
        })
      }

      


    // validation on Data User Already exits


   const already = await User.findOne({email})

   if(already){
    return res.status(400).json({
        success : false,
        message : "User already exists"
    })
   }

   // hashed password

  let hashedPassword
   try {

    hashedPassword = await bcrypt.hash(password,10)
    
   } catch (error) {
    console.log(error);
    
   }

    // create entery of user in thr databse

    const user = await User.create({
        name:name,
        email:email,
        number:number,
        password:hashedPassword,
        role:role

    })
    // send response

   return res.status(200).json({
    success : true,
    message : "User sign Up successfuly",
    user
   })

}


// Other imports and code...

exports.login = async (req, res) => {
    try {
        // Fetch data from req body
        const { email, password } = req.body;
        const values = {
            email,
            password,
        };

        const validation = await loginValidation(values);

        if (validation.error) {
            return res.status(400).json({
                success: false,
                message: validation.error.details[0].message
            });
        }

        // Find user by email
        let user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist. Please sign up first."
            });
        }

        // Compare passwords
        const passCheck = await bcrypt.compare(password, user.password);

        // Check if password matches
        if (!passCheck) {
            return res.status(400).json({
                success: false,
                message: "Password does not match."
            });
        }

        // Create JWT token with expiration time set to 2 seconds
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        };
        const token = await jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "2h"
        });

        // Omit sensitive data from user object
        user = user.toObject();
        user.password = undefined;
        user.number = undefined;
        user.token = token;

        // Set cookie
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        res.cookie("token", token, options);

        // Send response
        return res.status(200).json({
            success: true,
            message: "User logged in successfully.",
            token,
            user
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


exports.getUserDetails = async(req,res)=>{
      
    const userId = req.user.id
    console.log(userId);
    if(!userId) return res.status(400).json({
        success : false,
        message : "user ID dies not found"
    })

   const details = await User.find({_id:userId})
   if(!details) return res.status(400).json({
        success : false,
        message : "User details cannnot be fetched"
   })


   return res.status(200).json({
    success : true,
    message : "user details fetched successfully",
    details : details
   })

}






exports.updateUser = async (req, res) => {
    const userId = req.user.id;
    const { name, email, number } = req.body;
  
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const updateFields = {};
        if (name) updateFields.name = name;
     
        if (email) {
            const alreadyExist = await User.findOne({ email: email });

            if (alreadyExist) {
                return res.status(400).json({
                    success: false,
                    message: "This email is already in use."
                });
            } else {
                updateFields.email = email;
            }
        }
        
        if (number) updateFields.number = number;
  
        const user = await User.findByIdAndUpdate(userId, updateFields, { new: true });
  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        res.json({ message: 'User details updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user details', error });
    }
};
