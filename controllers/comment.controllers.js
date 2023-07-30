const Comment = require('../models/comments.models')
const Post = require('../models/post.models')
const User = require('../models/user.models')
const Like = require('../models/like.models')


const Addcomment = async (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;
    try {

        if (!comment) {
            return res.status(400).json({ msg: "Comment is required" })
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({ msg: "Post not found" })

        }

        console.log(req.user)


        const newComment = await Comment.create({
            postId: postId,
            commentedBy: {
                id: req.user._id,
                name: req.user.username,
                avatar: req.user.avatar.url

            },
            comment: comment

        })

        await post.comments.push(req.user._id);
        await post.save();
        await newComment.save();
        res.status(201).json({ msg: "Comment added", comment: newComment })




    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);

    }
}

const getCommentsBypostID = async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await Comment.find({ postId: postId });
        if (!comments) {
            return res.status(400).json({ msg: "No comments found" })
        }
        const numberOfComments = comments.length;
        res.status(200).json({ comments: comments, qty: numberOfComments })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
}


module.exports = {
    Addcomment,
    getCommentsBypostID
}