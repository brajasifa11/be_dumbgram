const { User } = require('../../models')
const { generateToken } = require('../helpers/jwt')
const { comparePass } = require('../helpers/bcrypt')

// log in
exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ where: { email } })

    console.log(user, 'ini user');
    console.log(req.body, 'ini req body');

    if (!user || !comparePass(password, user.password)) {
      res.send({
        status: 'Failed',
        message: 'Invalid Username or Password'
      })
    } else {
      const token = generateToken(user)
      res.status(200).send({
        status: 'Success',
        data: {
          user: {
            fullName: user.fullName,
            username: user.suername,
            token
          }
        }
      })
    }
  } catch (error) {
    console.log('CATCH')
    res.status(500).send({
      status: 'Failed',
      message: 'Server not found'
    })
  }
}