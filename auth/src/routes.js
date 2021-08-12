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

userRoute.get('/user', async (req, res, next) => {
    if (req.user){
        res.status(200).send(req.user)
    }
    else{
        res.sendStatus(400)
    }
})

module.exports = { authRoute, userRoute }
