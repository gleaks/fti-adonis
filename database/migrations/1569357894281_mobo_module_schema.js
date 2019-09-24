'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoboModuleSchema extends Schema {
  up () {
    this.raw('ALTER TABLE "mobo_modules" RENAME TO "mobo_order_system_module"')
  }

  down () {
  }
}

module.exports = MoboModuleSchema
