'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubtasksSchema extends Schema {
  up () {
    this.create('subtasks', (table) => {
      table.increments()
      table.integer('task_id').unsigned().references('id').inTable('tasks')
      table.string('subtask_name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('subtasks')
  }
}

module.exports = SubtasksSchema
