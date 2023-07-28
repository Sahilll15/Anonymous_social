const mongoose = require('mongoose')
const User = require('../models/user.models')



const postSchema = mongoose.Schema({

    content: {
        type: String,
        required: true,
        index: true
    }
    ,
    images: {
        type: [
            {
                url: String,
                localPath: String,
            }
        ],
        default: [],
    },
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