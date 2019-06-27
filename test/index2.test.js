/*eslint no-undef: "off", max-len: "off"*/
"use strict";

process.env.JWT_SECRET = "vaPothM*F@1=c5+V?RTBPlrX%xcMqrEGnmBLS9fN90@_r48ylg&YsLaFczi_j|H&";
process.env.START_CHAT = true;

const request = require('supertest');
const app = require('../app');


test('Simply checking that chat server is started as well', async () => {
    const response = await request(app)
        .get('/');

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.text).toBe('{"title":"JSON API","routes":["login","register","player","player-upsert"]}');
    app.chatServer.stop();
});
