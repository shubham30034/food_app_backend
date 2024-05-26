const express = require("express")
const app  = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')

require("dotenv").config()

app.use(express.json())
app.use(cors())
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

const {cloudinaryConnect} =  require("./utils/cloudinary")
cloudinaryConnect()
 


 const authRoutes = require("./Routes/user")
 

 app.use("/api/v1",authRoutes)
 


const {dbConnect} = require("./utils/dbConnect")
dbConnect()



app.listen(PORT,()=>{
    console.log(`app listen sucessfult at ${PORT}`);
})



