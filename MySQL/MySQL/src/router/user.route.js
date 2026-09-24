const express=require('express')
const userController = require('../controller/user.controller')
const router=express.Router()


router.post('/create/user',userController.CreateUser)
router.get('/user',userController.getUser)

//post
router.post('/create/post',userController.CreatePost)

//get user their post
router.get('/user/post',userController.getUserwuthPost)
router.get('/user/post/:id',userController.getUserwithPostbyId)

//get post with user
router.get('/post/user',userController.getPostwithUser)


//comment
router.post('/posts/:postId/comment',userController.createComment)
router.get('/posts/:postId/comments',userController.getCommentsByPost)

module.exports=router