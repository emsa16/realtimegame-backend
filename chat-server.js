var chatServer = require('@emsa16/chat-server');
const auth = require('./models/auth');

chatServer.setAuth(auth);
chatServer.start();
