# ORM

ORM (Object Relational-Mapping) - технология программирования, которая связывает
базы данных с концепциями объектно-ориентированных языков программирования,
создавая «виртуальную объектную базу данных».

## Пример работы с ORM Prisma

Документация ORM Prisma

    https://www.prisma.io/docs

Установка ORM Prisma в проект

    npx prisma init

Определите схему проекта в файле prisma/schema.prisma

    model Item {
        id          Int       @id @default(autoincrement())
        title       String    @db.VarChar(255)
        image       String    @db.VarChar(255)
        created_at  DateTime  @default(now())
        updated_at  DateTime  @default(now())

        @@map("items")
    }

Создайте миграции БД на основе схемы schema.prisma

    npx prisma migrate dev 

Создание новой миграции 

    npx prisma migrate dev --name add-description

Удалить все данные из БД и создать заново

    npx prisma migrate reset

Статус ORM

    npx prisma migrate status

Применить ожидающие миграции и создать БД если она еще не создана

    npx prisma migrate deploy
