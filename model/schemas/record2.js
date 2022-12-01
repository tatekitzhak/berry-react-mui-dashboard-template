const mongoose = require('mongoose');
/**
 *  https://www.mongodb.com/community/forums/t/duplicate-data-getting-added-into-collection/150331/2
 */
const Schema = mongoose.Schema;

var Record2Schema = new Schema({
    name: {
        type: String, required: true,
        unique: true
    },
    specials: Array,
    ultimate: String
},
    { collection: 'records2' });

module.exports = mongoose.model('Record2', Record2Schema);