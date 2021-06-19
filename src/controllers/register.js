const { User } = require('../../models')
const { generateToken } = require('../helpers/jwt')
const joi = require('joi')

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

    res.status(201).send({
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

    res.status(500).send({
      status: 'Failed',
      message: 'Server not found'
    })
  }
}