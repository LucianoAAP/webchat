const { MongoClient } = require('mongodb');
require('dotenv').config();

let schema = null;

async function connection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(process.env.DB_URL || 'mongodb://localhost:27017/webchat/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(process.env.DB_NAME || 'webchat'))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    });
}

module.exports = connection;
