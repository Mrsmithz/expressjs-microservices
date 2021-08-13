const User = require('../model/User')

const updateName =  async (userId, firstName, lastName) => {
    await User.updateOne({_id:userId}, {firstName:firstName, lastName:lastName})
}

module.exports = {updateName}