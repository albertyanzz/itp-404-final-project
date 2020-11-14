'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AchievementsSchema extends Schema {
  up () {
    this.create('achievements', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('tasks_completed').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('achievements')
  }
}

module.exports = AchievementsSchema
