import {MigrationInterface, QueryRunner} from "typeorm";

export class src/models/Appointment.ts1589252547922 implements MigrationInterface {
    name = 'src/models/Appointment.ts1589252547922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `appointments` DROP FOREIGN KEY `AppointmentProvider`", undefined);
        await queryRunner.query("DROP INDEX `UQ_97672ac88f789774dd47f7c8be3` ON `users`", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `avatar` `avatar` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `created_at`", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `updated_at`", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `appointments` CHANGE `provider_id` `provider_id` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `appointments` CHANGE `date` `date` timestamp NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `appointments` DROP COLUMN `created_at`", undefined);
        await queryRunner.query("ALTER TABLE `appointments` ADD `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `appointments` DROP COLUMN `updated_at`", undefined);
        await queryRunner.query("ALTER TABLE `appointments` ADD `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `appointments` ADD CONSTRAINT `FK_e3e268ed1125872144e68b9a41c` FOREIGN KEY (`provider_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `appointments` DROP FOREIGN KEY `FK_e3e268ed1125872144e68b9a41c`", undefined);
        await queryRunner.query("ALTER TABLE `appointments` DROP COLUMN `updated_at`", undefined);
        await queryRunner.query("ALTER TABLE `appointments` ADD `updated_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()", undefined);
        await queryRunner.query("ALTER TABLE `appointments` DROP COLUMN `created_at`", undefined);
        await queryRunner.query("ALTER TABLE `appointments` ADD `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()", undefined);
        await queryRunner.query("ALTER TABLE `appointments` CHANGE `date` `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()", undefined);
        await queryRunner.query("ALTER TABLE `appointments` CHANGE `provider_id` `provider_id` varchar(255) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `updated_at`", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `updated_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `created_at`", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `avatar` `avatar` varchar(255) NULL DEFAULT 'NULL'", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `UQ_97672ac88f789774dd47f7c8be3` ON `users` (`email`)", undefined);
        await queryRunner.query("ALTER TABLE `appointments` ADD CONSTRAINT `AppointmentProvider` FOREIGN KEY (`provider_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE", undefined);
    }

}
