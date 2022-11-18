const express = require('express')
const router = express.Router()

const {
    getUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/user')
const upload = require('../middleware/upload')


router.get('/', getUser)
router.get('/:id', getUserById)
router.put('/update/:id', upload.single('photo'), updateUser)
router.delete('/:id', deleteUser)


module.exports = router