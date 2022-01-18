const connection = require('./connection');

const findAll = async () => (connection().then((db) => db.collection('messages').find().toArray()));

const create = async ({ message, nickname, timestamp }) => (connection()
  .then((db) => db.collection('messages').insertOne({ message, nickname, timestamp })));

module.exports = { findAll, create };