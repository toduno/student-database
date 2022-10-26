const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')


const createUser =  async(req, res) => {
    const takenUsername = await User.findOne({username: req.body.username})
    const takenEmail = await User.findOne({email: req.body.email})

    if (takenUsername || takenEmail) {
        res.json({message: 'Username or email already exist!'})
    } else {
        req.body.password = await bcrypt.hash(req.body.password, 12)
    
        const dbUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        if(req.file) {
            dbUser.photo = req.file.filename
        }

        try{
            const saveNewUser = await dbUser.save()
            res.status(200).json(saveNewUser)  
        } catch(err) {
            res.status(400).json('Error: ' + err)
        }
    }
}

const userLogin = (req, res) => {
    const { username, password } = req.body;
    User.findOne({username})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(400).json({
                message: `Invalid Username or Password ${username}`
            })
        }
        bcrypt.compare(req.body.password, dbUser.password)
        .then(isCorrect => {
            if (isCorrect) {
                const payload = {
                    id: dbUser._id,
                    username: dbUser.username
                }
                jwt.sign(
                    payload,
                    // process.env.JWT_SECRET,
                    'test',
                    {expiresIn: 86400},
                    (err, token) => {
                        if (err) return res.status(400).json({message: err})
                        return res.status(200).json({
                            message: 'Success',
                            token: "Bearer" + token
                        })
                    }
                )
            }
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Something went wrong.'
            })
        })
    })
}

const verifyJWT = (req, res) => {
    res.json({isLoggedIn: true, username: req.user.username})
}


module.exports = {
    createUser,
    userLogin,
    verifyJWT
}
