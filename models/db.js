/**
 * Connect to the database and search using a criteria.
 */
"use strict";

// MongoDB
const mongo = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/game";



const database = {
    /**
     * Find documents in an collection by matching search criteria.
     *
     * @async
     *
     * @param {string} colName    Name of collection.
     * @param {object} criteria   Search criteria.
     * @param {object} projection What to project in results.
     * @param {number} limit      Limit the number of documents to retrieve.
     *
     * @throws Error when database operation fails.
     *
     * @return {Promise<array>} The resultset as an array.
     */
    find: async function(colName, criteria, projection, limit) {
        try {
            const client  = await mongo.connect(dsn, { useNewUrlParser: true });
            const db = await client.db();
            const col = await db.collection(colName);
            const res = await col.find(criteria).project(projection).limit(limit).toArray();

            await client.close();

            return res;
        } catch (err) {
            console.log(err.stack);
        }
    },



    findByID: async function(colName, uid, projection, limit) {
        const uidObject = new ObjectID(uid);

        return this.find(colName, {_id: uidObject}, projection, limit);
    },



    insertOne: async function(colName, doc) {
        try {
            const client  = await mongo.connect(dsn, { useNewUrlParser: true });
            const db = await client.db();
            const col = await db.collection(colName);
            const res = await col.insertOne(doc);

            await client.close();

            return res;
        } catch (err) {
            console.log(err.stack);
        }
    },



    updateOne: async function(colName, criteria, doc) {
        try {
            const client  = await mongo.connect(dsn, { useNewUrlParser: true });
            const db = await client.db();
            const col = await db.collection(colName);
            const res = await col.updateOne(criteria, {$set: doc});

            await client.close();

            return res;
        } catch (err) {
            console.log(err.stack);
        }
    },



    deleteOne: async function(colName, criteria) {
        try {
            const client  = await mongo.connect(dsn, { useNewUrlParser: true });
            const db = await client.db();
            const col = await db.collection(colName);
            const res = await col.deleteOne(criteria);

            await client.close();

            return res;
        } catch (err) {
            console.log(err.stack);
        }
    }
};


console.log(`DSN is: ${dsn}`);

module.exports = database;
