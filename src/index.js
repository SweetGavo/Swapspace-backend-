const express = require('express')
const app = express()

// use json middleware
app.use(express.json())

app.get('/v1/users', (req, res) => {
   res.status(200).json({"users": []})
})

module.exports = app