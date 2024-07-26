import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import formbody from '@fastify/formbody'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import ejs from 'ejs';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

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

app.listen({ port: process.env.PORT });

app.get('/', (req, reply) => {
    reply.view('pages/home');
});

app.get('/about-us', (req, reply) => {
    reply.view('pages/about-us');
});

app.get('/items', (req, reply) => {
    const items = prisma.item.findMany();

    items.then(result => {
        reply.view('items/index', {
            title: 'Items',
            items: result,
        });
    });
});

app.get('/items/:id/show', (req, reply) => {
    const item = prisma.item.findFirst({
        where: {
            id: Number(req.params.id),
        }
    });

    item.then(result => {
        reply.view('items/show', {
            item: result,
        });
    });
});

app.post('/items/store', (req, reply) => {
    const item = prisma.item.create({
        data: {
            title: req.body.title,
            image: req.body.image,
        }
    });

    item.then(() => {
        reply.redirect('/items');
    });
});
