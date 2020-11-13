const mysql = require("mysql");
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "sqladmin",
    database : "node_tutorial"
});

module.exports = connection;