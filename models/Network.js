var mongoose = require('mongoose');

var networkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    url: String, 
    logoPath: String
})

var Network = mongoose.model('Network', networkSchema)

module.exports = Network;