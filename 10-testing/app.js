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

app.get('/locations', (req, reply) => {
    prisma.location.findMany().then(result => {
        reply.view('locations/index', {
            title: 'Locations',
            items: result,
        });
    }).catch(err => {
        reply.send({ success: false });
    });
});

app.post('/locations/store', (req, reply) => {
    const { title, description } = req.body;

    prisma.location.create({
        data: {
            title,
            description,
        }
    }).then(() => {
        reply.redirect('/locations');
    }).catch(err => {
        reply.send({ success: false });
    });
});

app.get('/items', (req, reply) => {
    prisma.item.findMany({
        include: {
            location: true,
        }
    }).then(result => {
        reply.view('items/index', {
            title: 'Items',
            items: result,
        });
    }).catch(error => {
        reply.redirect('/');
    });
});

app.get('/items/:id/show', (req, reply) => {
    prisma.item.findFirst({
        where: {
            id: Number(req.params.id),
        }
    }).then(item => {
        prisma.location.findMany().then(locations => {
            reply.view('items/show', {
                item: item,
                locations: locations,
            });
        });
    }).catch(error => {
        reply.send({ success: false });
    });
});

app.post('/items/store', (req, reply) => {
    const { title, image, description } = req.body;

    prisma.item.create({
        data: {
            title,
            image,
            description,
        }
    }).then(() => {
        reply.redirect('/items');
    }).catch(err => {
        reply.send({ success: false });
    });
});

app.post('/items/:id/update', (req, reply) => {
    prisma.item.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            location_id: Number(req.body.location),
        }
    }).then(() => {
        reply.redirect('/items');
    }).catch((e) => {
        reply.send({ success: false });
    });
});
