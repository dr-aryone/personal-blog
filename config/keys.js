require('dotenv').config();

const dbpass = process.env.DB_PASS;
const mlabpass = process.env.MLAB_PASS;

module.exports = {
  MongoURI:
    "mongodb://fishj123:" + mlabpass + "@ds149885.mlab.com:49885/heroku_26921dvn",
    
};


// MLAB db for heroku 
// mongodb://<dbuser>:<dbpassword>@ds149885.mlab.com:49885/heroku_26921dvn
// `mongodb://fishj123:${mlabpass}>@ds149885.mlab.com:49885/heroku_26921dvn`,


//Atlas db
// `mongodb+srv://fishj123:${dbpass}@cluster1-kzyms.mongodb.net/test?retryWrites=true`