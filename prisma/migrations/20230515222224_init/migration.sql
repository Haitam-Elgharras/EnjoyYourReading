-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `article_iduser_fkey`;

-- AlterTable
ALTER TABLE `article` MODIFY `iduser` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_iduser_fkey` FOREIGN KEY (`iduser`) REFERENCES `user`(`iduser`) ON DELETE SET NULL ON UPDATE CASCADE;
