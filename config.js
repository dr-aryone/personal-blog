const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dbpass = process.env.DB_PASS,
    mlabpass = process.env.MLAB_PASS,
};