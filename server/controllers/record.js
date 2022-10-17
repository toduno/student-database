const studentRecordModel = require('../models/record')
//const path = require('path')


const getRecord = async(req, res) => {
    try{
        const recordList = await studentRecordModel.find()
        res.status(200).json(recordList)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}

const getRecordById = async(req, res) => {
    try{
        const record = await studentRecordModel.findById(req.params.id)
        res.status(200).json(record)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}

const createRecord =  async(req, res) => {
    const socials = JSON.parse(req.body.socials)

    const newRecord = new studentRecordModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        socials,
        interest: req.body.interest,
        graduationYear: req.body.graduationYear
    })
    if(req.file) {
        newRecord.photo = req.file.filename
    }
    try{
        const saveNewRecord = await newRecord.save()
        res.status(201).json(saveNewRecord)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}

const updateRecord = async(req, res) => {
    const socials = JSON.parse(req.body.socials)
    console.log(req.body)
    try{
        const updateRecord = await studentRecordModel.findById(req.params.id)
        if(req.file) {
            updateRecord.photo = req.file.filename
        }
        updateRecord.firstName = req.body.firstName
        updateRecord.lastName = req.body.lastName
        updateRecord.email = req.body.email
        updateRecord.socials = {
                facebook: socials.facebook,
                twitter: socials.twitter,
                instagram: socials.instagram,
                linkedin: socials.linkedin
        }
        updateRecord.interest = req.body.interest
        updateRecord.graduationYear = req.body.graduationYear
        const saveUpdateRecord = await updateRecord.save()
        res.status(201).json(saveUpdateRecord)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}

const deleteRecord = async(req, res) => {
    try{
        const deleteRecord = await studentRecordModel.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteRecord)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}

module.exports = {
    getRecord,
    getRecordById,
    createRecord,
    updateRecord,
    deleteRecord
}
