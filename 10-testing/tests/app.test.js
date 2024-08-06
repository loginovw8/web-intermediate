import dotenv from 'dotenv';
import axios from 'axios';
import { faker } from "@faker-js/faker";

dotenv.config();

const host = `http://localhost:${process.env.PORT}`;

test('home page can be rendered', async () => {
    const response = await axios.get(`${host}/`);
    expect(response.status).toBe(200);
});

test('about us page can be rendered', async () => {
    const response = await axios.get(`${host}/about-us`);
    expect(response.status).toBe(200);
});

test('items page can be rendered', async () => {
    const response = await axios.get(`${host}/items`);
    expect(response.status).toBe(200);
});

test('item can be created', async () => {
    const response = await axios.post(`${host}/items/store`, {
        title: faker.word.noun(),
        image: `nature${Math.floor(Math.random() * 5 + 1)}.jpeg`,
    });
    expect(response.status).toBe(200);
    expect(response.data.error).toBe(undefined);
});

test('item page can be rendered', async () => {
    const response = await axios.get(`${host}/items/1/show`);
    expect(response.status).toBe(200);
});
