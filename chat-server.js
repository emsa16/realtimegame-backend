var chatServer = require('@emsa16/chat-server');
const auth = require('./models/auth');
const db = require('./models/db');

chatServer.start("", "", "", auth, db);
