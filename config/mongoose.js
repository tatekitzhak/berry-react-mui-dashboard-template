const mongoose = require('mongoose');

const { mongo } = require('./varsenv');

async function mongooseConnect(args) {
    console.log('mongoose connections process...', args)
    try {
        const mongooseConn = await mongoose.connect(mongo.uri,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
              });
            console.log('Connection successful:\n', mongooseConn.connection.states)
            return mongooseConn.connection;
    } catch (error) {
        console.log('Connection failed: ', error)
    }
    
}

module.exports = mongooseConnect;
