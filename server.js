if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

const express = require('express');
const Web3 = require('web3');
const bcrypt = require("bcrypt")
const app = express();
const passport = require("passport")

var mongoose = require('mongoose');

var User = require('./models/User');
var Wallet = require('./models/Wallet');
var Network = require('./models/Network');

app.set("view engine", "ejs")
app.use(express.static("static"))
app.use(express.urlencoded({extended: false}))

const web3 = new Web3(new Web3.providers.HttpProvider("https://api.avax.network/ext/bc/C/rpc"));

let wallets = ["0xE34B8c7742636c280EDf10a09D61B41fF6E7168c", "0xb4828b44c3810338F0771D8bbF085bd9B28FDEBf"]

mongoose.connect('mongodb://localhost/mullet')


app.get("/wallets", (req, res) => {
    res.render("wallets", {wallets: wallets});
})
app.get("/", (req, res) => {
    res.redirect("/login");
})  

// REGISTRAION
app.get("/register", (req, res) => {
    res.render("registration");
})

app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let user = new User({
            _id: new mongoose.Types.ObjectId(),
            login: req.body.login,
            password: hashedPassword,
            recoveryHash: "",
            sessions: [],
            wallets: []
        })
        console.log(user)
        user.save()
        res.redirect("/login")
    } catch {
        res.redirect("/register")
    }
})

// LOGIN
app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/wallets",
    failureRedirect: "/login",
    failureFlash: true
}))

app.listen(3000)