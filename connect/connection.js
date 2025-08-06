const mongoose=require("mongoose")

const connectDb=()=>{
    return mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Database connected successfully")
    }).catch((err)=>{
        console.log("Error connecting to database:", err.message)
    })
}

module.exports=connectDb