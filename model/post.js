const mongoose=require("mongoose")

const postSchmea=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide a title"]
    },
    description:{
        type:String,
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{
    timestamps:true
})


const post=mongoose.model("post",postSchmea)

module.exports=post