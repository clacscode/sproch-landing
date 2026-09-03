-- Ajustes del sitio editables desde el panel (fila única, id = "default").
-- Por ahora sólo el botón "Pago socios" del header.
--
-- Idempotente a propósito: la tabla ya existía en producción sin quedar
-- registrada en _prisma_migrations, así que el CREATE simple abortaba el
-- deploy con "Table 'SiteSettings' already exists". Mismo patrón que el fix
-- de 20260719000000_form_submissions en el workflow db-diag.

-- CreateTable
CREATE TABLE IF NOT EXISTS `SiteSettings` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'default',
    `paymentEnabled` BOOLEAN NOT NULL DEFAULT false,
    `paymentLabel` VARCHAR(60) NULL,
    `paymentUrl` VARCHAR(512) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Por si la tabla preexistente quedó incompleta.
ALTER TABLE `SiteSettings`
    ADD COLUMN IF NOT EXISTS `paymentEnabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS `paymentLabel` VARCHAR(60) NULL,
    ADD COLUMN IF NOT EXISTS `paymentUrl` VARCHAR(512) NULL,
    ADD COLUMN IF NOT EXISTS `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
