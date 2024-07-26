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
    prisma.item.findMany({
        include: {
            location: true,
        }
    }).then(result => {
        const locations = result.map(i => {
            return {
                'id': i.location.id,
                'title': i.location.title,
            }
        });

        reply.view('items/index', {
            title: 'Items',
            items: result,
            locations: locations,
        });
    });
});

app.get('/items/:id/show', (req, reply) => {
    prisma.item.findFirst({
        where: {
            id: Number(req.params.id),
        },
        include: {
            location: true,
            categories: {
                include: {
                    category: true,
                }
            }
        }
    }).then(result => {
        reply.view('items/show', {
            item: result,
        });
    });
});

app.post('/items/store', (req, reply) => {
    const { title, image, location } = req.body;

    prisma.item.create({
        data: {
            title,
            image,
            location_id: Number(location),
        }
    }).then(() => {
        reply.redirect('/items');
    });
});

app.get('/example-m-n', async (req, res) => {
    await prisma.ItemRelCategory.create({
        data: {
            item_id: Number(2),
            category_id: Number(1),
        }
    });

    res.redirect("/");
});
