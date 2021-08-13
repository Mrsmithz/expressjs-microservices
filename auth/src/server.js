const express = require('express')
const passport = require('passport')
const { authRoute, userRoute } = require('./routes')
const session = require('express-session')
const app = express()

app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: true
}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())


// routes
app.use(authRoute)
app.use(userRoute)


module.exports = app
