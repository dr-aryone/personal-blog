require('dotenv').config();

const dbpass = process.env.DB_PASS;

module.exports = {
  MongoURI:
    `mongodb+srv://fishj123:${dbpass}@cluster1-kzyms.mongodb.net/test?retryWrites=true`,
};