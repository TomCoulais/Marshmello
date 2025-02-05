import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.uuid('uuid').notNullable().unique()
      table.string('name').notNullable()
      table.integer('user_id').notNullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())

      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
