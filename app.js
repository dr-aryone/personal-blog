require("./startup/errors")();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = new express();
require("./startup/routes")(app);
require("./middleware/flash");
require("./middleware/authentication");
require("dotenv").config();
require("./startup/mongodb")();


const PORT = process.env.PORT || 7500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
