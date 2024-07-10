const express = require('express')
const mysql = require('mysql');
const path = require('path');
const app = express();

require('dotenv').config();

// Соединение с базой данных
const connection = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USERNAME,
    password: process.env.PASSWORD
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    }
});

// Парсинг json
app.use(express.json())

// Путь к директории файлов ресурсов (css, js, images)
app.use(express.static('public'));

// Настройка шаблонизатора
app.set('view engine', 'ejs');

// Путь к директории файлов отображения контента
app.set('views', path.join(__dirname, 'views'));

// Обработка POST-запросов из форм
app.use(express.urlencoded({ extended: true }));

// Запуск веб-сервера по адресу http://localhost:3000
app.listen(3000);

/**
 * Маршруты
 */
app.get('/', (req, res) => {
    connection.query("SELECT * FROM items", (err, data, fields) => {
        if (err) {
            console.log(err);
        }

        res.render('home', {
            'items': data,
        });
    });
});

app.get("/items", (req, res) => {
    connection.query("SELECT * FROM items", (err, data, fields) => {
        if (err) {
            console.log(err);
        }

        res.status(200).send(data);
    });
});

app.get('/items/:id', (req, res) => {
    connection.query("SELECT * FROM items WHERE id=?", [req.params.id],
        (err, data, fields) => {
            if (err) {
                console.log(err);
            }

            res.render('item', {
                'item': data[0],
            })
        });
});

app.get('/add', (req, res) => {
    res.render('add')
});

app.post('/store', (req, res) => {
    connection.query(
        "INSERT INTO items (title, image) VALUES (?, ?)",
        [[req.body.title], [req.body.image]],
        (err, data, fields) => {
            if (err) {
                console.log(err);
            }

            res.redirect('/');
        }
    );
});

app.post('/target', (req, res) => {
    console.log(req.body.message);

    res.redirect('/');
});
