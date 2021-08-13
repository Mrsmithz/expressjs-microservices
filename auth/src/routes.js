const express = require('express')
const { localAuth, registerUser } = require('./services/authService')
const authRoute = express.Router()
const userRoute = express.Router()
const passport = require('passport')
const LocalStrategy = require('./strategies/localStrategy')

authRoute.post('/login', localAuth)
authRoute.post('/register', async (req, res, next) => {
    try{
        await registerUser(req, res, next)
        res.sendStatus(201)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
})

userRoute.get('/check-auth', async (req, res, next) => {
    if (req.user){
        res.setHeader('userId', req.user._id)
        res.sendStatus(204)
    }
    else{
        res.sendStatus(401)
    }
})

module.exports = { authRoute, userRoute }
