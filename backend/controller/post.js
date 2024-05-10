const Post = require("../model/posts");

const createPost = async(req,res)=>{
    const post = await Post.create({...req.body});
    return res.status(200).json(post);
}

const getallPost = async(req,res)=>{
    const post = await Post.find();
    return res.status(200).json(post);
 }  
 
 const updatePost = async(req,res)=>{
     const {params:{id}} = req;
     const post= await Post.findByIdAndUpdate({_id:id},req.body);
     return res.status(200).json(post);
 
 }
 
 const deletePost = async(req,res)=>{
     const {params:{id}} = req;
     const post = await Post.findByIdAndDelete({_id:id});
     return res.status(200).send();
 }
 
 const getsinglePost = async(req,res)=>{
     const {params:{id}} = req;
     const post = await Post.findById({_id:id});
     return res.status(200).json(post);
 }

module.exports = {createPost,getallPost,updatePost,deletePost,getsinglePost};