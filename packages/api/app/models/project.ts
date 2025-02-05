import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { v7 } from 'uuid'

import User from '#models/user'
import Todo from '#models/todo'
import Status from '#models/status'

export default class Project extends BaseModel {
  static table = 'projects';
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare users: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


  @hasMany(() => Status)
  declare status: HasMany<typeof Status>

  @hasMany(() => Todo)
  declare todos: HasMany<typeof Todo>

  constructor() {
    super();
    this.uuid = v7();
  }
}
