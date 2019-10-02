'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MoboOrderSystem extends Model {
  static get table () {
    return 'mobo_order_system'
  }
  mobo() {
    return this.belongsTo('App/Models/Mobo')
  }
  modules() {
    return this.belongsToMany('App/Models/Module').withPivot(['count', 'slot'])
  }
}

module.exports = MoboOrderSystem
