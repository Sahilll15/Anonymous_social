const Router = require('express')
const router = Router()

const { Addcomment, getCommentsBypostID } = require('../controllers/comment.controllers')
const { verifyJWT } = require('../middleware/auth.middleware')

router.post('/addcomment/:postId', verifyJWT, Addcomment)
router.get('/getcomments/:postId', verifyJWT, getCommentsBypostID)



module.exports = router;