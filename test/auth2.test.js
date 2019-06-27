/*eslint no-undef: "off", max-len: "off"*/
"use strict";

process.env.JWT_SECRET = "";

const auth = require('../models/auth');

test('Simply checking that module is aware when jwtsecret is missing', async () => {
    let result = await auth.checkTokenDirect();

    expect(result.status).toBe(false);
    expect(result.message).toBe("Missing token");
});
