'use strict'

const Order = use('App/Models/Order')
const Customer = use('App/Models/Customer')

class OrderController {
  async home({view}) {
    // Fetch orders
    const orders = await Order.query().with('customer').fetch();

    return view.render('index', {
      orders: orders.toJSON()
    })
  }

  async new({view}) {
    const customers = await Customer.all();
    return view.render('orders/new', {
      customers: customers.toJSON()
    });
  }

  async create({ request, response, session, auth}) {
        const order = request.all();

        const posted = await auth.user.orders().create({
            name: order.name,
            customer_id: order.customer,
            date: order.date,
            status: order.status
        });

        session.flash({ message: 'Your Work Order has been created!' });
        return response.redirect('/');
  }

  async delete({ response, session, params}) {
        const order = await Order.find(params.id);

        await order.delete();
        session.flash({ message: 'Your Work Order has been removed'});
        return response.redirect('back');
    }
}

module.exports = OrderController
