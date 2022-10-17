const express = require('express')
const router = express.Router()

const {
    getRecord,
    getRecordById,
    createRecord,
    updateRecord,
    deleteRecord
} = require('../controllers/record')
const upload = require('../middleware/upload')

router.get('/record', getRecord)
router.get('/record/:id', getRecordById)
router.post('/record/add', upload.single('photo'), createRecord) 
router.put('/update/:id', upload.single('photo'), updateRecord)
router.delete('/:id', deleteRecord)

module.exports = router