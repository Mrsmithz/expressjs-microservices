const User = require('../model/User')
const passport = require('passport')
const localAuth = async (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err){
            throw new Error('auth fail')
        }
        if (user){
            req.login(user, err => {
                if (err){
                    console.log(err)
                    return res.sendStatus(400)
                }
                return res.sendStatus(200)
            })
        }
        if (!user){
            throw new Error('user not found or password invalid')
        }
    })(req, res, next)
}
const registerUser = async (req, res, next) => {
    const {username, password, email, firstName, lastName} = req.body
        const checkUser = await User.findOne({email:email})
        if (checkUser){
            throw new Error('User already exist')
        }
        return await User.create({
            username:username,
            password:password,
            email:email,
            firstName:firstName,
            lastName:lastName
        })
}

passport.serializeUser((user, cb) => {
    console.log(`serialize ${user.username}`)
    cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
    User.findById(id, function(err, user) {
        console.log(`deserialize ${user.username}`)
        cb(err, user);
    });
});
module.exports = { localAuth, registerUser }