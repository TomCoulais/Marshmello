import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { v7 } from 'uuid'

import Todo from '#models/todo'

export default class Tag extends BaseModel {
  static table = 'tags';

  @column({ isPrimary: true })
  declare id: number

  @column({})
  declare uuid: string

  @column({})
  declare name: string

  @column({})
  declare todoId: number

  @hasMany(() => Todo)
  declare todo: HasMany<typeof Todo>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  constructor() {
    super()
    this.uuid = v7()
  }
}
