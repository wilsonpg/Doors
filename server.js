const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

app.use(express.static("./public"));

//local mysql db connection
let con = mysql.createConnection({
    host: `localhost`,
    port: 3306,
    user: `root`,
    password: `wilson`,
    database: `sys`
});

con.connect();

app.listen(8080);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./app/routes/appRoutes'); //importing route

routes(app); //register the route