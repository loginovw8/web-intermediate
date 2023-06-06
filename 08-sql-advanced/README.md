# SQL

## Индексы

Простыми словами индекс, создается на поле в таблице по которому происходит поиск. Тем самым ускоряя скорость поиска в разы.

Пример таблицы:

    CREATE TABLE Clients (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(50),
        phone VARCHAR(12)
    )

Поле id - уже имеет индекс в качестве первичного ключа.

Если вам нужен поиск по имени полю "name", такого типа:

    SELECT * FROM `Clients` WHERE `name` = "Вася"

Тогда есть смысл добавить индекс по данному полю "name", что значительно ускорит выборку.

SQL запрос создания индекса:

    CREATE INDEX `my_index_name` ON `Clients` (`name`) USING BTREE;

Просмотр индексов у таблицы:

    SHOW INDEX FROM <table>;

Описание некоторых столбцов таблицы индексов:

* Seq_in_index - позиция столбца в индексе
* Collation - набор правил для сравнения символов
* Cardinality - уникальность содержимого конктретной колонки. Чем меньше значения параметра, тем больше дубликатов в конечной выборке
* Sub_part - префикс индекса. Если значение равно null, то весь столбец проиндексирован
* Packed - используется для исключения общих префиксов в строковых ключах (В таблице, в которой хранятся URL-адреса, для MySQL было бы пустой тратой дискового пространства хранить «http://» в каждом узле B-дерева)
* Expression - поддержка функциональных ключевых частей

## Типы данных

### DECIMAL

Кол-во знаков и кол-во знаков после запятой

    DECIMAL(13, 2)

### Date

Формат 2022-12-31

    Date

## Foreign Key

    CREATE TABLE parent (
        id INT NOT NULL,
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

## Запросы

### LEFT JOIN

    SELECT Customers.CustomerName, Orders.OrderID
    FROM Customers
    LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
    ORDER BY Customers.CustomerName;

### Date Between

    SELECT *
    FROM `objects`
    WHERE (date_field BETWEEN '2010-01-30' AND '2010-09-29');