'use strict'

const Order = use('App/Models/Order')
const Customer = use('App/Models/Customer')
const Product = use('App/Models/Product')

class OrderController {
  async home({
    view
  }) {
    // Fetch orders
    const orders = await Order.query().with('customer').with('products').fetch();
    return view.render('index', {
      orders: orders.toJSON()
    })
  }

  async show({
    params,
    view
  }) {
    // Fetch order
    const order = await Order.query().with('user').with('customer').with('products').where('id', params.id).first();

    const date = new Date(order.date);
    const day = ("0" + date.getDate()).slice(-2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear().toString().substr(-2);
    const fulldate = date.toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'});

    return view.render('orders/show', {
      order: order.toJSON(),
      day: day,
      month: month,
      year: year,
      fulldate: fulldate
    })
  }

  async new({
    view
  }) {
    const customers = await Customer.all();
    const products = await Product.all();
    const d = new Date(Date.now());
    const date = d.toLocaleDateString('en-US');

    return view.render('orders/new', {
      customers: customers.toJSON(),
      products: products.toJSON(),
      date: date
    });
  }

  async edit({
    params,
    view
  }) {
    const order = await Order.query().with('user').with('customer').with('products').where('id', params.id).first();
    const customers = await Customer.all();
    const products = await Product.all();
    const d = new Date(order.date);
    const date = d.toLocaleDateString('en-US');

    return view.render('orders/edit', {
      order: order.toJSON(),
      customers: customers.toJSON(),
      products: products.toJSON(),
      date: date
    });
  }

  async create({
    request,
    response,
    session,
    auth
  }) {
    const order = request.all();

    const posted = await auth.user.orders().create({
      name: order.name,
      customer_id: order.customer,
      description: order.description,
      date: order.date,
      status: order.status,
      delivery: order.delivery,
      shipping: order.shipping,
      payment: order.payment
    });

    if((typeof order.products) !== undefined) {
      var products = order.products.filter(function(value, index, arr) {
        return value != '';
      });
      const postedproducts = await posted.products().attach(products)
    }
    session.flash({
      message: 'Your Work Order has been created!'
    });
    return response.redirect('/orders/' + posted.id);
  }

  async update({
    request,
    response,
    session,
    auth,
    params
  }) {
    const data = request.all();
    const order = await Order.find(params.id)

    const posted = await order.merge({
      name: data.name,
      customer_id: data.customer,
      description: data.description,
      date: data.date,
      status: data.status,
      delivery: data.delivery,
      shipping: data.shipping,
      payment: data.payment
    });
    await order.save()
    await order.products().detach()
    await order.products().attach(data.products)

    session.flash({
      message: 'Your Work Order has been edited!'
    });
    return response.redirect('/orders/' + order.id);
  }

  async delete({
    response,
    session,
    params,
    request
  }) {
    const order = await Order.find(params.id);

    await order.delete();
    session.flash({
      message: 'Your Work Order has been removed'
    });
    if(params.from == 'index') {
      return response.redirect('back');
    } else {
      return response.redirect('/')
    }

  }
}

module.exports = OrderController
