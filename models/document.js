var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentSchema = new Schema({
    title: String,
    description: String,
    documentUrl: String, 
    id: String,
    data: {
        type: Date,
        default: Date.now
    },
});
var Document = mongoose.model('Document', documentSchema);
module.exports = Document;