$(document).ready(function() {
    var num = 0;
    $('#newOrderDate').datepicker();

    $('.select2').select2({
      placeholder: 'Select a Customer',
      allowClear: true
    });

    $('#workOrderForm').on('click', '.deleteButton', function(e){
      e.preventDefault();
      $(this).closest('.row').remove();
    });

    $('#addButton').click(function(e){
        e.preventDefault();
        num++;
        $('#addProduct').before($('#products0').html());
        $('.full-width:last').attr('name', 'products[' + num + ']');
        $('.full-width:last').select2({
          placeholder: 'Select a Product',
          allowClear: true
        });
    });
});
