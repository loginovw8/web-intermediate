# ORM. Связи между таблицами базы данных

Пример схемы проекта

    model Item {
        id          Int       @id @default(autoincrement())
        title       String    @db.VarChar(255)
        image       String    @db.VarChar(255)
        created_at  DateTime  @default(now())
        updated_at  DateTime  @default(now())

        location    Location  @relation(fields: [location_id], references: [id])
        location_id Int
        categories  ItemRelCategory[]

        @@map("items")
    }

    model Location {
        id          Int      @id @default(autoincrement())
        title       String   @db.VarChar(255)
        description String   @db.VarChar(255)
        created_at  DateTime @default(now())
        updated_at  DateTime @default(now())

        items Item[]

        @@map("locations")
    }

    model Category {
        id         Int      @id @default(autoincrement())
        title      String   @db.VarChar(255)
        created_at DateTime @default(now())
        updated_at DateTime @default(now())

        items      ItemRelCategory[]

        @@map("categories")
    }

    model ItemRelCategory {
        item        Item @relation(fields: [item_id], references: [id])
        item_id     Int
        category    Category @relation(fields: [category_id], references: [id])
        category_id Int

        @@id([item_id, category_id])
        @@map("item_category")
    }

## Seeding

Seeding (засеивание) - это процесс заполнения БД набором данных.

Скрипт для выполнения

    npx prisma db seed
