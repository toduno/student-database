const jwt = require('jsonwebtoken')


const verifyjwt = (req, res, next) => {
    const token = req.headers["x-access-token"]?.split(' ')[1]
    console.log(token)

    if (token) {
        jwt.verify(token, process.env.PASSPORTSECRET , (err, decoded) => {  //'test'
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
        res.status(403).json({message: 'Incorrect Token Given', isLoggedIn: false})
    }
} 


// const verifyjwt = (req,res, next) => {
//     let token = req.headers["x-access-token"]

//     if(!token) {
//         return res.status(403).send({message: "No token provided!"})
//     }

//     jwt.verify(token, 'test', (err, decoded) => {
//         if(err) {
//             return res.status(401).send({message: "Unauthorized!"})
//         }
//         req.user = {}
//             req.user.id = decoded.id
//             req.user.username = decoded.username
//             req.user.photo = decoded.photo
//             next()
//     })
// }


module.exports = verifyjwt


