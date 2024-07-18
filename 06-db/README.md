# Введение в системы управления базами данных

СУБД — комплекс программ, позволяющих создать базу данных (БД) и манипулировать
данными (вставлять, обновлять, удалять и выбирать). Система обеспечивает
безопасность, надёжность хранения и целостность данных, а также предоставляет
средства для администрирования БД.

## СУБД MySQL

    https://www.mysql.com/

## SQL

SQL (аббр. от англ. Structured Query Language — «язык структурированных
запросов») — декларативный язык программирования, применяемый для создания,
модификации и управления данными в реляционной базе данных, управляемой
соответствующей системой управления базами данных.

Просмотр листинга баз данных

    SHOW DATABASES;

Пример создания базы данных

    CREATE DATABASE nature;

Подключить базу данных

    USE nature;

Просмотр листинга таблиц БД

    SHOW TABLES;

Пример создания таблицы в БД

    CREATE TABLE items (id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255), image VARCHAR(255));

Пример изменения типа столбца в таблице

    ALTER TABLE items MODIFY COLUMN description VARCHAR(3200);

Пример добавления столбца в таблице

    ALTER TABLE items ADD description VARCHAR(255) AFTER image;

Пример удаления столбца в таблице

    ALTER TABLE items DROP COLUMN description;

Просмотр структуры таблицы БД

    DESCRIBE items;

Выборка данных

    SELECT * FROM nature;

Пример выборки данных с условием

    SELECT * FROM nature WHERE id=2;

Пример записи данных в БД

    INSERT INTO nature (title, image) VALUES ('Природа', 'nature.jpeg');

Пример обновления записи в БД

    UPDATE nature SET title='Природа 2' WHERE id=2;

Пример удаления записи из БД

    DELETE FROM nature WHERE id=2;

Удаление БД

    DROP DATABASE nature;

Удаление таблицы в БД

    DROP TABLE items;

## Пример запроса выборки записей из таблицы БД с ограничением по количеству выборки и индексом смещения

Рассмотрим пример таблицы:

    +----+----------+--------------+
    | id | title    | image        |
    +----+----------+--------------+
    | 1  | Nature 1 | nature1.jpeg |
    | 2  | Nature 2 | nature2.jpeg |
    | 3  | Nature 3 | nature3.jpeg |
    | 4  | Nature 4 | nature4.jpeg |
    | 5  | Nature 5 | nature5.jpeg |
    | 6  | Nature 6 | nature6.jpeg |
    | 7  | Nature 7 | nature7.jpeg |
    | 8  | Nature 8 | nature8.jpeg |
    | 9  | Nature 9 | nature9.jpeg |
    +----+----------+--------------+

Нижеприведенный запрос выведет 4 записи, пропустив первые 2 элемента

    SELECT * FROM items LIMIT 4 OFFSET 2

Полученный результат:

    +----+----------+--------------+
    | id | title    | image        |
    +----+----------+--------------+
    | 3  | Nature 3 | nature3.jpeg |
    | 4  | Nature 4 | nature4.jpeg |
    | 5  | Nature 5 | nature5.jpeg |
    | 6  | Nature 6 | nature6.jpeg |
    +----+----------+--------------+

## Упражнения

-   Внедрите функционал удаления сущности item
-   Внедрите функционал редактирования сущности item
-   Внедрите пагинацию
