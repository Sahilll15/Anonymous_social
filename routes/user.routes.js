const Router = require('express')
const router = Router()

const { registerUser, loginUser, updateavatar } = require('../controllers/user.controllers')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/updateavatar/:userId', updateavatar)

module.exports = router;