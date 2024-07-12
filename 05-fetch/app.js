import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
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

    reply.redirect('/');
});

try {
    app.listen({ port: 8080 });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
