import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import formbody from '@fastify/formbody'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import ejs from 'ejs';
import fs from 'fs';
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

app.get('/', (req, reply) => {
    reply.view('pages/home');
});

app.get('/api/items', (req, reply) => {
    let fileContent = fs.readFileSync('./items.json', 'utf8');
    let data = JSON.parse(fileContent);

    reply.send(data);
});

app.post('/api/target', (req, reply) => {
    console.log(req.body.message);

    reply.send();
});

app.listen({ port: process.env.PORT });
