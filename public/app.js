$(document).ready(function() {
  // Create a pages notification if the #flashmessage div has text in it
  if ($('#flashmessage').length) {
    $('body').pgNotification({message: $('#flashmessage').text()}).show();
  };

  // Start DataTables on all the tables, without a search bar (the dom option)
  var orderTable = $('#orderTable').DataTable({
    dom: "ltipr"
  });
  var customerTable = $('#customerTable').DataTable({
    dom: "ltipr"
  });
  var productTable = $('#productTable').DataTable({
    dom: "ltipr"
  });

  // Apply styling to the DataTables created length dropdown
  $('[name=orderTable_length]').addClass('cs-select');
  $('[name=customerTable_length]').addClass('cs-select');
  $('[name=productTable_length]').addClass('cs-select');

  // Create a dropdown that allows you to filter the Order table by its Category name
  $('#orderTable_length').after('<div class="pull-right"><select id="orderTable_select" class="cs-select"><option value="All">All</option><option value="Quote">Quote</option><option value="Possible Order">Possible Order</option><option value="Likely Order">Likely Order</option><option value="Confirmed Order">Confirmed Order</option><option value="Shipped">Shipped</option></select></div>')
  $('#productTable_length').after('<div class="pull-right"><select id="productTable_select" class="cs-select"><option value="All">All</option><option value="Base System">Base System</option><option value="DC Instrument">DC Instrument</option><option value="AC Instrument">AC Instrument</option><option value="IC Instrument">IC Instrument</option><option value="Accessory">Accessory</option><option value="Option">Option</option></select></div>')
  // When the dropdown is changed apply the value of the dropdown as a filter to the DataTable
  $('#orderTable_select').change(function() {
    var search = this.value
    if(search === 'All') {
      search = ''
    };
    orderTable.columns(4).search(search).draw();
  });
  $('#productTable_select').change(function() {
    var search = this.value
    if(search === 'All') {
      search = ''
    };
    productTable.columns(4).search(search).draw();
  });
});
