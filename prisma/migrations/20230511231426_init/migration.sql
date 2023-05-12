-- CreateTable
CREATE TABLE `user` (
    `iduser` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `role` ENUM('admin', 'author') NOT NULL DEFAULT 'author',

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`iduser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `article` (
    `idarticle` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `published` BOOLEAN NOT NULL,
    `iduser` INTEGER NOT NULL,

    PRIMARY KEY (`idarticle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorie` (
    `idcategorie` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idcategorie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articleCategorie` (
    `idarticleCategorie` INTEGER NOT NULL AUTO_INCREMENT,
    `idarticle` INTEGER NOT NULL,
    `idcategorie` INTEGER NOT NULL,

    PRIMARY KEY (`idarticleCategorie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commentaire` (
    `idcommentaire` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `contenu` VARCHAR(191) NOT NULL,
    `idarticle` INTEGER NOT NULL,
    `iduser` INTEGER NOT NULL,

    PRIMARY KEY (`idcommentaire`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_iduser_fkey` FOREIGN KEY (`iduser`) REFERENCES `user`(`iduser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articleCategorie` ADD CONSTRAINT `articleCategorie_idarticle_fkey` FOREIGN KEY (`idarticle`) REFERENCES `article`(`idarticle`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articleCategorie` ADD CONSTRAINT `articleCategorie_idcategorie_fkey` FOREIGN KEY (`idcategorie`) REFERENCES `categorie`(`idcategorie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commentaire` ADD CONSTRAINT `commentaire_idarticle_fkey` FOREIGN KEY (`idarticle`) REFERENCES `article`(`idarticle`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commentaire` ADD CONSTRAINT `commentaire_iduser_fkey` FOREIGN KEY (`iduser`) REFERENCES `user`(`iduser`) ON DELETE RESTRICT ON UPDATE CASCADE;
