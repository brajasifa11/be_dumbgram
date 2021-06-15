
const { User } = require('../../models')
const { generateToken } = require('../helpers/jwt')
const { comparePass } = require('../helpers/bcrypt')


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
exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    console.log(user)
    if (!user || !comparePass(password, user.password)) {
      res.send({
        status: 'Failed',
        message: 'Invalid Email or Password'
      })
    } else {
      const token = generateToken(user)
      res.send({
        status: 'Success',
        data: {
          user: {
            fullName: user.fullName,
            username: user.username,
            token
          }
        }
      })
    }
  } catch (error) {
    res.status({
      status: 'Failed',
      message: 'Server not Found'
    })
  }
}

//edit user

//delete user
