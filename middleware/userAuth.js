const message = require("../message/message")
const statusCode = require("../statusCode/statusCode")
const HandleError = require("../utils/handleError")

const userAuth=(req,res,next)=>{
    if(req.user.role!="admin" && !req?.user?.isVerified){
        return next(new HandleError(message.ONLY_VERIFIED_USER_CAN,statusCode.FORBIDEN))
    }
    next()
}

module.exports=userAuth