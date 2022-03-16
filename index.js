var mongoose = require('mongoose');
 
var User = require('./models/User');
var Wallet = require('./models/Wallet');
var Network = require('./models/Network');

async function main() {
    await mongoose.connect('mongodb://localhost/mullet')
    let a = await Network.findOne({title: "Avalanche"})
    let b = await Network.findOne({title: "Binance Smart Chain"})

    var wallet = new Wallet({
        _id: new mongoose.Types.ObjectId(),
        address: "address", 
        secret: "secret",
        networks: [{_id: a._id, contracts: ['123', '456']}, {_id: b._id, contracts: ['123', '456']}]
    })
    // await wallet.save()
    // wallet.networks.forEach(function(network) {
    //     console.log(network._id)
    // })
    Wallet.find({}, function(err, wallet) {
        wallet.forEach(function (e) {
            for (let i = 0; i < e.networks.length; i++) {
                Network.findById(e.networks[i]._id, function (err, network) {
                    console.log(network)
                })
            }
        })
    })
    // Wallet.deleteMany({}, function(err, wallet) {})
}
main()