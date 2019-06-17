/*eslint no-unused-vars: "off", max-len: ["error", { "ignoreStrings": true }]*/
"use strict";

var express = require('express');
var router = express.Router();

const auth = require('../models/auth');

// JSON API
router.get("/", (req, res) => {
    const data = {
        title: "JSON API",
        routes: [
            "login",
            "register"
        ]
    };

    res.json(data);
});

router.get('/register', async (req, res) => {
    res.status(405).json({msg: "This route only supports POST requests."});
});

router.post('/register', async (req, res) => {
    try {
        auth.register(res, req.body);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err});
    }
});

router.get('/login', async (req, res) => {
    res.status(405).json({msg: "This route only supports POST requests."});
});

router.post('/login', async (req, res) => {
    try {
        auth.login(res, req.body);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err});
    }
});

//Just to test that token is valid and working
router.get('/secret',
    async (req, res, next) => {
        try {
            auth.checkTokenRespond(req, res, next);
        } catch (err) {
            console.log(err);
            res.status(500).json({message: err});
        }
    },
    async (req, res) => {
        try {
            res.json({msg: "Secret content"});
        } catch (err) {
            console.log(err);
            res.status(500).json({message: err});
        }
    }
);



module.exports = router;
