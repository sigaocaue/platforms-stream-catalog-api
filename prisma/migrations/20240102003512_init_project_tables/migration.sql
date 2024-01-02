-- CreateTable
CREATE TABLE `persons` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `pseudonym` VARCHAR(191) NULL,
    `birth_date` DATETIME(3) NULL,
    `nationality` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `streaming_platforms` (
    `name` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content_types` (
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contribution_roles` (
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `streaming_content` (
    `id` VARCHAR(191) NOT NULL,
    `content_type_name` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `release_date` DATETIME(3) NULL,
    `imdb_rating` DOUBLE NULL,
    `duration` INTEGER NULL,
    `storyline` TEXT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `streaming_content_content_type_name_title_release_date_key`(`content_type_name`, `title`, `release_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content_availabilities` (
    `id` VARCHAR(191) NOT NULL,
    `streaming_platform_id` VARCHAR(191) NOT NULL,
    `content_id` VARCHAR(191) NOT NULL,
    `entry_date` DATETIME(3) NOT NULL,
    `exit_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `content_availabilities_streaming_platform_id_content_id_exit_key`(`streaming_platform_id`, `content_id`, `exit_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `foreign_content_title` (
    `id` VARCHAR(191) NOT NULL,
    `streaming_content_id` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `local_title` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `foreign_content_title_streaming_content_id_country_key`(`streaming_content_id`, `country`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content_contributions` (
    `id` VARCHAR(191) NOT NULL,
    `streaming_content_id` VARCHAR(191) NOT NULL,
    `person_id` VARCHAR(191) NOT NULL,
    `contribution_role_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `content_contributions_streaming_content_id_person_id_contrib_key`(`streaming_content_id`, `person_id`, `contribution_role_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `streaming_content` ADD CONSTRAINT `streaming_content_content_type_name_fkey` FOREIGN KEY (`content_type_name`) REFERENCES `content_types`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content_availabilities` ADD CONSTRAINT `content_availabilities_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `streaming_content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content_availabilities` ADD CONSTRAINT `content_availabilities_streaming_platform_id_fkey` FOREIGN KEY (`streaming_platform_id`) REFERENCES `streaming_platforms`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `foreign_content_title` ADD CONSTRAINT `foreign_content_title_streaming_content_id_fkey` FOREIGN KEY (`streaming_content_id`) REFERENCES `streaming_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content_contributions` ADD CONSTRAINT `content_contributions_streaming_content_id_fkey` FOREIGN KEY (`streaming_content_id`) REFERENCES `streaming_content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content_contributions` ADD CONSTRAINT `content_contributions_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content_contributions` ADD CONSTRAINT `content_contributions_contribution_role_name_fkey` FOREIGN KEY (`contribution_role_name`) REFERENCES `contribution_roles`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
