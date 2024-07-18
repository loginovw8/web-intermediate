import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import formbody from '@fastify/formbody'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import ejs from 'ejs';
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const app = Fastify({
    logger: false,
});

app.register(fastifyStatic, {
    root: path.join(dirname(fileURLToPath(import.meta.url)), 'public'),
});

app.register(fastifyView, {
    engine: {
        ejs: ejs,
    },
    root: path.join(dirname(fileURLToPath(import.meta.url)), 'views'),
});

app.register(formbody);

// Соединение с базой данных
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    }
});

app.listen({ port: process.env.PORT });

app.get('/', (req, reply) => {
    reply.view('pages/home');
});

app.get('/about-us', (req, reply) => {
    reply.view('pages/about-us');
});

app.get('/items', (req, reply) => {
    connection.query("SELECT * FROM items", (err, data, fields) => {
        if (err) {
            console.log(err);
        }

        reply.view('items/index', {
            title: 'Items',
            items: data,
        });
    });
});

app.get('/items/:id/show', (req, reply) => {
    connection.query("SELECT * FROM items WHERE id=?", [req.params.id],
        (err, data, fields) => {
            if (err) {
                console.log(err);
            }

            reply.view('items/show', {
                item: data[0],
            });
        });
});

app.post('/items/store', (req, reply) => {
    connection.query(
        "INSERT INTO items (title, image) VALUES (?, ?)",
        [[req.body.title], [req.body.image]],
        (err, data, fields) => {
            if (err) {
                console.log(err);
            }

            reply.redirect('/items');
        }
    );
});
