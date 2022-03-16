var mongoose = require('mongoose');

var walletSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address: String, 
    secret: String,
    networks: [
        {
            _id: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Network'
            },
            contracts: []
        }
    ]
})
 
var Wallet = mongoose.model('Wallet', walletSchema);
 
module.exports = Wallet;