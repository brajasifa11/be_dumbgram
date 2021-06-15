
const { User } = require('../../models')
const { generateToken } = require('../helpers/jwt')
const { comparePass } = require('../helpers/bcrypt')
const joi = require('joi')

//get all users
exports.users = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    res.status(200).send({
      status: 'success',
      message: 'User Successfully Get',
      data: {
        users
      }
    })
  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      message: 'Server not found'
    })
  }
}

//get add user/register
exports.register = async (req, res) => {
  try {
    const { email } = req.body
    const data = req.body
    const scheme = joi.object({
      email: joi.string().email().min(5).required(),
      username: joi.string().min(6).required(),
      password: joi.string().min(8).required(),
      fullName: joi.string().min(8).required()
    })

    const { error } = scheme.validate(data)

    if (error) {
      return res.status(400).json({
        status: 'Failed',
        message: error.details[0].message
      })
    }
    const checkEmail = await User.findOne({
      where: {
        email
      }
    })

    if (checkEmail) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Email already registered'
      })
    }

    const dataUser = await User.create(data)
    const token = generateToken(dataUser)

    res.send({
      status: 'Success',
      data: {
        user: {
          fullName: dataUser.fullName,
          username: dataUser.username,
          token
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
}

//get user log in (by id)

//update user

//delete user
