const { verifyToken } = require('../helpers/jwt')
const { User } = require('../../models')

const authentication = (req, res, next) => {
  // console.log(req.headers);
  const header = req.headers.authorization
  if (!header) {
    res.status(401).send({
      status: 'Failed',
      message: 'Unauthorized user'
    })
  }

  try {
    const token = header.replace('Bearer ', '')
    const verified = verifyToken(token)
    console.log(verified);
    User.findByPk(verified.id)
      .then(data => {
        if (data) {
          req.userData = verified
          next()
        } else {
          res.status(404).send({
            status: 'Failed',
            message: 'User not found'
          })
        }
      })
      .catch(error => {
        console.log(error);
      })
  } catch (error) {
    res.status(500).send({
      status: 'Failed',
      message: 'Error'
    })
  }
}

module.exports = authentication