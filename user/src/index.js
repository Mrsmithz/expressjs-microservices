require('dotenv').config()
const app = require('./server')
const mongooseClient = require('./db/mongooseClient')
const PORT = process.env.PORT

app.listen(PORT, async () => {
    await mongooseClient()
    console.log(`User service listening on ${PORT}`)
})