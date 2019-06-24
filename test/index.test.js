/*eslint no-undef: "off", max-len: "off"*/
"use strict";

process.env.JWT_SECRET = "vaPothM*F@1=c5+V?RTBPlrX%xcMqrEGnmBLS9fN90@_r48ylg&YsLaFczi_j|H&";

const request = require('supertest');
const app = require('../app');
const db = require('../models/db');

jest.mock('../models/db');



test('Root path', async () => {
    const response = await request(app)
        .get('/');

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"title":"JSON API","routes":["login","register","player","player-upsert"]}');
});

test('Non-existing path', async () => {
    const response = await request(app)
        .get('/foo/bar');

    expect(response.statusCode).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"msg":"Not Found"}');
});


test('login GET path', async () => {
    const response = await request(app)
        .get('/login');

    expect(response.statusCode).toBe(405);
    expect(response.type).toBe('application/json');
    expect(parseInt(response.header['content-length'])).toBeGreaterThan(0);
});

test('login path - success', async () => {
    db.find.mockResolvedValue([{"_id": "5d093a80ccb48f52fde3d0ea", "user": "tester", "hash": "$2b$10$0QPuV0An2WKGtRSEjUi17uNolwxl9uHMu74V976mcvD8DtdP5GM1S"}]); //password = 'tester'

    const response = await request(app)
        .post('/login')
        .set("Content-Type", "application/json")
        .send({username: "tester", password: "tester"});

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');

    let responseObj = JSON.parse(response.text);

    expect(responseObj.token.length).toBeGreaterThan(0);
    expect(responseObj.message).toBe('Login successful');
});

test('login path - wrong password', async () => {
    db.find.mockResolvedValue([{"user": "tester", "hash": "$2b$10$0QPuV0An2WKGtRSEjUi17uNolwxl9uHMu74V976mcvD8DtdP5GM1S"}]); //password = 'tester'

    const response = await request(app)
        .post('/login')
        .set("Content-Type", "application/json")
        .send({username: "tester", password: "wrongpass"});

    expect(response.statusCode).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"message":"Wrong password"}');
});

test('login path - missing user', async () => {
    db.find.mockResolvedValue("");

    const response = await request(app)
        .post('/login')
        .set("Content-Type", "application/json")
        .send({username: "tester", password: "tester"});

    expect(response.statusCode).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"message":"User not found"}');
});

test('login path - missing username/password', async () => {
    const response = await request(app)
        .post('/login')
        .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"message":"Username or password missing"}');
});

test('register GET path', async () => {
    const response = await request(app)
        .get('/register');

    expect(response.statusCode).toBe(405);
    expect(response.type).toBe('application/json');
    expect(parseInt(response.header['content-length'])).toBeGreaterThan(0);
});

test('register path - success', async () => {
    db.find.mockResolvedValue("");
    db.updateOne.mockResolvedValue("");

    const response = await request(app)
        .post('/register')
        .set("Content-Type", "application/json")
        .send({username: "tester", password: "tester"});

    expect(response.statusCode).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"message":"User registered"}');
});

test('register path - existing user', async () => {
    db.find.mockResolvedValue("{user: 'test'}");

    const response = await request(app)
        .post('/register')
        .set("Content-Type", "application/json")
        .send({username: "tester", password: "tester"});

    expect(response.statusCode).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"message":"User already exists"}');
});

test('register path - missing username/password', async () => {
    const response = await request(app)
        .post('/register')
        .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"message":"Username or password missing"}');
});

test('secret path - success', async () => {
    let token = await getToken();

    db.findByID.mockResolvedValue("{user: 'test'}");

    const response = await request(app)
        .get('/secret')
        .set('x-access-token', token);

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"msg":"Secret content"}');
});

test('secret path - missing token', async () => {
    const response = await request(app)
        .get('/secret');

    expect(response.statusCode).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"message":"Missing token"}');
});

test('secret path - token not valid', async () => {
    const response = await request(app)
        .get('/secret')
        //Old token, not valid anymore
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1YzlhNjY1MDIzZWU1NDZkYTgxZTc1YWMiLCJpYXQiOjE1NjEzODU5NzEsImV4cCI6MTU2MTM4OTU3MX0.8dbG7c_0HSMWJr2l3UrB_t2AGWOCqgPgE6EoBCkawqM');

    expect(response.statusCode).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"message":"Token not valid"}');
});

test('secret path - missing user', async () => {
    let token = await getToken();

    db.findByID.mockResolvedValue("");

    const response = await request(app)
        .get('/secret')
        .set('x-access-token', token);

    expect(response.statusCode).toBe(500);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"message":"Missing user"}');
});

test('player path', async () => {
    let token = await getToken();

    db.findByID.mockResolvedValue([{"model": "basic", "nickname": "Ulthar", "position": "7,7,r"}]);

    const response = await request(app)
        .get('/player')
        .set('x-access-token', token);

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"model":"basic","nickname":"Ulthar","position":"7,7,r"}');
});

test('player-upsert path - success', async () => {
    let token = await getToken();

    db.findByID.mockResolvedValue([{"username": "tester", "model": "basic", "nickname": "Ulthar", "position": "7,7,r"}]);
    db.find.mockResolvedValue("");
    db.updateOne.mockResolvedValue("");

    const response = await request(app)
        .post('/player-upsert')
        .set('x-access-token', token)
        .set("Content-Type", "application/json")
        .send({nickname: "Locutus", model: "borg"});

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"status":"ok","message":"Player details updated"}');
});

test('player-upsert path - nickname taken', async () => {
    let token = await getToken();

    db.findByID.mockResolvedValue([{"username": "tester", "model": "basic", "nickname": "Ulthar", "position": "7,7,r"}]);
    db.find.mockResolvedValue("{user: 'test'}");

    const response = await request(app)
        .post('/player-upsert')
        .set('x-access-token', token)
        .set("Content-Type", "application/json")
        .send({nickname: "Locutus", model: "borg"});

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"status":"failed","message":"This name is already taken"}');
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
