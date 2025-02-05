import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { v7 } from 'uuid'

import Project from '#models/project'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  // eslint-disable-next-line sonarjs/no-hardcoded-credentials
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static table = 'users';
  @column({ isPrimary: true })
  declare id: number

  @column({})
  declare uuid: string

  @column({})
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Project)
  declare projects: HasMany<typeof Project>

  constructor() {
    super();
    this.uuid = v7();
  }
}
