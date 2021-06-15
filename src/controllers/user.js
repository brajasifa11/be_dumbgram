
const { User } = require('../../models')
const { generateToken } = require('../helpers/jwt')


//get all users
exports.users = async (req, res) => {
  try {
    const users = await User.findAll()
    res.send({
      status: 'success',
      message: 'User Successfully Get',
      data: {
        users
      }
    })
  } catch (error) {
    console.log(error)
    res.status({
      status: 'Failed',
      message: 'Server not found'
    })
  }
}

//get add user/register
exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = generateToken(req.body);
    res.send({
      status: 'success',
      data: {
        user: {
          fullName: req.body.fullName,
          username: req.body.username,
          token
        }
      }
    })
    // console.log(user)
  } catch (error) {
    console.log(error)
  }
}

//get user log in (by id)

//edit user

//delete user
