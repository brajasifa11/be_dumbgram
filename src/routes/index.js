const express = require('express')
const router = express.Router()

// const { getData, getDetail, addData, updateData, deleteData } = require('../controllers/dataUsers')
const { users, register } = require('../controllers/user')

//todo
// router.get('/', getData)
// router.get('/detail/:id', getDetail)
// router.post('/data', addData)
// router.patch('/data/:id', updateData)
// router.delete('/data/:id', deleteData)

//register
router.get('/register', register)

//user
router.get('/users', users)

module.exports = router