'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async home({view}) {
    // Fetch orders
    const products = await Product.all();

    return view.render('products/index', {
      products: products.toJSON()
    });
  }

  async new({view}) {
    return view.render('products/new');
  }

  async create({ request, response, session, auth}) {
        const product = request.all();

        const posted = await Product.create({
            name: product.name,
            price: product.price
        });

        session.flash({ message: 'Your Product has been created!' });
        return response.redirect('/products');
  }

  async delete({ response, session, params}) {
        const product = await Product.find(params.id);

        await product.delete();
        session.flash({ message: 'Your Product has been removed'});
        return response.redirect('back');
    }
}

module.exports = ProductController
