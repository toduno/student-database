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

// const {
//     getUser,
//     getUserById,
//     createUser,
//     updateUser,
//     deleteUser
// }

// router.get('/record', getRecord)
// router.get('/record/:id', getRecordById)
// router.post('/record/add', upload.single('photo'), createRecord) 
// router.put('/update/:id', upload.single('photo'), updateRecord)
// router.delete('/:id', deleteRecord)


router.post('/register', upload.single('photo'), createUser)
router.post('/login', loginUser)
router.post('/isUserAuth', verifyjwt, verifyJWT)
router.get('/register', getUser)
module.exports = router
