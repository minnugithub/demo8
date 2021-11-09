const mysql2 = require("mysql2");
const express = require("express");
//const { scheme } = require("mongoose");
var router = express.Router();

router.use(express.json());

var mysqlConnection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Minnu@123",
  database: "emplo",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

router.get("/", (req, res) => {
  mysqlConnection.query("select * from employeedet;", (err, rows, fields) => {
    if (!err) res.send(rows);
    //return res.console.log(rows);
    else console.log(err);
  });
});

//Router to GET specific item detail from the MySQL database
router.get("/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * from employeedet WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

module.exports = router;
