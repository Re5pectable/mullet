const web3 = new Web3(new Web3.providers.HttpProvider("https://api.avax.network/ext/bc/C/rpc"));

class Network {
    constructor(name = null, icon = null, token = null, id = null, web3 = null) {
      this.name = name;
      this.icon = icon;
      this.symbol = token;
      this.id = id;
      this.web3 = web3;
    }
  }

const BSC = new Network(
    "Binance Smart Chain",
    "../icons/bsc_logo.png",
    "BNB",
    1,
    new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")));

const Avalanche = new Network(
    "Avalanche",
    "../icons/avalanche_logo.png",
    "AVAX",
    2,
    new Web3(new Web3.providers.HttpProvider("https://api.avax.network/ext/bc/C/rpc")));

var networks = [BSC, Avalanche]

async function getBalance(network, address) {
    return await network.eth.getBalance(address)
}

function appendNetwork(network, balance) {
    return `<div class="network" network_id=${network.id}><div><img src="${network.icon}"><span>${String(balance).slice(0, 7)}</span></div><span>${network.symbol}</span></div>`
}

document.addEventListener("DOMContentLoaded", function(event) {
    $(".wallet").each(async function () {
        const address = $(this).attr("wallet");
        let wal_list = $(this).find('.wallet-low')

        $(this).find('.wallet-address')[0].innerHTML = address.slice(0, 5) + ".." + address.slice(-4) + $(this).find('.wallet-address')[0].innerHTML;

        for (const network of networks) {
            let bal = await getBalance(network.web3, address);
            wal_list.append(appendNetwork(network, bal/(10 ** 18)))
        }})
    $(".wallet-low").on("click", ".network", function(e) {
        let walletTokens = $(this).parent().parent().next(".wallet-tokens")
        walletTokens.show()
        walletTokens.animate({
            width: "300px"
        }, 500, function () {
            walletTokens.animate({
                opacity: 1
            }, 200)
        })
    })
});