const express = require('express')
const app = express()
const port = 8000
const db = require('./config/mongoose');
const passport = require('passport');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})