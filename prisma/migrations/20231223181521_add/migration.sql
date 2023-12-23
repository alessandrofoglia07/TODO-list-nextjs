/*
  Warnings:

  - Added the required column `color` to the `List` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `List` ADD COLUMN `color` ENUM('RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE') NOT NULL;

-- AlterTable
ALTER TABLE `Tag` ADD COLUMN `color` ENUM('RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE') NOT NULL;

-- AlterTable
ALTER TABLE `Todo` ADD COLUMN `color` ENUM('RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE') NOT NULL;
