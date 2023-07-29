const Post = require('../models/post.models')

const createPost = async (req, res) => {
    const { content, tags } = req.body;

    try {

        const author = req.user._id;
        console.log(author);

        const post = await new Post({
            content,
            author: {
                id: author,
                name: req.user.username,
                avatar: req.user.avatar.url
            }
        })
        await post.save();

        if (!post) {
            return res.status(400).json({ msg: "Post not created" })
        }

        res.status(201).json({ post: post, mssg: "new post created" })

    } catch (error) {

        res.status(500).json({ error: error.message })
        console.log(error);
    }
}

const getPosts = async (req, res) => {
    try {

        //get newer post first
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json({ posts: posts, mssg: "posts fetched succesfully" })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);

    }
}

const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id)
        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).json({ msg: "Post not found" })
        }
        res.status(200).json({ post: post, mssg: "post fetched succesfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            res.status(200).json({ mssg: 'no post with this id' });
        }

        const deletePost = await Post.findByIdAndDelete(id);

        res.status(200).json({ mssg: "post deleted succes" })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);

    }
}

module.exports = {
    createPost,
    getPosts,
    getPostById,
    deletePost
}