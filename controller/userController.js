const model=require("../model/index.js")
const asyncHandler=require("../middleware/handleAsyncError.js")
const response=require("../utils/response.js")
const sendToken = require("../utils/sendToken.js")
const HandleError = require("../utils/handleError.js")
const message=require("../message/message.js")
const statusCode=require("../statusCode/statusCode.js")
const { default: mongoose } = require("mongoose")

const register=asyncHandler(async(req,res,next)=>{
    const user=await model.user(req.body).save()
    return sendToken(user,statusCode.CREATED,message.REGISTER,res)
})

const login=asyncHandler(async(req,res,next)=>{
    const user=await model.user.findOne({email:req.body.email})
    if(!user){
        return next(new HandleError(message.INVALID_EMAIL,statusCode.BAD_REQUEST))
    }
    const isPasswordCorrect=await user.verifyPassword(req.body.password)
    if(!isPasswordCorrect){
        return next(new HandleError(message.INVALID_PASSWORD,statusCode.BAD_REQUEST))
    }
    if(!user.isVerified){
        return next(new HandleError(message.INACTIVE,statusCode.BAD_REQUEST))
    }
    return sendToken(user,statusCode.SUCCESS,message.SUCCESS,res)
})

const editPost=asyncHandler(async(req,res,next)=>{
    const isPostEdit=await model.post.findOneAndUpdate({authorId:req?.user?._id,_id:req.params.id},{$set:req.body},{new:true})
    if(!isPostEdit){
        return next(new HandleError(message.CANNOT_EDIT_POST,statusCode.BAD_REQUEST))
    }
    return response.successResponse(res,statusCode.SUCCESS,message.POST_UPDATED,isPostEdit)
})

const deletePost=asyncHandler(async(req,res,next)=>{
    const isPostEdit=await model.post.findOneAndDelete({authorId:req?.user?._id,_id:req.params.id})
    if(!isPostEdit){
        return next(new HandleError(message.CANNOT_DELETE_POST,statusCode.BAD_REQUEST))
    }
    return response.successResponse(res,statusCode.SUCCESS,message.POST_DELETED)
})

const editComment=asyncHandler(async(req,res,next)=>{
    const isCommentExist=await model.comment.findOne({postId:req.params.postId})
    if(!isCommentExist){
        return next(new HandleError(message.INVALID_POSTID,statusCode.BAD_REQUEST))
    }
    const comment=await model.comment.findOneAndUpdate({_id:req.params.commentId,postId:req.params.postId,commentUserId:req?.user?._id},{$set:req.body},{new:true})
    if(!comment){
        return next(new HandleError(message.ONLY_UPDATED_OWN_POST,statusCode.FORBIDEN))
    }
    return response.successResponse(res,statusCode.SUCCESS,message.COMMENT_UPDATED,comment)
})

const deleteComment=asyncHandler(async(req,res,next)=>{
    const isCommentExist=await model.comment.findOne({postId:req.params.postId})
    if(!isCommentExist){
        return next(new HandleError(message.INVALID_POSTID,statusCode.BAD_REQUEST))
    }
    const comment=await model.comment.findOneAndDelete({_id:req.params.commentId,postId:req.params.postId,commentUserId:req?.user?._id})
    if(!comment){
        return next(new HandleError(message.ONLY_DELETE_OWN_POST,statusCode.FORBIDEN))
    }
    return response.successResponse(res,statusCode.SUCCESS,message.COMMENT_DELETED,comment)
})

module.exports={
    register,
    login,
    editPost,
    deletePost,
    editComment,
    deleteComment
}