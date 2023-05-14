const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//seed.js is a file that we use to generate fake data to test our application
//we use faker to generate fake data
//we use seed.js to generate fake data to test our application

// const { faker } = require("@faker-js/faker");
// or
const faker = require("faker");

//the commande to run the seed is node seeds/seed.js

async function generateUsers() {
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "author",
      },
    });
  }

  await prisma.user.create({
    data: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: "admin",
    },
  });
}

async function generateCategories() {
  for (let i = 0; i < 10; i++) {
    await prisma.categorie.create({
      data: {
        nom: faker.lorem.word(),
      },
    });
  }
}

async function generateArticles() {
  const users = await prisma.user.findMany();

  for (let i = 0; i < 100; i++) {
    const randomUser = faker.random.arrayElement(users);

    const article = await prisma.article.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        image: faker.image.imageUrl(),
        published: faker.random.boolean(),
        user: {
          connect: { iduser: randomUser.iduser },
        },
        articleCategorie: {
          createMany: {
            data: getRandomCategories(),
          },
        },
      },
    });

    await generateComments(article, randomUser);
  }
}

async function generateComments(article, user) {
  const numComments = faker.random.number({ min: 0, max: 20 });

  for (let i = 0; i < numComments; i++) {
    await prisma.commentaire.create({
      data: {
        email: faker.internet.email(),
        contenu: faker.lorem.paragraph(),
        article: {
          connect: { idarticle: article.idarticle },
        },
        user: {
          connect: { iduser: user.iduser },
        },
      },
    });
  }
}

function getRandomCategories() {
  const numCategories = faker.random.number({ min: 1, max: 4 });
  const categories = [];

  for (let i = 0; i < numCategories; i++) {
    categories.push({
      categorie: {
        connect: { idcategorie: faker.random.number({ min: 1, max: 10 }) },
      },
    });
  }

  return categories;
}

async function runSeed() {
  try {
    await prisma.$connect();

    // Clear existing data from the database
    await prisma.$executeRaw("DELETE FROM commentaire");
    await prisma.$executeRaw("DELETE FROM articleCategorie");
    await prisma.$executeRaw("DELETE FROM categorie");
    await prisma.$executeRaw("DELETE FROM user");

    await generateUsers();
    await generateCategories();
    await generateArticles();
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

runSeed();
