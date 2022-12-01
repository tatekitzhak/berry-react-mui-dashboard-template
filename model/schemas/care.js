const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var careSchema = new Schema({
    name: {
        type: String, required: true,
        unique: true
    },
    ultimate: String
},
    { collection: 'care' });
module.exports = mongoose.model('care', careSchema);