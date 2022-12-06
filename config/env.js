const path = require('path');

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3900,
  mongo: {
    uri: "mongodb://localhost:27017" //process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: 3900,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
};