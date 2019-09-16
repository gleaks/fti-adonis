'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class System extends Model {
  mobos() {
    return this.belongsToMany('App/Models/Mobo').withPivot(['count'])
  }
  externals() {
    return this.belongsToMany('App/Models/External').withPivot(['count'])
  }
}

module.exports = System
