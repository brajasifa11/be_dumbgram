const express = require('express')
const router = express.Router()
const { users, register, login } = require('../controllers/user')

//register
router.get('/register', register)

//user
router.get('/users', users)

//log in
router.post('/login', login)

module.exports = router