/*
  Warnings:

  - You are about to alter the column `content` on the `article` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - Added the required column `cover` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `cover` VARCHAR(191) NOT NULL,
    MODIFY `content` JSON NOT NULL;
