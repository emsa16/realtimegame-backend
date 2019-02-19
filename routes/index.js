/*eslint no-unused-vars: "off", max-len: ["error", { "ignoreStrings": true }]*/
"use strict";

var express = require('express');
var router = express.Router();

// JSON API
router.get("/", (req, res) => {
    const data = {
        msg: "Hello"
    };

    res.json(data);
});

module.exports = router;
