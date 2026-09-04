-- Fecha en que un mensaje/solicitud se marcó como respondido.
-- null = pendiente. Sirve para mostrar "Respondido el <fecha>" en el panel.
--
-- Idempotente (IF NOT EXISTS) por si la columna llegó a producción vía
-- `prisma db push` antes que esta migración, como pasó con SiteSettings.

-- AlterTable
ALTER TABLE `ContactMessage` ADD COLUMN IF NOT EXISTS `resolvedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `MembershipApplication` ADD COLUMN IF NOT EXISTS `resolvedAt` DATETIME(3) NULL;

-- Las filas ya marcadas como atendidas no tienen fecha real de respuesta;
-- les ponemos la de creación para no dejar el badge sin fecha.
UPDATE `ContactMessage` SET `resolvedAt` = `createdAt` WHERE `resolved` = 1 AND `resolvedAt` IS NULL;
UPDATE `MembershipApplication` SET `resolvedAt` = `createdAt` WHERE `resolved` = 1 AND `resolvedAt` IS NULL;
