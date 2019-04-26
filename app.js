require("./startup/errors")();
const express = require("express");
const app = new express();
require("./startup/routes")(app);
require("./middleware/flash");
require("dotenv").config();
require("./startup/mongodb")();
require('./startup/prod')(app);

module.exports.app = app;

const PORT = process.env.PORT || 7500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
