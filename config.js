const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dbpass = process.env.DB_PASS,
};