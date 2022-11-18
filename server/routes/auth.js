const express = require('express')
const router = express.Router()

const {
    createUser,
    loginUser,
    verifyJWT,
    getUser
} = require('../controllers/auth')
const upload = require('../middleware/upload')
const verifyjwt = require('../middleware/verifyjwt')


router.post('/register', upload.single('photo'), createUser)
router.post('/login', loginUser)
router.post('/isUserAuth', verifyjwt, verifyJWT)


module.exports = router
