const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

// Путь к директории файлов ресурсов (css, js, images)
app.use(express.static("public"));

// Настройка шаблонизатора
app.set("view engine", "ejs");

// Путь к директории файлов отображения контента
app.set("views", path.join(__dirname, "views"));

// Обработка POST-запросов из форм
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Запуск веб-сервера по адресу http://localhost:3000
app.listen(3000);

/**
 * Маршруты
 */
app.get("/", async (req, res) => {
    const items = await prisma.items.findMany();

    res.render("home", {
        items: items,
    });
});

app.post("/store", async (req, res) => {
    const { title, image } = req.body;

    await prisma.items.create({
        data: {
            title,
            image
        }
    });

    res.redirect("/");
});

app.get("/add", (req, res) => {
    res.render("add");
});
