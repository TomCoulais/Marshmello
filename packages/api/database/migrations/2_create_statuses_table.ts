import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'statuses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uuid').notNullable().unique()
      table.string('name').notNullable()
      table.integer('project_id').unsigned().notNullable()
      table.integer('order').unsigned().notNullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
      table.foreign('project_id').references('projects.id').onDelete('cascade')
      table.unique(['project_id', 'order'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

