/**
 * Authentication module
 */
"use strict";

const db = require('./db.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const auth = {
    register: async function(res, body) {
        const username = body.username;
        const password = body.password;

        if (!username || !password) {
            console.log("Username or password missing");
            return res.status(401).json({message: "Username or password missing"});
        }

        const result = await db.find("users", {username: username}, {}, 1);

        if (result.length) {
            console.log("User already exists");
            return res.status(401).json({message: "User already exists"});
        }

        const hash = await bcrypt.hash(password, saltRounds);
        const doc = {
            "username": username,
            "hash": hash
        };

        await db.insertOne("users", doc);
        console.log("new user registered");
        return res.status(201).json({message: "User registered"});
    },

    login: async function(res, body) {
        const username = body.username;
        const password = body.password;

        if (!username || !password) {
            return res.status(401).json({message: "Username or password missing"});
        }

        const result = await db.find("users", {username: username}, {}, 1);

        if (!result.length) {
            console.log("User not found");
            return res.status(401).json({message: "User not found"});
        }
        const user = result[0];
        const match = await bcrypt.compare(password, user.hash);

        if (!match) {
            console.log("Wrong password");
            return res.status(401).json({message: "Wrong password"});
        }

        const payload = { uid: user._id };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h'});

        console.log("Login successful");
        return res.json({token: token, message: "Login successful"});
    },

    checkTokenDirect: async function(token) {
        if (!token) {
            console.log("Missing token");
            return {
                status: false,
                message: "Missing token"
            };
        }

        let decoded;

        try {
            decoded = jwt.verify(token, jwtSecret);
        } catch (err) {
            console.log("Token not valid");
            return {
                status: false,
                message: "Token not valid"
            };
        }

        const uid = decoded.uid;

        if (uid) {
            const result = await db.findByID("users", uid, {}, 1);

            if (!result.length) {
                console.log("Missing user");
                return {
                    status: false,
                    message: "Missing user"
                };
            }

            console.log("Valid token");
            return {
                status: true,
                message: "Valid token"
            };
        } else {
            console.log("Missing uid");
            return {
                status: false,
                message: "Missing uid"
            };
        }
    },

    checkTokenRespond: async function(req, res, next) {
        const token = req.headers['x-access-token'];

        if (!token) {
            console.log("Missing token");
            return res.status(401).json({message: "Missing token"});
        }

        jwt.verify(token, jwtSecret, async function(err, decoded) {
            if (err) {
                console.log("Token not valid");
                return res.status(401).json({message: "Token not valid"});
            }

            const uid = decoded.uid;

            if (uid) {
                const result = await db.findByID("users", uid, {}, 1);

                if (!result.length) {
                    console.log("Missing user");
                    return res.status(500).json({message: "Missing user"});
                }

                console.log("Valid token");
                next();
            } else {
                console.log("Missing uid");
            }
        });
    }
};

module.exports = auth;
