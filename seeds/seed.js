//this is to test the database
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");
/*Dans la racine de votre projet, créer le fichier “seeds/seed.js”. Ce fichier nous permettra lorsqu’il sera exécuté (> node ./seeds/seed.js) de créer en utilisant la bibliothèque “Faker” des données de tests. Vous devez créer :
10 utilisateurs ayant le rôle “AUTHOR”
1 utilisateur ayant le rôle “ADMIN”
10 catégories
100 articles appartenant à (de 1 à 4 catégories aléatoires) et écrit par l’un des 10 utilisateurs (AUTHOR)
Pour chaque article, créer de 0 à 20 commentaires)
Nota : l’exécution du fichier seed.js devra d’abord effacer le contenu de la base de données avant de créer les nouvelles données.
*/

//we need to indicate the role of the user which defined in the prisma like this   role        Role          @default(author)
//we need to import the Role from the prisma/client
const { Role } = require("@prisma/client");

async function seed() {
  await prisma.article.deleteMany();
  //create 100 articles
  for (let i = 0; i < 100; i++) {
    await prisma.article.create({
      data: {
        // idarticle: i + 1,
        title: faker.commerce.productName(),
        content: faker.lorem.paragraph(),
        image: faker.image.url(),
        // we need to know from which number the iduser start to have the ability to make a range between the start and the end of the iduser
        iduser: faker.number.int({ min: 1, max: 10 }),
        // we have a relation many to many between the article and the categorie so we need to add the categorie to the article
        articleCategorie: {
          create: [
            {
              categorie: {
                connect: {
                  idcategorie: faker.number.int({ min: 1, max: 10 }),
                },
              },
            },
          ],
        },
      },
    });
  }
}
seed().catch((e) => {
  throw e;
});
