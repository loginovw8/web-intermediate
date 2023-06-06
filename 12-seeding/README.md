# Prisma seed

  const { PrismaClient } = require('@prisma/client')
  const prisma = new PrismaClient()

  async function main() {

  }

  main()
      .then(async () => {
          await prisma.$disconnect()
      })
      .catch(async (e) => {
          console.error(e)
          await prisma.$disconnect()
          process.exit(1)
      })

## Upsert

    const bob = await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
        email: 'bob@prisma.io',
        name: 'Bob',
        posts: {
            create: [
            {
                title: 'Follow Prisma on Twitter',
                content: 'https://twitter.com/prisma',
                published: true,
            },
            {
                title: 'Follow Nexus on Twitter',
                content: 'https://twitter.com/nexusgql',
                published: true,
            },
            ],
        },
        },
    })