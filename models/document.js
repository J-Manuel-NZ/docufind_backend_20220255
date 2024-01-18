var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentSchema = new Schema({
    title: String,
    description: String,
    category: String,
    documentFile: String, 
    notes: String,
    id: String,
    data: {
        type: Date,
        default: Date.now
    },
}, {collection: 'docufind_collections'});

var Document = mongoose.model('Document', documentSchema);
module.exports = Document;