# Связи между таблицами базы данных

## Один к одному

У одного пользователя (стоблец id имеет PRIMARY KEY - следовательно, значение
уникально) может быть только одно имя

    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    users
    +----+----------+
    | id | name     |
    +----+----------+
    | 1  | Иван     |
    | 2  | Андрей   |
    | 3  | Юлия     |
    +----+----------+

## Один ко многим

У многих пользоватей может быть только один документ

    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        doc_id INT
    );

    CREATE TABLE documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    users                       documents
    +----+----------+--------+  +----+----------+
    | id | name     | doc_id |  | id | name     |
    +----+----------+--------+  +----+----------+
    | 1  | Иван     | 1      |  | 1  | Паспорт  |
    | 2  | Андрей   | 2      |  | 2  | СНИЛС    |
    | 3  | Юлия     | 2      |  +----+----------+
    +----+----------+--------+

## Многие ко многим

У многих пользователей может быть только много документов

    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE user_document (
        user_id INT,
        document_id INT
    );

    users            user_document         documents
    +----+--------+  +---------+--------+  +----+----------+
    | id | name   |  | user_id | doc_id |  | id | name     |
    +----+--------+  +---------+--------+  +----+----------+
    | 1  | Иван   |  | 1       | 1      |  | 1  | Паспорт  |
    | 2  | Андрей |  | 2       | 1      |  | 2  | СНИЛС    |
    | 3  | Юлия   |  | 2       | 2      |  +----+----------+
    +----+--------+  | 3       | 1      |
                     | 3       | 2      |
                     +---------+--------+

Получение данных о документах определенного пользователя. Конструкция WHERE
column IN

    SELECT * FROM documents WHERE id IN (
        SELECT doc_id WHERE user_id=1
    );

## Индексы

Простыми словами индекс, создается на поле в таблице по которому происходит
поиск. Тем самым ускоряя скорость поиска в разы.

Пример таблицы:

    CREATE TABLE clients (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(50),
        phone VARCHAR(12)
    );

Поле id - уже имеет индекс в качестве первичного ключа.

Если вам нужен поиск по имени полю "name", такого типа:

    SELECT * FROM clients WHERE name = "Иван";

Тогда есть смысл добавить индекс по данному полю "name", что значительно
ускорит выборку.

SQL запрос создания индекса:

    CREATE INDEX my_index_name ON clients (name) USING BTREE;

Просмотр индексов у таблицы:

    SHOW INDEX FROM <table>;

Описание некоторых столбцов таблицы индексов:

-   Seq_in_index - позиция столбца в индексе
-   Collation - набор правил для сравнения символов
-   Cardinality - уникальность содержимого конктретной колонки. Чем меньше
    значения параметра, тем больше дубликатов в конечной выборке
-   Sub_part - префикс индекса. Если значение равно null, то весь столбец
    проиндексирован
-   Packed - используется для исключения общих префиксов в строковых ключах
    (В таблице, в которой хранятся URL-адреса, для MySQL было бы пустой тратой
    дискового пространства хранить «http://» в каждом узле B-дерева)
-   Expression - поддержка функциональных ключевых частей

## Типы данных

DECIMAL

Кол-во знаков и кол-во знаков после запятой

    DECIMAL(13, 2)

Date

Формат 2022-12-31

    Date

## Foreign Key

    CREATE TABLE parent (
        id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    );

    CREATE TABLE child (
        id INT,
        parent_id INT,
        INDEX par_ind (parent_id),
        FOREIGN KEY (parent_id)
            REFERENCES parent(id)
            ON DELETE CASCADE
    );

## LEFT JOIN

    CREATE TABLE items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255),
        category_id INT
    );

    CREATE TABLE categories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255)
    );

    SELECT items.id, items.name, categories.name AS category_name
    FROM items
    LEFT JOIN categories ON items.category_id = categories.id;
