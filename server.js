const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static("./public"));

app.listen(8080);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const doorRoutes = require('./app/routes/doorRoutes');
const dragonRoutes = require('./app/routes/dragonRoutes')

doorRoutes(app);
dragonRoutes(app);