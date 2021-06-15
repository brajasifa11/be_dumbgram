const express = require('express')
const router = express.Router()
const { users, register } = require('../controllers/user')

//register
router.get('/register', register)

//user
router.get('/users', users)

module.exports = router