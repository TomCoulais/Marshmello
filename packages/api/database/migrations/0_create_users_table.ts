import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Migration extends BaseSchema {
  protected tableName = 'users'

  // eslint-disable-next-line @typescript-eslint/require-await
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.uuid('uuid').notNullable().unique()
      table.string('username', 50).notNullable().unique()
      table.string('password').notNullable()

      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
    })
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
