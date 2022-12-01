const mongoose = require('mongoose');
/**
 *  https://www.mongodb.com/community/forums/t/duplicate-data-getting-added-into-collection/150331/2
 */
const Schema = mongoose.Schema;

var RecordSchema = new Schema({
    name: {
        type: String, required: true,
        unique: true
    },
    specials: Array,
    ultimate: String
},
    { collection: 'records' });

module.exports = mongoose.model('Record', RecordSchema);