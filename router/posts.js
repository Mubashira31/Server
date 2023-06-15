const express = require('express')
require("../db/conn");

const { getPosts,createPost, updatePost,deletePost,likePost } = require('../controllers/posts.js')

const router = express.Router();

router.get('/posts',getPosts)
router.post('/posts',createPost);
router.patch('/posts:id',updatePost)
router.delete('/posts:id',deletePost)
router.patch('/posts/:id/likePost',likePost)


module.exports = router