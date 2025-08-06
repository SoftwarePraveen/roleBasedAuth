const mongoose=require("mongoose")

const commentSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:[true,"Post is Required"]
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"AuthorId is Required"]
    },
    comment:{
        type:String,
        required:true,
        trim:true
    },
    commentUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{
    timestamps:true
})

const comment=mongoose.model("comment",commentSchema)

module.exports=comment