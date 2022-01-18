const showMessages = async (_req, res) => {
  res.status(200).render('chat');
};

module.exports = { showMessages };