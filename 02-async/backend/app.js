const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const app = express();

app.use(cors());

// Соединение с базой данных
const connection = mysql.createConnection({
  host: "127.0.0.1",
  database: "nature",
  user: "root",
  password: "secret",
});

connection.connect(function (err) {
  if (err) throw err;
});

// Обработка POST-запросов из форм
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Запуск веб-сервера по адресу http://localhost:8080
app.listen(8080);

/**
 * Маршруты
 */
app.get("/", (req, res) => {
  connection.query("SELECT * FROM items", (err, data, fields) => {
    if (err) throw err;

    res.status(200).send(data);
  });
});

app.post("/paged", (req, res) => {
  const limit = (req.body.limit !== undefined) ? req.body.limit : 2;
  const offset = (req.body.offset !== undefined) ? req.body.offset : 0;

  connection.query("SELECT * FROM items LIMIT ? OFFSET ?", [[limit], [offset]], (err, data, fields) => {
    if (err) throw err;

    res.status(200).send(data);
  }); 
});

app.post("/store", (req, res) => {
  connection.query(
    "INSERT INTO items (title, image) VALUES (?, ?)",
    [[req.body.title], [req.body.image]],
    (err, result) => {
      if (err) throw err;

      res.status(201).send();
    }
  );
});

app.post("/test", (req, res) => {
  console.log(req.body);

  res.status(201).send({value: 'done'});
});
