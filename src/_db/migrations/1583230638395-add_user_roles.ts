import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUserRoles1583230638395 implements MigrationInterface {
  name = 'addUserRoles1583230638395'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "roles" text array NOT NULL DEFAULT ARRAY['user']::text[]`,
      undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`, undefined)
  }
}
