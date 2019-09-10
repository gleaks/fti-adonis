$(document).ready(function() {
  if ($('#flashmessage').length) {
    $('body').pgNotification({message: $('#flashmessage').text()}).show();
  };

  var orderTable = $('#orderTable').DataTable({
    dom: "ltipr"
  });

  var customerTable = $('#customerTable').DataTable({
    dom: "ltipr"
  });

  var productTable = $('#productTable').DataTable({
    dom: "ltipr"
  });

  $('[name=orderTable_length]').addClass('cs-select');

  $('#orderTable_length').after('<div class="pull-right"><select id="orderTable_select" class="cs-select"><option value="All">All</option><option value="Quote">Quote</option><option value="Possible Order">Possible Order</option><option value="Likely Order">Likely Order</option><option value="Confirmed Order">Confirmed Order</option><option value="Shipped">Shipped</option></select></div>')

  $('#orderTable_select').change(function() {
    var search = this.value
    if(search === 'All') {
      search = ''
    };
    orderTable.columns(4).search(search).draw();
  });

});
