const express = require('express')
const router = require('./src/routes')
const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/', router)


app.listen(port, () => console.log(`Your server running on ${port}`))