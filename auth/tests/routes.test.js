const supertest = require('supertest')
const connectDB = require('../src/db/mongooseClient')
const User = require('../src/model/User')
const {sampleUser} = require('./sampleUser')
const app = require('../src/server')
const mongoose = require('mongoose');
let agent = supertest.agent(app)

describe('auth endpoints', () => {
    beforeAll(async () => {
        await connectDB()
    })
    afterAll(async () => {
        await mongoose.connection.close()
    })
    describe('auth not required test', () => {
        beforeAll(async () => {
            await User.deleteOne({username:sampleUser.username})
        })
        test('register', async () => {
            const res = await agent
            .post('/register').send(sampleUser)
            expect(res.statusCode).toEqual(201)
        })
        test('login', async () => {
            const res = await agent
            .post('/login').send(sampleUser)
            expect(res.statusCode).toEqual(200)
        })
    })
    describe('auth required test', () => {
        test('get user', async () => {
            const res = await agent
            .get('/user')
            expect(res.statusCode).toEqual(200)
        })
    })
})