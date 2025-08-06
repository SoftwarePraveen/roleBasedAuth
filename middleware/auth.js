const message = require("../message/message")
const statusCode = require("../statusCode/statusCode")
const HandleError = require("../utils/handleError")
const jwt=require("jsonwebtoken")
const model=require("../model/index.js")

const auth=async(req,res,next)=>{
    const authorization=req.headers.authorization
    if(!authorization){
        return next(new HandleError(message.UNAUTHORIZED,statusCode.UNAUTHORIZED))
    }
    const token=authorization.split(" ")[1]
    const decode= await jwt.verify(token,process.env.SECRETKEY) 
    const user=await model.user.findById(decode.id)
    if(!user){
        return next(new HandleError(message.UNAUTHORIZED,statusCode.UNAUTHORIZED))
    }
    req.user=user
    next()
}



module.exports=auth