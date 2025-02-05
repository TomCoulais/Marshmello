import {BaseSchema} from '@adonisjs/lucid/schema'

export default class TagTodo extends BaseSchema {
  protected tableName = 'tags'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uuid').notNullable().unique()
      table.string('name').nullable()
      table.integer('todos_id').notNullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())
      table.foreign('todos_id').references('todos.id').onDelete('set null')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
