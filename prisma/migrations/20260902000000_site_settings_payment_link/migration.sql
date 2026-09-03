-- Ajustes del sitio editables desde el panel (fila única, id = "default").
-- Por ahora sólo el botón "Pago socios" del header.

-- CreateTable
CREATE TABLE `SiteSettings` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'default',
    `paymentEnabled` BOOLEAN NOT NULL DEFAULT false,
    `paymentLabel` VARCHAR(60) NULL,
    `paymentUrl` VARCHAR(512) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
