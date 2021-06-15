const express = require('express')
const router = express.Router()
const { users, register, login } = require('../controllers/user')
const auth = require('../middleware/auth')

//register
router.post('/register', register)

//user
router.get('/users', users)

//log in
router.post('/login', login)

//update

module.exports = router