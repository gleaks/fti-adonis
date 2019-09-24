'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Mobo extends Model {
  modules() {
    return this.manyThrough('App/Models/MoboOrderSystem', 'modules')
  }
}

module.exports = Mobo
