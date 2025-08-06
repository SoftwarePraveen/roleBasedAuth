const successResponse=(res,statusCode,message,result)=>{
    return res.status(statusCode).json({
        statusCode,
        message,
        result
    })
}


module.exports={
    successResponse,
    
}