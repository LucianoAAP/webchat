const crypto = require('crypto');
const historyModel = require('../models/history');

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

module.exports = (io) => io.on('connection', (socket) => {
  const newNickname = crypto.randomBytes(8).toString('hex');
  socket.emit('connection', { nickname: newNickname, id: socket.id });
  socket.on('message', async ({ nickname, chatMessage }) => {
    const timestamp = createDate();
    io.emit('message', `${createDate()} - ${nickname}: ${chatMessage}`);
    await historyModel.create({ message: chatMessage, nickname, timestamp });
  });
  socket.on('changeNickname', (nickname) => {
    io.emit('changeNickname', { id: socket.id, newNickname: nickname });
  });
});