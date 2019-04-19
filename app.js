require("./startup/errors");
const expressLayouts = require("express-ejs-layouts");
require("./startup/routes");
require("./middleware/flash");
require("./middleware/authentication");
require("dotenv").config();
require("./startup/mongodb");
const express = require("express");
const app = new express();

app.use(express.json());

//EJS templating - the master template is layout.ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

//Bodyparser
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 7500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
