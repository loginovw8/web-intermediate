# ORM

Set up a new Prisma project

    npx prisma init

Define Prisma schema

    model Item {
        id          Int       @id @default(autoincrement())
        title       String    @db.VarChar(255)
        image       String    @db.VarChar(255)
        created_at  DateTime  @default(now())
        updated_at  DateTime  @default(now())

        @@map("items")
    }

Create migrations from Prisma schema and apply them to the database

    npx prisma migrate dev 

Generate new migration and apply to the database

    npx prisma migrate dev --name add-description

Delete and recreate the database

    npx prisma migrate reset

Status

    npx prisma migrate status

Apply pending migrations and create the database if it does not exist

    npx prisma migrate deploy

https://github.com/prisma/prisma-examples/blob/latest/javascript/rest-express/src/index.js
