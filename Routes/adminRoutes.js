const express=require("express")
const { register, login } = require("../controller/userController")
const { getAllUser, verifyUser, deletePost, editPost, deleteComment, editComment } = require("../controller/adminController")
const auth = require("../middleware/auth")
const roleBased = require("../middleware/roleBasedAuth")
const router=express.Router()


router.route("/user").get(auth,roleBased('admin'),getAllUser)
router.route("/verification/:id").put(auth,roleBased('admin'),verifyUser)
router.route("/post/:id").delete(auth,roleBased('admin'),deletePost).put(auth,roleBased('admin'),editPost)

router.route("/comment/:postId/:commentId").delete(auth,roleBased('admin'),deleteComment).put(auth,roleBased('admin'),editComment)



module.exports=router