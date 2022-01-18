const path = require('path');
const historyModel = require('../models/history');

const showMessages = async (_req, res) => {
  const history = await historyModel.findAll();
  res.status(200).render(path.resolve(__dirname, '../views/chat.ejs'), { history });
};

module.exports = { showMessages };