$(document).ready(function() {
  // Create a pages notification if the #flashmessage div has text in it
  if ($('#flashmessage').length) {
    $('body').pgNotification({message: $('#flashmessage').text()}).show()
  }

  // Start DataTables on all the tables, without a search bar (the dom option)
  var orderTable = $('#orderTable').DataTable({
    dom: '<"row"<"col-md-4 text-left"l><"col-md-4 text-center"f><"#orderTable_selectDiv.col-md-4 text-right">>trip',
    order: [2, 'desc']
  })
  var customerTable = $('#customerTable').DataTable({
    dom: '<"row"<"col-md-4"l><"col-md-4 text-center"f><"#customerTable_selectDiv.col-md-4 text-right">>trip'
  })
  var productTable = $('#productTable').DataTable({
    dom: '<"row"<"col-md-4"l><"col-md-4 text-center"f><"#productTable_selectDiv.col-md-4 text-right">>trip'
  })

  // Apply styling to the DataTables created length dropdown
  $('[name=orderTable_length]').addClass('cs-select')
  $('[name=customerTable_length]').addClass('cs-select')
  $('[name=productTable_length]').addClass('cs-select')

  // Create a dropdown that allows you to filter the Order & Product table by its Category name
  $('#orderTable_selectDiv').html('<select id="orderTable_select" class="cs-select">\
                                    <option value="All">All</option><option value="Quote">Quote</option>\
                                    <option value="Possible Order">Possible Order</option>\
                                    <option value="Likely Order">Likely Order</option>\
                                    <option value="Confirmed Order">Confirmed Order</option>\
                                    <option value="Shipped">Shipped</option>\
                                  </select>')
  $('#productTable_selectDiv').html('<select id="productTable_select" class="cs-select">\
                                      <option value="All">All</option>\
                                      <option value="Base System">Base System</option>\
                                      <option value="Motherboard">Motherboard</option>\
                                      <option value="Internal Module">Internal Module</option>\
                                      <option value="External Module / Accessory">External Module / Accessory</option>\
                                    </select>')

  // When the dropdown is changed apply the value of the dropdown as a filter to the DataTable
  $('#orderTable_select').change(function() {
    var search = this.value
    if(search === 'All') {
      search = ''
    }
    orderTable.columns(4).search(search).draw()
  })
  $('#productTable_select').change(function() {
    var search = this.value
    if(search === 'All') {
      search = ''
    }
    productTable.columns(4).search(search).draw()
  })
})
