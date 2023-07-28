
const Like = require('../models/like.models')
const Post = require('../models/post.models')


const likeDislikePost = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({ msg: "Post not found" })
        }

        const user = req.user;
        console.log(user);


        const like = await Like.findOne({ postId: postId, likedBy: req.user._id })


        if (!like) {
            const newLike = await Like.create({
                postId: postId,
                likedBy: req.user._id
            })
            await newLike.save();
            return res.status(201).json({ msg: "Post liked", like: newLike })

        }
        else {
            await Like.findByIdAndDelete(like._id)
            return res.status(201).json({ msg: "Post disliked" })

        }

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);

    }
}

module.exports = {
    likeDislikePost
}