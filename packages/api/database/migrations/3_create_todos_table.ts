import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Migration extends BaseSchema {
  protected tableName = 'todos'

  // eslint-disable-next-line @typescript-eslint/require-await
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.uuid('uuid').notNullable().unique()
      table.string('name').nullable()
      table.text('description').nullable()
      table.boolean('completed').notNullable().defaultTo(false)

      table.integer('project_id').notNullable()
      table.integer('status_id').nullable().defaultTo(null)
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())

      table.foreign('status_id').references('statuses.id').onDelete('set null')
      table.foreign('project_id').references('projects.id').onDelete('cascade')
    })
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
