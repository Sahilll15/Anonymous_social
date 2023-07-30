const Router = require('express')
const router = Router()


const { createPost, getPosts, getPostById, deletePost, getPostByUserId } = require('../controllers/post.controllers')
const { verifyJWT } = require('../middleware/auth.middleware')


router.post('/createpost', verifyJWT, createPost)
router.get('/getposts', verifyJWT, getPosts)
router.get('/getpost/:id', verifyJWT, getPostById)
router.delete('/deletepost/:id', verifyJWT, deletePost)
router.get('/getpostsById/:userId', verifyJWT, getPostByUserId)



module.exports = router;