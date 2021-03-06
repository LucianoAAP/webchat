const crypto = require('crypto');
const historyModel = require('../models/history');

const clients = [];

const createDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

const createMessage = (socket, io) => {
  socket.on('message', async ({ nickname, chatMessage }) => {
    const timestamp = createDate();
    await historyModel.create({ message: chatMessage, nickname, timestamp });
    io.emit('message', `${createDate()} - ${nickname}: ${chatMessage}`);
  });
};

const changeNickname = (socket, io) => {
  socket.on('changeNickname', (nickname) => {
    clients[clients.indexOf(clients.find((client) => client.id === socket.id))].nickname = nickname;
    io.emit('changeOfClients', clients);
  });
};

const removeClient = (socket) => {
  socket.on('disconnect', () => {
    clients.splice(clients.indexOf(clients.find((client) => client.id === socket.id)), 1);
    socket.broadcast.emit('changeOfClients', clients);
  });
};

module.exports = (io) => io.on('connection', (socket) => {
  const randomNickName = crypto.randomBytes(8).toString('hex');
  clients.push({ id: socket.id, nickname: randomNickName });
  io.emit('changeOfClients', clients);
  createMessage(socket, io);
  changeNickname(socket, io);
  removeClient(socket);
});