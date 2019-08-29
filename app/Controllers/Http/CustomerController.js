'use strict'

const Customer = use('App/Models/Customer')

class CustomerController {
  async home({view}) {
    // Fetch orders
    const customers = await Customer.all();

    return view.render('customers/index', {
      customers: customers.toJSON()
    })
  }

  async new({view}) {
    return view.render('customers/new');
  }

  async create({ request, response, session, auth}) {
        const customer = request.all();

        const posted = await Customer.create({
            name: customer.name,
            address: customer.address,
            contact: customer.contact,
            email: customer.email,
            phone: customer.phone
        });

        session.flash({ message: 'Your Customer has been created!' });
        return response.redirect('/customers');
  }

  async delete({ response, session, params}) {
        const customer = await Customer.find(params.id);

        await customer.delete();
        session.flash({ message: 'Your Customer has been removed'});
        return response.redirect('back');
    }
}

module.exports = CustomerController
