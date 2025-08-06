const sendToken=(user,statusCode,message,res)=>{
    const token=user.getToken();
    return res.status(statusCode).json({
        success:true,
        statusCode,
        message,
        result:user,
        token
    })
}

module.exports=sendToken