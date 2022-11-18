const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')


//@desc Get User data
//@route GET /u
//@access Public 
const getUser = async(req, res) => {
    try{
        const userList = await User.find()
        res.status(200).json(userList)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}

//@desc Get User by id
//@route GET /u/:id
//@access Public 
const getUserById = async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}

//@desc Update User 
//@route PUT /u/update:id
//@access Public 
const updateUser = async(req, res) => {
    try{
        const updateUser = await User.findById(req.params.id)

        if(req.file) {
            updateRecord.photo = req.file.filename
        }
        updateUser.firstName = req.body.firstName
        updateUser.lastName = req.body.lastName
        updateUser.username = req.body.username
        updateUser.email = req.body.email
        updateUser.password = req.body.password

        const saveUpdateUser = await updateUser.save()
        res.status(201).json(saveUpdateUser)
    } catch(err) {
        res.status(400).send('Error: '+ err)
    }
}

//@desc Delete User 
//@route DELETE /u/:id
//@access Public 
const deleteUser = async(req, res) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.json(deleteUser)
    } catch(err) {
        res.send('Error deleting User')
    }
}


module.exports = {
    getUser,
    getUserById,
    updateUser,
    deleteUser
}