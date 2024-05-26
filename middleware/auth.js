const jwt = require("jsonwebtoken");


require("dotenv").config()


exports.auth = async (req, res, next) => {
    try {
        // Get JWT token from request header
        const token = req.headers.authorization;
        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });
        }

        // Verify JWT token
        try {
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            console.log("Payload:", payload);

            // Attach user information to request object
            req.user = payload;

            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(401).json({
                success: false,
                message: "Token verification failed"
            });
        }
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


exports.isUser = async(req,res,next)=>{

   if(req.user.role !== "User"){

       return res.status(400).json({
        success : false,
        message : "this Route can only acess by User"
       })
   }

   next()

}

exports.isCreater = async(req,res,next)=>{
    if(req.user.role !== "Creater"){
        return res.status(400).json({
            success : false,
            message : "this Route can only acess by Creater"
           })
    }
    next()

}