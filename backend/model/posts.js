const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please provide title'],
        minlength:3,
    }
    ,
    description:{
        type:String,
        required:[true,'Please provide description'],
        minlength:3,
    }
    ,
    image: {
        type:String,
        required:[true,'Please provide Image'],
    }
    
})

module.exports = mongoose.model('Post',PostSchema);