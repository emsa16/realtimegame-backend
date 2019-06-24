/*eslint no-undef: "off", max-len: "off"*/
"use strict";

process.env.JWT_SECRET = "vaPothM*F@1=c5+V?RTBPlrX%xcMqrEGnmBLS9fN90@_r48ylg&YsLaFczi_j|H&";

const request = require('supertest');
const app = require('../app');
const auth = require('../models/auth');
const db = require('../models/db');

jest.mock('../models/db');



test('Auth - check token direct - success', async () => {
    let token = await getToken();

    db.findByID.mockResolvedValue([{user: 'test'}]);

    let result = await auth.checkTokenDirect(token);

    expect(result.status).toBe(true);
    expect(result.message).toBe("Valid token");
});

test('Auth - check token direct - missing token', async () => {
    let result = await auth.checkTokenDirect();

    expect(result.status).toBe(false);
    expect(result.message).toBe("Missing token");
});

test('Auth - check token direct - invalid token', async () => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1YzlhNjY1MDIzZWU1NDZkYTgxZTc1YWMiLCJpYXQiOjE1NjEzODU5NzEsImV4cCI6MTU2MTM4OTU3MX0.8dbG7c_0HSMWJr2l3UrB_t2AGWOCqgPgE6EoBCkawqM";

    let result = await auth.checkTokenDirect(token);

    expect(result.status).toBe(false);
    expect(result.message).toBe("Token not valid");
});

test('Auth - check token direct - missing user', async () => {
    let token = await getToken();

    db.findByID.mockResolvedValue("");

    let result = await auth.checkTokenDirect(token);

    expect(result.status).toBe(false);
    expect(result.message).toBe("Missing user");
});



//Helper functions

async function getToken() {
    db.find.mockResolvedValue([{"_id": "5d093a80ccb48f52fde3d0ea", "user": "tester", "hash": "$2b$10$0QPuV0An2WKGtRSEjUi17uNolwxl9uHMu74V976mcvD8DtdP5GM1S"}]); //password = 'tester'

    const loginResponse = await request(app)
        .post('/login')
        .set("Content-Type", "application/json")
        .send({username: "tester", password: "tester"});

    return JSON.parse(loginResponse.text).token;
}
