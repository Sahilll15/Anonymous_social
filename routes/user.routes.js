const Router = require('express')
const router = Router()

const { registerUser, loginUser, updateavatar, userInfo, userProfile } = require('../controllers/user.controllers')
const { verifyJWT } = require('../middleware/auth.middleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/updateavatar/:userId', updateavatar)
router.get('/userinfo', verifyJWT, userInfo)
router.get('/userprofile/:userID', verifyJWT, userProfile)



module.exports = router;