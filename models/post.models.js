const mongoose = require('mongoose')
const User = require('../models/user.models')



const postSchema = mongoose.Schema({

    content: {
        type: String,
        required: true,
        index: true
    }
    ,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    authorname: {
        type: String,
        // required: true

    }
},
    { timestamps: true }

)

const Post = mongoose.model("Post", postSchema);
module.exports = Post;