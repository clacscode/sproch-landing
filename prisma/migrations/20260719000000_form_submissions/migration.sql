-- AlterTable
ALTER TABLE `ContactMessage` ADD COLUMN `inquiryType` VARCHAR(40) NULL;

-- CreateTable
CREATE TABLE `MembershipApplication` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(160) NOT NULL,
    `rut` VARCHAR(20) NOT NULL,
    `birthDate` VARCHAR(20) NULL,
    `email` VARCHAR(160) NOT NULL,
    `phone` VARCHAR(40) NOT NULL,
    `addressPersonal` VARCHAR(200) NULL,
    `degreeDate` VARCHAR(20) NULL,
    `addressProfessional` VARCHAR(200) NULL,
    `phoneProfessional` VARCHAR(40) NULL,
    `universityStudies` TEXT NULL,
    `postgrad` TEXT NULL,
    `scholarships` TEXT NULL,
    `teaching` TEXT NULL,
    `societies` TEXT NULL,
    `professionalRoles` TEXT NULL,
    `guildRoles` TEXT NULL,
    `scientificWork` TEXT NULL,
    `languages` VARCHAR(300) NULL,
    `sponsor` VARCHAR(160) NULL,
    `resolved` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NewsletterSubscriber` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(160) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `NewsletterSubscriber_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

