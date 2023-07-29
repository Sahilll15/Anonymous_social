const Router = require('express')
const router = Router()

const { registerUser, loginUser, updateavatar, userInfo } = require('../controllers/user.controllers')
const { verifyJWT } = require('../middleware/auth.middleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/updateavatar/:userId', updateavatar)
router.get('/userinfo', verifyJWT, userInfo)


module.exports = router;