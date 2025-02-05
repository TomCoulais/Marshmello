import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { v7 } from 'uuid'

import Project from '#models/project'
import Todo from '#models/todo'

export default class Status extends BaseModel {
  static table = 'statuses';
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare name: string

  @column({ columnName: 'project_id' })
  declare projectId: number

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @column()
  declare order: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Todo)
  declare todos: HasMany<typeof Todo>

  constructor() {
    super();
    this.uuid = v7();
  }
}
