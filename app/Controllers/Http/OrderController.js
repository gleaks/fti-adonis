'use strict'

const Order = use('App/Models/Order')
const Customer = use('App/Models/Customer')
const Product = use('App/Models/Product')

class OrderController {
  async home({view}) {
    // Fetch orders
    const orders = await Order.query().with('customer').with('products').fetch();

    return view.render('index', {
      orders: orders.toJSON()
    })
  }

  async new({view}) {
    const customers = await Customer.all();
    const products = await Product.all();
    return view.render('orders/new', {
      customers: customers.toJSON(),
      products: products.toJSON()
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
        const postedproducts = await posted.products().attach(order.products)

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
