const express=require("express")
const { register, login, editPost, deletePost, editComment, deleteComment } = require("../controller/userController.js")
const auth = require("../middleware/auth")
const roleBased = require("../middleware/roleBasedAuth")
const router=express.Router()


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/post/:id").put(auth,editPost).delete(auth,deletePost)

router.route("/comment/:postId/:commentId").put(auth,editComment).delete(auth,deleteComment)


module.exports=router