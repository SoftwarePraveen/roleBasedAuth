const HandleError = require("../utils/handleError");

module.exports=(err,req,res,next)=>{
    err.message=err.message || "Internal Server Error"
    err.statusCode= err.statusCode || 500

    if (err.name === "validationError") {
        const message = `Invalid Resource ${err.path}`;
        err = new HandleError(message, 400);
    }
    if(err.code==11000){
        const message = `This ${Object.keys(err.keyValue)} is already Register`;
        err= new HandleError(message,400)
    }

    return res.status(err.statusCode).json({
        success:false,
        message:err.message,
        statusCode:err.statusCode
    })
}