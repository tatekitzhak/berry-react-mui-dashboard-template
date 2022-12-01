const mongoose = require('mongoose');
/**
 *  https://www.mongodb.com/community/forums/t/duplicate-data-getting-added-into-collection/150331/2
 */
const Schema = mongoose.Schema;

const ArrSubdocSchema = new Schema({
    name: String,
    keys: String
  })

var SubdocumentSchema = new Schema({
    name: {
        type: String, required: true,
        unique: true
    },
    // Array of subdocuments
    specials: [ArrSubdocSchema],
      // Single subdocument
      ultimate: {
        name: String,
        keys: String
      }
},
    { collection: 'subdocument' });

module.exports = mongoose.model('Subdocument', SubdocumentSchema);