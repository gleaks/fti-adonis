'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoboSystemSchema extends Schema {
  up () {
    this.raw('ALTER TABLE "mobo_system" RENAME TO "mobo_order_system"')
  }

  down () {
  }
}

module.exports = MoboSystemSchema
