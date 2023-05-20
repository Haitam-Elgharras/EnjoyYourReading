const { PrismaClient } = require("@prisma/client");

async function setAutoIncrementStart() {
  const prisma = new PrismaClient();

  try {
    // Find the maximum existing iduser in the table
    const maxId = await prisma.user.findFirst({
      select: {
        iduser: true,
      },
      orderBy: {
        iduser: "desc",
      },
    });

    if (maxId) {
      // Alter the table and set the next auto-increment value
      await prisma.$queryRaw(
        `ALTER TABLE "user" AUTO_INCREMENT = ${maxId.iduser + 1}`
      );
    }

    console.log("Auto-increment start set successfully!");
  } catch (error) {
    console.error("Error setting auto-increment start:", error);
  } finally {
    await prisma.$disconnect();
  }
}

setAutoIncrementStart();
