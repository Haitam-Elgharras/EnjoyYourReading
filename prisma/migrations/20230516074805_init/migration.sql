/*
  Warnings:

  - Made the column `iduser` on table `article` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `article_iduser_fkey`;

-- AlterTable
ALTER TABLE `article` MODIFY `iduser` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_iduser_fkey` FOREIGN KEY (`iduser`) REFERENCES `user`(`iduser`) ON DELETE RESTRICT ON UPDATE CASCADE;
