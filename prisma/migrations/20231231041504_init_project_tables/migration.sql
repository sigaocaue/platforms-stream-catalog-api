-- CreateTable
CREATE TABLE `Person` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `pseudonym` VARCHAR(191) NULL,
    `birthDate` DATETIME(3) NULL,
    `nationality` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StreamingPlatform` (
    `name` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentType` (
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContributionRole` (
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Content` (
    `id` VARCHAR(191) NOT NULL,
    `contentTypeName` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `releaseDate` DATETIME(3) NULL,
    `imdbRating` DOUBLE NULL,
    `duration` INTEGER NULL,
    `storyline` VARCHAR(191) NULL,

    UNIQUE INDEX `Content_contentTypeName_title_releaseDate_key`(`contentTypeName`, `title`, `releaseDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentAvailability` (
    `streamingPlatformId` VARCHAR(191) NOT NULL,
    `contentId` VARCHAR(191) NOT NULL,
    `entryDate` DATETIME(3) NOT NULL,
    `exitDate` DATETIME(3) NULL,

    UNIQUE INDEX `ContentAvailability_streamingPlatformId_contentId_exitDate_key`(`streamingPlatformId`, `contentId`, `exitDate`),
    PRIMARY KEY (`streamingPlatformId`, `contentId`, `entryDate`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentTitle` (
    `contentId` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `localTitle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`contentId`, `country`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentContribution` (
    `contentId` VARCHAR(191) NOT NULL,
    `personId` VARCHAR(191) NOT NULL,
    `contributionRoleName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`contentId`, `personId`, `contributionRoleName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_contentTypeName_fkey` FOREIGN KEY (`contentTypeName`) REFERENCES `ContentType`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentAvailability` ADD CONSTRAINT `ContentAvailability_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentAvailability` ADD CONSTRAINT `ContentAvailability_streamingPlatformId_fkey` FOREIGN KEY (`streamingPlatformId`) REFERENCES `StreamingPlatform`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentTitle` ADD CONSTRAINT `ContentTitle_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `Content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentContribution` ADD CONSTRAINT `ContentContribution_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentContribution` ADD CONSTRAINT `ContentContribution_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentContribution` ADD CONSTRAINT `ContentContribution_contributionRoleName_fkey` FOREIGN KEY (`contributionRoleName`) REFERENCES `ContributionRole`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
