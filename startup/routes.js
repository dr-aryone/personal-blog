const express = require('express');
const app = new express();
// External routes
app.use('/', require('../routes/index'));
app.use("/users", require("../routes/users"));
app.use('/api/articles', require('../routes/articles'));
app.use(express.static('public'));