const Router = require('express')
const router = Router()


const { createPost, getPosts, getPostById, deletePost } = require('../controllers/post.controllers')
const { verifyJWT } = require('../middleware/auth.middleware')


router.post('/createpost', verifyJWT, createPost)
router.get('/getposts', getPosts)
router.get('/getpost/:id', getPostById)
router.delete('/deletepost/:id', deletePost)



module.exports = router;