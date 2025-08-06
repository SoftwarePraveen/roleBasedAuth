const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const userSchmea=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name"]
    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide an password"],
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

userSchmea.pre("save",async function(){
    if(!this.isModified("password")) return;
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

userSchmea.methods.getToken=function(){
    return jwt.sign({id:this._id},process.env.SECRETKEY,{expiresIn:process.env.EXPIRE_IN})
}

userSchmea.methods.verifyPassword=async function(userPassword){
    return await bcrypt.compare(userPassword.toString(),this.password)
}

const user=mongoose.model("user",userSchmea)

module.exports=user