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
