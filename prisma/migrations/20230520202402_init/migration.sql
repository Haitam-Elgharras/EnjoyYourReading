-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'author');

-- CreateTable
CREATE TABLE "user" (
    "iduser" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'author',

    CONSTRAINT "user_pkey" PRIMARY KEY ("iduser")
);

-- CreateTable
CREATE TABLE "article" (
    "idarticle" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "iduser" INTEGER NOT NULL,

    CONSTRAINT "article_pkey" PRIMARY KEY ("idarticle")
);

-- CreateTable
CREATE TABLE "categorie" (
    "idcategorie" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "categorie_pkey" PRIMARY KEY ("idcategorie")
);

-- CreateTable
CREATE TABLE "articleCategorie" (
    "idarticleCategorie" SERIAL NOT NULL,
    "idarticle" INTEGER NOT NULL,
    "idcategorie" INTEGER NOT NULL,

    CONSTRAINT "articleCategorie_pkey" PRIMARY KEY ("idarticleCategorie")
);

-- CreateTable
CREATE TABLE "commentaire" (
    "idcommentaire" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "idarticle" INTEGER NOT NULL,
    "iduser" INTEGER NOT NULL,

    CONSTRAINT "commentaire_pkey" PRIMARY KEY ("idcommentaire")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "user"("iduser") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articleCategorie" ADD CONSTRAINT "articleCategorie_idarticle_fkey" FOREIGN KEY ("idarticle") REFERENCES "article"("idarticle") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articleCategorie" ADD CONSTRAINT "articleCategorie_idcategorie_fkey" FOREIGN KEY ("idcategorie") REFERENCES "categorie"("idcategorie") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentaire" ADD CONSTRAINT "commentaire_idarticle_fkey" FOREIGN KEY ("idarticle") REFERENCES "article"("idarticle") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentaire" ADD CONSTRAINT "commentaire_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "user"("iduser") ON DELETE CASCADE ON UPDATE CASCADE;
