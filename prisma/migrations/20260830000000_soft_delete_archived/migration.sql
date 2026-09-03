-- Soft delete: el contenido autogestionado nunca se borra, solo se archiva.
-- archivedAt NULL = activo; con fecha = archivado (fuera del sitio, recuperable).

-- AlterTable
ALTER TABLE `News` ADD COLUMN `archivedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Event` ADD COLUMN `archivedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `ContactMessage` ADD COLUMN `archivedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `MembershipApplication` ADD COLUMN `archivedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `NewsletterSubscriber` ADD COLUMN `archivedAt` DATETIME(3) NULL;
