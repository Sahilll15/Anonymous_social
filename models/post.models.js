const mongoose = require('mongoose');
const User = require('../models/user.models');

const postSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        index: true
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        }
    },
    likes: {
        type: Number,
        default: 0
    }



}, { timestamps: true });

postSchema.pre('save', async function (next) {
    const PostID = this._id;

    const Like = require('../models/like.models');

    try {

        const likeCount = await Like.countDocuments({ PostID });
        this.likes = likeCount;
        next();

    } catch (error) {
        console.log(error);
        next(error);
    }
})

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

