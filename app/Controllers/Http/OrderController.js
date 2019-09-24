'use strict'

const Order = use('App/Models/Order')
const Customer = use('App/Models/Customer')
const System = use('App/Models/System')
const Mobo = use('App/Models/Mobo')
const External = use('App/Models/External')
const Module = use('App/Models/Module')
const OrderSystem = use('App/Models/OrderSystem')
// const Product = use('App/Models/Product')

class OrderController {
  async home({
    view
  }) {
    // Fetch all orders with their customer & products relationships
    const orders = await Order.query().with('customer').fetch()
    return view.render('index', {
      orders: orders.toJSON()
    })
  }

  async show({
    params,
    view
  }) {
    // Fetch order with its user, customer & products relationships
    const order = await Order.query().with('user').with('customer').where('id', params.id).first()
    const systems = await OrderSystem.query().with('mobos').where('order_id', params.id).fetch()
    // Cast date & break into multiple variables to make the Quote Number
    const date = new Date(order.date)
    const day = ("0" + date.getDate()).slice(-2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear().toString().substr(-2)
    // Get a full, properly formatted date for the "Date" portion of the work order
    const fulldate = date.toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'})

    return view.render('orders/show', {
      order: order.toJSON(),
      test: JSON.stringify(order.toJSON(), undefined, 2),
      systems: JSON.stringify(systems.toJSON()),
      day: day,
      month: month,
      year: year,
      fulldate: fulldate
    })
  }

  async new({
    view
  }) {
    const customers = await Customer.all()
    const systems = await System.all()
    const mobos = await Mobo.all()
    const externals = await External.all()
    const modules = await Module.all()
    // const products = await Product.all()

    // Cast a new date of today to be used by the date form input
    const d = new Date(Date.now())
    const date = d.toLocaleDateString('en-US')

    return view.render('orders/new', {
      customers: customers.toJSON(),
      systems: systems.toJSON(),
      mobos: mobos.toJSON(),
      externals: externals.toJSON(),
      modules: modules.toJSON(),
      // products: products.toJSON(),
      date: date
    })
  }

  async edit({
    params,
    view
  }) {
    const order = await Order.query().with('user').with('customer').with('systems').where('id', params.id).first()
    const customers = await Customer.all()
    const systems = await System.all()
    const mobos = await Mobo.all()
    const externals = await External.all()
    const modules = await Module.all()
    // const products = await Product.all()

    // Cast a new date from the date in the database for the date form input
    const d = new Date(order.date)
    const date = d.toLocaleDateString('en-US')

    return view.render('orders/edit', {
      order: order.toJSON(),
      customers: customers.toJSON(),
      systems: systems.toJSON(),
      mobos: mobos.toJSON(),
      // products: products.toJSON(),
      date: date
    })
  }

  async create({
    request,
    response,
    session,
    auth
  }) {
    const order = request.all()

    const posted = await auth.user.orders().create({
      name: order.name,
      customer_id: order.customer,
      description: order.description,
      date: order.date,
      status: order.status,
      delivery: order.delivery,
      shipping: order.shipping,
      payment: order.payment
    })
    var postedsystem = ''
    var motherboardid = ''
    // If there are actually some products do this
    if((typeof order.systems) != 'undefined') {
      for (var system in order.systems) {
        postedsystem = await posted.systems().attach(system.split('-')[1])
        const pivot = await OrderSystem.find(postedsystem[0].id)
        motherboardid = order.systems[system]['motherboarda']
        pivot.mobos().attach(order.systems[system]['motherboarda'])
      }
      // order.systems.forEach(function(system) {
      //   if(Array.isArray(system)) {
      //     system.forEach(function(motherboard){
      //       test2 = motherboard
      //     })
      //   } else {
      //     test = system
      //   }
      // })
      // // Go through the products array and remove any blank ones
      // var products = order.systems.filter(function(value, index, arr) {
      //   return value != ''
      // })
      // // Associate all the products in the array with this order
      // const postedproducts = await posted.systems().attach(products)
    }
    session.flash({
      message: 'Your Work Order has been created!' + JSON.stringify(order.systems) + '- ' + postedsystem[0].id + '-' + motherboardid
    })
    return response.redirect('/orders/' + posted.id)
  }

  async update({
    request,
    response,
    session,
    auth,
    params
  }) {
    const data = request.all()
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
    })
    await order.save()

    // De-associate all the old products with this order and associate all the new products in the form
    // await order.products().detach()
    // await order.products().attach(data.products)

    session.flash({
      message: 'Your Work Order has been edited!'
    })
    return response.redirect('/orders/' + order.id)
  }

  async delete({
    response,
    session,
    params,
    request
  }) {
    const order = await Order.find(params.id)

    await order.delete()
    session.flash({
      message: 'Your Work Order has been removed'
    })

    // If the source of the delete action came from the index stay there instead of refreshing
    // but if it came from another page then reload the root page
    if(params.from == 'index') {
      return response.redirect('back')
    } else {
      return response.redirect('/')
    }

  }
}

module.exports = OrderController
