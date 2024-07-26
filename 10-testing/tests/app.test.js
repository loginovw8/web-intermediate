import dotenv from 'dotenv';
import axios from 'axios';
import { faker } from "@faker-js/faker";

dotenv.config();

const host = `http://localhost:${process.env.PORT}`;

test('home page can be rendered', async () => {
    const response = await axios.get(`${host}/`);
    expect(response.status).toBe(200);
});

test('items page can be rendered', async () => {
    const response = await axios.get(`${host}/items`);
    expect(response.status).toBe(200);
});

test('item can be created', async () => {
    const response = await axios.post(`${host}/items/store`, {
        title: faker.word.noun(),
        description: faker.word.noun(),
        image: faker.word.noun(),
    });
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(undefined);
});

test('item page can be rendered', async () => {
    const response = await axios.get(`${host}/items/1/show`);
    expect(response.status).toBe(200);
});

test('item can be updated', async () => {
    const response = await axios.post(`${host}/items/1/update`, {
        location: 1,
    });
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(undefined);
});

test('locations page can be rendered', async () => {
    const response = await axios.get(`${host}/locations`);
    expect(response.status).toBe(200);
});

test('location can be created', async () => {
    const response = await axios.post(`${host}/locations/store`, {
        title: faker.word.noun(),
        description: faker.word.noun(),
    });
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(undefined);
});
