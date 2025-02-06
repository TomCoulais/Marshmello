import { BaseModel, belongsTo, column, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v7 } from 'uuid'

import Project from '#models/project'
import Status from '#models/status'
import Tag from '#models/tag'

export default class Todo extends BaseModel {
  static table = 'todos';

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare completed: boolean;

  @column()
  declare statusId: number | null

  @column()
  declare projectId: number

  @column()
  declare tagId: number | null

  @belongsTo(() => Tag)
  declare tag: BelongsTo<typeof Tag>

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @belongsTo(() => Status)
  declare status: BelongsTo<typeof Status>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async assignUuid(todo: Todo) {
    todo.uuid = v7();
  }
}
