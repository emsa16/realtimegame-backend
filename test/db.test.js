/*eslint no-undef: "off", max-len: "off"*/
"use strict";

process.env.DBWEBB_DSN = global.__MONGO_URI__;

const mongo = require("mongodb").MongoClient;
const db = require('../models/db');

describe('Testing chat server', () => {
    beforeAll(async () => {
        const client  = await mongo.connect(process.env.DBWEBB_DSN, { useNewUrlParser: true });
        const db = await client.db();
        const col = await db.collection("users");
        const doc = {
            "username": "tester",
            "hash": "$2b$10$0QPuV0An2WKGtRSEjUi17uNolwxl9uHMu74V976mcvD8DtdP5GM1S",
            "age": "12"
        };

        await col.insertOne(doc);
        await client.close();
    });

    afterAll(async () => {
        const client  = await mongo.connect(process.env.DBWEBB_DSN, { useNewUrlParser: true });
        const db = await client.db();
        const col = await db.collection("users");

        await col.deleteOne({'username': "tester"});
        await col.deleteOne({'username': "tester2"});
        await client.close();
    });

    test('find user', async () => {
        let result = await db.find("users", {username: "tester"}, {}, 1);

        expect(result[0].username).toBe("tester");
    });

    test('find user by id', async () => {
        let result1 = await db.find("users", {username: "tester"}, {}, 1);
        let uid = result1[0]._id;
        let result2 = await db.findByID("users", uid, {}, 1);

        expect(result2[0].username).toBe("tester");
    });

    test('insert user', async () => {
        let status = await db.insertOne("users", {username: "tester2", city: "Paris"});

        expect(status.insertedCount).toEqual(1);

        let result = await db.find("users", {username: "tester2"}, {}, 1);

        expect(result[0].city).toBe("Paris");
    });

    test('update user', async () => {
        let username = "tester";
        let oldUser = await db.find("users", {username: username}, {}, 1);
        let oldAge = oldUser[0].age;
        let status = await db.updateOne("users", {username: username}, {age: "15"});

        expect(status.modifiedCount).toEqual(1);

        let updatedUser = await db.find("users", {username: "tester"}, {}, 1);
        let newAge = updatedUser[0].age;

        expect(newAge).not.toEqual(oldAge);
    });


    test('delete user', async () => {
        let status = await db.deleteOne("users", {username: "tester"});

        expect(status.deletedCount).toEqual(1);

        let result = await db.find("users", {username: "tester"}, {}, 1);

        expect(result.length).toEqual(0);
    });
});
