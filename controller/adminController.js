const model=require("../model/index.js")
const asyncHandler=require("../middleware/handleAsyncError.js")
const { successResponse } = require("../utils/response.js")
const statusCode=require("../statusCode/statusCode.js")
const message=require("../message/message.js")
const HandleError = require("../utils/handleError.js")

const getAllUser=asyncHandler(async(req,res,next)=>{
    const allUser=await model.user.find({role:"user"})
    return successResponse(res,statusCode.SUCCESS,message.USER_LIST,allUser)
})

const verifyUser=asyncHandler(async(req,res,next)=>{   
    const isVerify=await model.user.findOneAndUpdate({_id:req.params.id,isVerified:false},{isVerified:true},{new:true})
    if(isVerify){
        return successResponse(res,statusCode.SUCCESS,message.USER_VERIFIED)
    }
    return next(new HandleError(message.ALREDY_VERIFIED, statusCode.BAD_REQUEST));
})

const deletePost=asyncHandler(async(req,res,next)=>{
    const deletePost=await model.post.findByIdAndDelete(req.params.id)
    if(!deletePost){
        return next(new HandleError(message.TRY_AGAIN,statusCode.BAD_REQUEST))
    }
    return successResponse(res,statusCode.SUCCESS,message.POST_DELETED)
})

const editPost=asyncHandler(async(req,res,next)=>{
    const editPost=await model.post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    if(!editPost){
        return next(new HandleError(message.TRY_AGAIN,statusCode.BAD_REQUEST))
    }
    return successResponse(res,statusCode.SUCCESS,message.POST_UPDATED)
})

const editComment=asyncHandler(async(req,res,next)=>{
    const isCommentExist=await model.comment.findOne({postId:req.params.postId})
    if(!isCommentExist){
        return next(new HandleError(message.INVALID_POSTID,statusCode.BAD_REQUEST))
    }
    const comment=await model.comment.findOneAndUpdate({_id:req.params.commentId,postId:req.params.postId},{$set:req.body},{new:true})
    if(!comment){
        return next(new HandleError(message.ONLY_UPDATED_OWN_POST,statusCode.FORBIDEN))
    }
    return successResponse(res,statusCode.SUCCESS,message.COMMENT_UPDATED,comment)
})

const deleteComment=asyncHandler(async(req,res,next)=>{
    const isCommentExist=await model.comment.findOne({postId:req.params.postId})
    if(!isCommentExist){
        return next(new HandleError(message.INVALID_POSTID,statusCode.BAD_REQUEST))
    }
    const comment=await model.comment.findOneAndDelete({_id:req.params.commentId,postId:req.params.postId})
    if(!comment){
        return next(new HandleError(message.ONLY_DELETE_OWN_POST,statusCode.FORBIDEN))
    }
    return successResponse(res,statusCode.SUCCESS,message.COMMENT_DELETED,comment)
})


module.exports={
    getAllUser,
    verifyUser,
    deletePost,
    editPost,
    editComment,
    deleteComment
}