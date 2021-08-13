const supertest = require('supertest')
const connectDB = require('../src/db/mongooseClient')
const User = require('../src/model/User')
const {sampleUser} = require('./sampleUser')
const app = require('../src/server')
const mongoose = require('mongoose');

let agent = supertest.agent(app)
let user = null
describe('user services', () => {
    beforeAll(async () => {
        await connectDB()
        user = await User.findOne({email:sampleUser.email})
        agent.set({userid:user._id})
    })
    afterAll(async () => {
        await mongoose.connection.close()
    })
    test('update firstName and lastName', async () => {
        const res = await agent.put('/name').send({firstName:'John', lastName:'Doe'})
        expect(res.statusCode).toEqual(202)
    })
})