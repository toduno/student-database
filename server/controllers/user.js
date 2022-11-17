// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const User = require('../models/user')


// const createUser =  async(req, res) => {
//     const takenUsername = await User.findOne({username: req.body.username})
//     const takenEmail = await User.findOne({email: req.body.email})

//     if (takenUsername || takenEmail) {
//         res.json({message: 'Username or email already exist!'})
//     } else {
//         req.body.password = await bcrypt.hash(req.body.password, 10)
    
//         const dbUser = new User({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password
//         })
//         if(req.file) {
//             dbUser.photo = req.file.filename
//         }
//         try{
//             const saveNewUser = await dbUser.save()
//             res.status(201).json(saveNewUser)
//         } catch(err) {
//             res.status(400).json('Error: ' + err)
//         }
//     }
// }

// const userLogin = (req, res) => {
//     User.findOne({username: req.body.username})
//     .then(dbUser => {
//         if (!dbUser) {
//             return res.json({
//                 message: 'Invalid Username or Password'
//             })
//         }
//         bcrypt.compare(req.body.password, dbUser.password)
//         .then(isCorrect => {
//             if (isCorrect) {
//                 const payload = {
//                     id: dbUser._id,
//                     username: dbUser.username
//                 }
//                 jwt.signal(
//                     payload,
//                     process.env.JWT_SECRET,
//                     {expiresIn: 86400},
//                     (err, token) => {
//                         if (err) return res.json({message: err})
//                         return res.json({
//                             message: 'Success',
//                             token: "Bearer" + token
//                         })
//                     }
//                 )
//             } else {
//                 return res.status(400).json({
//                     message: 'Invalid Username or Password'
//                 })
//             }
//         })
//     })
// }

// const verifyJWT = (req, res) => {
//     res.json({isLoggedIn: true, username: req.user.username})
// }


// module.exports = {
//     createUser,
//     userLogin,
//     verifyJWT
// }