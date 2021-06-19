const { User } = require('../../models')
const Joi = require('joi')

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

//update user
exports.update = async (req, res) => {
  try {
    const { id } = req.params
    const { userData } = req
    const data = req.body

    if (+id !== userData.id) {
      return res.status(403).send({
        status: 'Failed',
        message: 'Forbiden access'
      })
    }

    const user = await User.findOne({ where: { id } })

    if (!user) {
      return res.status(400).send({
        status: 'Failed',
        message: 'User not found'
      })
    }
    const schema = Joi.object({
      fullName: Joi.string().required().min(4),
      username: Joi.string().required().min(4),
      email: Joi.string(),
      image: Joi.string(),
      bio: Joi.string()
    })
    const { error } = schema.validate(data)

    if (error) {
      return res.status(400).send({
        status: 'Failed',
        message: error.details[0].message
      })
    }
    await user.update(data, { where: { id: userData.id } })
    const userUpdate = await User.findOne({
      attributes: {
        exclude: ['createdAt', 'updateAt', 'password']
      },
      where: {
        id: userData.id
      }
    })
    res.status(200).send({
      status: 'Success',
      data: {
        user: {
          id: userUpdate.id,
          fullName: userUpdate.fullName,
          email: userUpdate.email,
          username: userUpdate.username,
          image: userUpdate.image,
          bio: userUpdate.bio
        }
      }
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      status: 'Failed',
      message: 'Server Error'
    })
  }
}

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const { userData } = req

    if (+id !== +userData.id) {
      return res.status(403).send({
        status: 'Failed',
        message: 'Forbiden access'
      })
    }

    await User.destroy({ where: { id } })
    res.status(200).send({
      status: 'Status',
      data: {
        id: id
      }
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      status: 'Failed',
      message: 'Server Error'
    })
  }
}
