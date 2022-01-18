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
  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', `${createDate()} - ${nickname}: ${chatMessage}`);
  });
});