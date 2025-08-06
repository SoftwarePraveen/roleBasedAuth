const message = require("../message/message")
const model=require("../model/index.js")
const statusCode = require("../statusCode/statusCode")
const response=require("../utils/response.js")
const asyncHandler=require("../middleware/handleAsyncError.js")
const HandleError = require("../utils/handleError.js")
 

const createPost=asyncHandler(async(req,res,next)=>{
    req.body.authorId=req?.user?._id
    const post=await model.post(req.body).save()
    return response.successResponse(res,statusCode.SUCCESS,message.POST_CREATED,post)
})

const getAllPost=asyncHandler(async(req,res,next)=>{
    if(req?.user?.role!="admin" && !req.user.isVerified){
        return next(new HandleError(message.NOT_ALLOWED_TO_UNVERIFIED,statusCode.FORBIDEN))
    }
    const post=await model.post.find({})
    return response.successResponse(res,statusCode.SUCCESS,message.ALL_POST,post)
})

const createComment=asyncHandler(async(req,res,next)=>{
    req.body.postId=req.params.postId
    const post=await model.post.findById(req.params.postId)
    req.body.authorId=post.authorId
    req.body.commentUserId=req?.user?._id
    const comment=await model.comment(req.body).save()
    return response.successResponse(res,statusCode.CREATED,message.COMMENT_CREATED,comment)
})



module.exports={
    createPost,
    getAllPost,
    createComment,
}