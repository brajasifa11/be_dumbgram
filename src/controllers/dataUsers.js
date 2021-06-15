
let userData = [
  {
    id: 1,
    email: 'dinda@gmail.com',
    username: 'dindaputri',
    password: 'myCustomPassword',
    fullname: 'Dinda Adinda Putri'
  },
  {
    id: 2,
    email: 'braja@gmail.com',
    username: 'brajasifa',
    password: 'myPassword',
    fullname: 'Braja Sifa Satyaputra'
  },
]

//get data
exports.getData = (req, res) => {
  res.send({
    status: 'success',
    data: userData
  })
}

//get data by id
exports.getDetail = (req, res) => {
  const id = req.params.id
  const data = userData.find((data) => data.id == id)

  if (data) {
    res.send({
      status: 'Success',
      data
    })
  } else {
    res.send({
      status: 'Failed',
      message: 'Data not found'
    })
  }
}

//add data
exports.addData = (req, res) => {
  const { body } = req
  userData = [...userData, body]

  res.send({
    status: 'success',
    data: body
  })
}

// edit data
exports.updateData = (req, res) => {
  const { id } = req.params
  const { body } = req
  const data = userData.find((data) => data.id == id)

  if (!data) {
    return res.send({
      status: 'Failed',
      message: `Data with id : ${id} not existed`
    })
  }

  const updateData = userData.map((data) => {
    return data.id == id ? body : data
  })

  userData = updateData

  res.send({
    status: 'success',
    message: 'Data  user successfully Updated',
    data: body
  })
}

//delete
exports.deleteData = (req, res) => {
  const { id } = req.params
  const newData = userData.filter((data) => data.id != id)
  userData = newData

  res.send({
    status: 'Success Deleted',
    message: 'Data user successfully deleted',
    data: userData
  })
}