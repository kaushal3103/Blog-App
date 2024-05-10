const express = require('express');
const router = express.Router();

const {createPost,getsinglePost,getallPost,updatePost,deletePost} = require('../controller/post');

router.post('/create-post',createPost);
router.get('/getallposts',getallPost);
router.patch('/update-post/:id',updatePost);
router.delete('/delete-post/:id',deletePost)
router.get('/get-post/:id',getsinglePost)


module.exports = router;