const Category = require("../model/category");

const createCategory = async(req,res)=>{
    const category = await Category.create({...req.body});
    return res.status(200).json(category);
}

const getallCategory = async(req,res)=>{
    const categories = await Category.find();
    return res.status(200).json(categories);
 }  
 
 const updateCategory = async(req,res)=>{
     const {params:{id}} = req;
     const {title,slug,description,posts} = req.body;
     
     const category= await Category.findByIdAndUpdate({_id:id},{title,slug,description,posts},{ new: true });
     return res.status(200).json(category);
 
 }

 const addposttocat = async(req,res)=>{
    const {params:{id}} = req;
     const {postId} = req.body;
    
     const category= await Category.findByIdAndUpdate({_id:id},{$push:{ posts:postId } },{ new: true });
     return res.status(200).json(category);
 }
 
 const deleteCategory = async(req,res)=>{
     const {params:{id}} = req;
     const post = await Category.findByIdAndDelete({_id:id});
     return res.status(200).send();
 }
 
 const getsingleCategory = async(req,res)=>{
     const {params:{id}} = req;
     const category = await Category.findById({_id:id});
     return res.status(200).json(category);
 }


module.exports = {createCategory,updateCategory,addposttocat,getallCategory,getsingleCategory,deleteCategory};