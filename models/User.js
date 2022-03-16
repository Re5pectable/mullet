var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login: String,
    password: String,
    recoveryHash: String,
    sessions: [{
        device: String,
        date: {
            type: String,
            default: Date.now()
        }
    }],
    wallets: Array
})
 
var User = mongoose.model('User', userSchema);
module.exports = User