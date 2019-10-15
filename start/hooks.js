const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersRegistered(() => {
  const View = use('View')

  View.global('priceString', function (text) {
    return text.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  })
  
  View.global('multilineBreak', function (text) {
    return text.replace(/(?:\\[rn])+/g, '<br />').replace(/['"]+/g, '');
  })
})
