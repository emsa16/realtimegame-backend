/*eslint no-unused-vars: "off", max-len: ["error", { "ignoreStrings": true }]*/
"use strict";

var express = require('express');
var router = express.Router();

const auth = require('../models/auth');
const db = require('../models/db');

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

router.get('/player',
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
            const uid = await auth.getIdFromToken(req.headers['x-access-token']);
            const result = await db.findByID("users", uid, {'model': 1, 'nickname': 1, 'position': 1, '_id': 0}, 1);
            const data = result[0];

            res.json(data);
        } catch (err) {
            console.log(err);
            res.status(500).json({message: err});
        }
    }
);

router.post('/player-upsert',
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
            const uid = await auth.getIdFromToken(req.headers['x-access-token']);
            const result = await db.findByID("users", uid, {}, 1);
            const user = result[0];
            const existingNicks = await db.find("users", {nickname: req.body.nickname, username: {$ne: user.username}}, {}, 1);

            if (existingNicks.length) {
                res.json({status: "failed", message: "This name is already taken"});
                return;
            }

            const data = {
                nickname: req.body.nickname,
                model: req.body.model,
                position: user.position ? user.position : "7,7,r"
            };

            await db.updateOne("users", {username: user.username}, data);
            res.json({status: "ok", message: "Player details updated"});
        } catch (err) {
            console.log(err);
            res.status(500).json({message: err});
        }
    }
);

module.exports = router;
