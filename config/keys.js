require('dotenv').config();

const dbpass = process.env.DB_PASS;
const mlabpass = process.env.MLAB_PASS;
const jwtPrivateKey = process.env.jwtPrivateKey;
const testPass = process.env.TEST_PASS;


MongoURI = "mongodb+srv://fishj123:" + testPass + "@vidlycluster-hcnja.azure.mongodb.net/test?retryWrites=true",
    
// "mongodb://fishj123:" + mlabpass + "@ds149885.mlab.com:49885/heroku_26921dvn"


module.exports.jwtPrivateKey = jwtPrivateKey;
module.exports.MongoURI = MongoURI; 
module.exports.mlabpass = mlabpass;