import Project from '#models/project'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Project.createMany([
      {
        userId: 1,
        name: 'Projet 1',
      },
      {
        userId: 1,
        name:'Projet2'
      },
    ]);
  }
}
