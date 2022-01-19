const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const http = require('http');
const socket = require('socket.io');

const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST'],
  },
});

const errorMiddleware = require('./middlewares/error');

app.use(express.static(path.join(__dirname, '/views')));

require('./sockets/chat')(io);

app.set('view engine', 'ejs');

app.set('views', './views');

app.use('/', require('./routers'));

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});