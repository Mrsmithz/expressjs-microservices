const User = require('../model/User')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try{
            let user = await User.findOne({username:username})
            if (!user){
                return done(null, false)
            }
            if (password != user.password){
                return done(null, false)
            }
            return done(null, user)
        }
        catch(err){
            //console.log(err)
            return done(err)
        }
    }
))