const express=require("express")
const app=express()
require("dotenv").config({path:"./.env"})
const connectDb=require("./connect/connection.js")
const userRouter = require("./Routes/userRoutes.js")
const adminRouter = require("./Routes/adminRoutes.js")
const postRouter=require("./Routes/postRoutes.js")
const error = require("./middleware/error.js")
const PORT=process.env.PORT || 4000


process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`)
    console.log(`Server is shutting down due to Un exceptional Rejection`)
    process.exit(1)
})
app.use(express.json())

app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/post",postRouter)

app.use((req,res)=>{
    return res.status(404).send("Not Found")
})
app.use(error)


connectDb().then((result) => {    
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((err) => {
    console.log('err', err)
    
});

process.on("unhandledRejection",(err)=>{
    console.log("unahndledRejection",err.message)
    process.exit(1)
})


process.on("SIGINT",()=>{
    console.log("Server is shutting down gracefully")
    process.exit(0)
})