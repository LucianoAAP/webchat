const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const chatController = require('./controllers');

app.use(express.static(path.join(__dirname, '/views')));

require('./sockets/chat')(io);

app.set('view engine', 'ejs');

app.set('views', './views');

app.get('/', chatController.showMessages);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});