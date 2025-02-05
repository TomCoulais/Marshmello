import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class Seeder extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        username: 'good_username',
        password: 'password',
      }
    ])
  }
}
