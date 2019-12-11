const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static("./public"));

const port = process.env.port || 8080;

app.listen(port, () => {
    console.log(`The app is running on port ${ port }...`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const doorRoutes = require('./app/routes/doorRoutes');
const dragonRoutes = require('./app/routes/dragonRoutes')

doorRoutes(app);
dragonRoutes(app);