const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const c115 = await prisma.book.upsert({
    where: {
      code: "c-115",
    },
    update: {},
    create: {
      code: "c-115",
      title: "Book 1",
      author: "Asgard",
      stock: 1,
    },
  });

  const c116 = await prisma.book.upsert({
    where: {
      code: "c-116",
    },
    update: {},
    create: {
      code: "c-116",
      title: "Book 2",
      author: "Envia",
      stock: 1,
    },
  });

  const c117 = await prisma.book.upsert({
    where: {
      code: "c-117",
    },
    update: {},
    create: {
      code: "c-117",
      title: "Book 3",
      author: "Rani",
      stock: 1,
    },
  });

  const c118 = await prisma.book.upsert({
    where: {
      code: "c-118",
    },
    update: {},
    create: {
      code: "c-118",
      title: "Book 4",
      author: "Lisya",
      stock: 1,
    },
  });

  const c119 = await prisma.book.upsert({
    where: {
      code: "c-119",
    },
    update: {},
    create: {
      code: "c-119",
      title: "Book 5",
      author: "Navia",
      stock: 1,
    },
  });

  const c100 = await prisma.member.upsert({
    where: {
      code: "c-100",
    },
    update: {},
    create: {
      code: "c-100",
      name: "Reigen",
    },
  });

  const c101 = await prisma.member.upsert({
    where: {
      code: "c-101",
    },
    update: {},
    create: {
      code: "c-101",
      name: "Garen",
    },
  });

  const c102 = await prisma.member.upsert({
    where: {
      code: "c-102",
    },
    update: {},
    create: {
      code: "c-102",
      name: "Rostgard",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
