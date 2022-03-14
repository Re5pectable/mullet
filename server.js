const express = require('express');
const Web3 = require('web3');
const app = express();

app.set("view engine", "ejs")

app.use(express.static("static"))

const web3 = new Web3(new Web3.providers.HttpProvider("https://api.avax.network/ext/bc/C/rpc"));
wallets = ["0xE34B8c7742636c280EDf10a09D61B41fF6E7168c", "0xb4828b44c3810338F0771D8bbF085bd9B28FDEBf"]


app.get("/wallets", (req, res) => {
    res.render("wallets", {wallets: wallets});
})
app.listen(3000)