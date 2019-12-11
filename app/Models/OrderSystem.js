'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrderSystem extends Model {
  system() {
    return this.belongsTo('App/Models/System')
  }
  mobos() {
    return this.belongsToMany('App/Models/Mobo').pivotModel('App/Models/MoboOrderSystem')
  }
  pivot() {
    return this.hasMany('App/Models/MoboOrderSystem')
  }
  externals() {
    return this.belongsToMany('App/Models/External').withPivot(['count', 'price', 'description'])
  }
}

module.exports = OrderSystem
