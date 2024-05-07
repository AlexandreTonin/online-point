const jwt = require('jsonwebtoken')
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET_KEY

function generateToken(userId, userEmail) {
    const payload = {
        userId,
        userEmail
    }

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '10h'})
    return token
}

module.exports = generateToken