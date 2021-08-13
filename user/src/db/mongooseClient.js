const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex:true
        })
        console.log('Connected to mongodb')
    }
    catch(err){
        console.log('Failed to connect to mongodb')
    }
}

module.exports = connectDB