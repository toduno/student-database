const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')


//@desc Register a user
//@route POST /register
//@access Public 
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
            password: req.body.password,
        })
        if(req.file) {
            dbUser.photo = req.file.filename
        }

        try{
            const saveNewUser = await dbUser.save()
            res.status(200).json({message: 'Success'})  
        } catch(err) {
            res.status(400).json('Error: ' + err)
        }
    }
}

//@desc Authenticate a user
//@route POST /login
//@access Public 
const loginUser = (req, res) => {
    if(!req.body) return res.json({message: "Server Error"})
    
    const { username, password } = req.body;

    //check if user's username exists
    User.findOne({username})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(400).json({
                message: `Invalid Username`
            })
        }

        //check if user's password exists and if so, authorize the user to have access by generating and assigning a token to it
        bcrypt.compare(password, dbUser.password)
        .then(isCorrect => {
            if (isCorrect) {
                const payload = {
                    id: dbUser._id,
                    username: dbUser.username,
                    photo: dbUser.photo
                }
                jwt.sign(
                    payload,
                    process.env.PASSPORTSECRET,
                    //'test',
                    {expiresIn: 86400},
                    (err, token) => {
                        if (err) return res.status(400).json({message: err})
                        return res.status(200).json({
                            message: 'Success',
                            token: `Bearer ${token}`  //"Bearer" + token
                        })
                    }
                )
            } else {
                return res.status(400).json({
                    message: 'Wrong Password'
                })
            }
        })
        
    })
}

//@desc Get user data
//@route GET /isUserAuth
//@access Public 
const verifyJWT = (req, res) => {
    res.json({isLoggedIn: true, username: req.user.username})
}


const getUser = async(req, res) => {
    try{
        const userList = await User.find()
        res.status(200).json(userList)
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
}

module.exports = {
    createUser,
    loginUser,
    verifyJWT,
    getUser
}
