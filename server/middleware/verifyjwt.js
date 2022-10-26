const jwt = require('jsonwebtoken')


const verifyjwt = (req, res, next) => {
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, 'test', (err, decoded) => {  //process.env.PASSPORTSECRET
            if (err) return res.json({
                isLoggedIn: false,
                message: "Failed To Authenticate"
            })
            req.user = {}
            req.user.id = decoded.id
            req.user.username = decoded.username
            req.user.photo = decoded.photo
            next()
        })
    } else {
        res.json({message: 'Incorrect Token Given', isLoggedIn: false})
    }
} 


module.exports = verifyjwt