const express=require("express")
const { createPost, getAllPost, createComment } = require("../controller/postController.js")
const auth = require("../middleware/auth.js")
const userAuth = require("../middleware/userAuth.js")
const router=express.Router()

router.route("/createPost").post(auth,userAuth,createPost)
router.route("/getAllPost").get(auth,getAllPost)
router.route("/comment/:postId").post(auth,userAuth,createComment)


module.exports=router