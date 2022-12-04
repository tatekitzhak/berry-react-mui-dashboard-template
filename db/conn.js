const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { mongo } = require('../config/varsenv');

async function mongooseConnect(args) {
    console.log('\x1b[36m', `${args}:`, '\x1b[0m', 'connections process...');

    await mongoose.connect(mongo.uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((res) => {
            console.log('Connection successful:\n', mongoose.connection.states)
        }).catch((error) => {
            console.log('Connection failed: ', error)
        });;

    return mongoose

}

module.exports = mongooseConnect;
