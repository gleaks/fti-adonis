'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomersSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments()
      table.string('name')
      table.string('contact')
      table.string('address')
      table.string('email')
      table.string('phone')
      table.timestamps()
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomersSchema
