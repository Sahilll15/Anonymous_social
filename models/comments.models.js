
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = require('./post.models')
const User = require('./user.models')



const CommentSchema = new Schema(
    {
        postId: {
            type: mongoose.Types.ObjectId,
            ref: "Post",
            default: null,
        },
        comment: {
            type: String,
            required: true,
            index: true
        },
        commentedBy: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
        },

    },
    { timestamps: true }
);


const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
