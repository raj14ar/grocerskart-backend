const express = require('express')
const app = express()
const port = 8000
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(passport.initialize());
// app.use(passport.session());

//app.use(passport.setAuthenticatedUser);

// use express router

app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`App is listening at port ${port}`)
})