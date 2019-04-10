const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = new express();

//EJS templating - the master template is layout.ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use('/', require('./routes/index'));


const PORT = process.env.PORT || 7500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));