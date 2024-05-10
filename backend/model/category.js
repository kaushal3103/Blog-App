const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please provide title'],
        minlength:3,
    }
    ,
    slug:{
        type:String,
        required:[true,'Please provide slug'],
        minlength:3,
    }
    ,
    description:{
        type:String,
        required:[true,'Please provide description'],
        minlength:3,
    }
    
    ,
    posts: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Post' }],

})

module.exports = mongoose.model('Category',CategorySchema);