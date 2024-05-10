const jwt = require('jsonwebtoken')

function getUserIdByToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const userId = decoded.userId

        return userId
    } catch (error) {
        console.error('Erro ao decodificar o token:', error.message);
        return null;
    }
}

module.exports = getUserIdByToken