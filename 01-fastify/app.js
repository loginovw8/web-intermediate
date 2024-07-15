import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import formbody from '@fastify/formbody'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import ejs from 'ejs';
import fs from 'fs';

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

app.get('/', (req, reply) => {
    reply.view('pages/home');
});

app.get('/about-us', (req, reply) => {
    reply.view('pages/about-us');
});

app.get('/items', (req, reply) => {
    let fileContent = fs.readFileSync('./items.json', 'utf8');
    let data = JSON.parse(fileContent);

    reply.view('items/index', {
        title: 'Items',
        items: data,
    });
});

app.get('/items/:id/show', (req, reply) => {
    let fileContent = fs.readFileSync('./items.json', 'utf8');
    let data = JSON.parse(fileContent);

    let item = data.find(item => item.id === Number(req.params.id));

    reply.view('items/show', {
        item: item,
    });
});

app.post('/items/message', (req, reply) => {
    console.log(`Полученное сообщение: ${req.body.message}`);

    reply.redirect('/items');
});

app.listen({ port: 8080 });
