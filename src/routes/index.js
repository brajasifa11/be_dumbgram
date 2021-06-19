const express = require('express')
const router = express.Router()
const { users, update, deleteUser } = require('../controllers/user')
const { login } = require('../controllers/login')
const { register } = require('../controllers/register')
const auth = require('../middleware/auth')
const { getFollower, getFollowing, addFollower } = require('../controllers/follow')

//log in
router.post('/login', login)
//register
router.post('/register', register)

//user
router.get('/users', users)
//update
router.patch('/update/:id', auth, update)
//delete
router.delete('/delete/:id', auth, deleteUser)

//follow
router.get('/followers/:id', auth, getFollower)
router.get('/following/:id', auth, getFollowing)
router.post('/follow/:id', auth, addFollower)

module.exports = router
