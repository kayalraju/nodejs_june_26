
const jwt = require("jsonwebtoken")
const AuthCheck = (req, res, next) => {
    if (req.cookies && req.cookies.token) {
        jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY, (err, data) => {
            req.user = data
            next()
        })
    } else {
        next()
    }

}

module.exports = AuthCheck;