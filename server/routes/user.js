const express = require('express')
const router = express.Router()

const {
    createUser,
    userLogin,
    verifyJWT
} = require('../controllers/user')
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
router.post('/login', userLogin)
router.get('/isUserAuth', verifyjwt, verifyJWT)

module.exports = router