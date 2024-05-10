const express = require('express');
const router = express.Router();

const {createCategory,updateCategory,addposttocat,getallCategory,getsingleCategory,deleteCategory} = require('../controller/category');

router.post('/create-category',createCategory);
router.patch('/addpost-category/:id',addposttocat);
router.get('/getall-category',getallCategory);
router.patch('/update-category/:id',updateCategory);
router.get('/getsingle-category/:id',getsingleCategory);
router.delete('/delete-category',deleteCategory);


module.exports = router;