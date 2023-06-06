const express = require("express");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

// Обработка POST-запросов из форм
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Запуск веб-сервера по адресу http://localhost:8080
app.listen(8080);

/**
 * Маршруты
 */
app.get("/", async (req, res) => {
  const items = await prisma.items.findMany();

  res.status(200).send(items);
});

app.post("/store", async (req, res) => {
  const { title, image } = req.body;
  await prisma.items.create({
    data: {
      title,
      image
    }
  });

  res.status(201).send();
});
