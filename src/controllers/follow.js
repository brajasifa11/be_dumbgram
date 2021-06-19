const { User, Follow } = require('../../models')
const except = ['password', 'createdAt', 'updatedAt', 'email', 'bio']

//get follower
exports.getFollower = async (req, res) => {
  try {
    const { id } = req.params
    const account = await User.findOne({ where: { id: id } })

    if (!account) {
      return res.status(404).send({
        status: 'Failed',
        message: 'User not found'
      })
    }
    const followers = await Follow.findAll({
      where: {
        followingId: id
      },
      attributes: [['followingId', 'id']],
      include: {
        model: User,
        as: 'follower',
        attributes: { exclude: except }
      }
    })
    const userFollow = followers.map((f) => ({
      id: f.id,
      user: f.follower
    }))
    res.status(200).send({
      status: 'Success',
      data: {
        follower: userFollow
      }
    })
  } catch (error) {
    console.log(messages.error)
    res.status(500).send({
      status: 'Failed',
      message: 'Server error'
    })
  }
}

// get following
exports.getFollowing = async (req, res) => {
  try {
    const { id } = req.params
    const account = await User.findOne({ where: { id: id } })

    if (!account) {
      return res.status(404).send({
        status: 'Failed',
        message: 'User not found'
      })
    }
    const following = await Follow.findAll({
      where: {
        followerId: id
      },
      attributes: [['followerId', 'id']],
      include: {
        model: User,
        as: 'following',
        attributes: { exclude: except }
      }
    })
    const userFollowing = following.map((f) => ({
      id: f.id,
      user: f.following
    }))
    res.status(200).send({
      status: 'Success',
      data: {
        following: userFollowing
      }
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      status: 'Failed',
      message: 'Server error'
    })
  }
}

// follow
exports.addFollower = async (req, res) => {
  try {
    const { userData } = req
    const data = req.params

    const checkingFollower = await Follow.findOne({ where: { followingId: data.id } })
    if (checkingFollower) {
      return res.status(400).send({
        status: 'Failed',
        message: 'User sudah difollow'
      })
    }
    const addFollow = await Follow.create({
      followerId: userData.id,
      followingId: data.id
    })
    res.status(200).send({
      status: 'Success',
      data: {
        follow: {
          id: addFollow.id,
          follower: userData,
          following: data.id
        }
      }
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      status: 'Failed',
      message: 'Server error'
    })
  }
}