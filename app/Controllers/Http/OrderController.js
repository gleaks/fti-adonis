'use strict'

const Order = use('App/Models/Order')

class OrderController {
  async home({view}) {
    // Fetch orders
    const orders = await Order.all();

    return view.render('index', {
      orders: orders.toJSON()
    })
  }
}

module.exports = OrderController
