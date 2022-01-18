const path = require('path');

const showMessages = async (_req, res) => {
  res.status(200).render(path.resolve(__dirname, '../views/chat.ejs'));
};

module.exports = { showMessages };