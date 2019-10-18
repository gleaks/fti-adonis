'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Routes for login, logout & user creation
Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');
Route.on('/login').render('auth.login');
Route.post('/login', 'UserController.login').validator('LoginUser');
Route.get('/logout', async ({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
});

Route.group('admin', () => {
  Route.get('/', 'OrderController.home');
  // Orders routes
  Route.get('/orders/create', 'OrderController.new');
  Route.post('/orders/create', 'OrderController.create').validator('CreateOrder');
  Route.get('/orders/:id', 'OrderController.show');
  Route.get('/orders/edit/:id', 'OrderController.edit');
  Route.post('/orders/update/:id', 'OrderController.update').validator('CreateOrder');
  Route.get('/orders/delete/:id/:from', 'OrderController.delete');
  Route.get('/orders/workorder/:id', 'OrderController.workorder')
  // Customers routes
  Route.get('/customers', 'CustomerController.home');
  Route.get('/customers/create', 'CustomerController.new');
  Route.post('/customers/create', 'CustomerController.create').validator('CreateCustomer');
  Route.get('/customers/edit/:id', 'CustomerController.edit');
  Route.post('/customers/update/:id', 'CustomerController.update').validator('CreateCustomer');
  Route.get('/customers/delete/:id/:from', 'CustomerController.delete');
  Route.post('/customers/remote', 'CustomerController.remote').validator('CreateCustomer');
  // Products routes
  Route.get('/products', 'ProductController.home');
  Route.get('/products/create', 'ProductController.new');
  Route.post('/products/create', 'ProductController.create').validator('CreateProduct');
  Route.get('/products/edit/:table/:id', 'ProductController.edit');
  Route.post('/products/update/:table/:id', 'ProductController.update').validator('CreateProduct');
  Route.get('/products/delete/:table/:id/:from', 'ProductController.delete');
}).middleware('admin')
// Set root route
