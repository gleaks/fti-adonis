'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoboOrderSystemModuleSchema extends Schema {
  up () {
    this.raw('ALTER TABLE "mobo_order_system_module" ALTER COLUMN "price" TYPE DECIMAL(10,2);')
  }

  down () {
  }
}

module.exports = MoboOrderSystemModuleSchema
