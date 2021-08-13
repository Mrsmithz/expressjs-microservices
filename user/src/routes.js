const express = require('express')
const userRoute = express.Router()
const { updateName } = require('./services/userService')
userRoute.put('/name', async (req, res, next) => {
    try{
        await updateName(req.headers.userid, req.body.firstName, req.body.lastName)
        res.sendStatus(202)
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
})

module.exports = { userRoute }