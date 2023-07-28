const Router = require('express')
const router = Router()

const { Addcomment } = require('../controllers/comment.controllers')
const { verifyJWT } = require('../middleware/auth.middleware')

router.post('/addcomment/:postId', verifyJWT, Addcomment)



module.exports = router;