const jwt = require('jsonwebtoken')
const secretKey = 'dumbgram'

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    secretKey
  )
}

const verifyToken = (access_token) => {
  return jwt.verify(access_token, secretKey)
}

module.exports = { generateToken, verifyToken }