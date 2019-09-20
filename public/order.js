$(document).ready(function() {
    var num = 0;

    // Star Jquery-validation on the form
    $('#workOrderForm').validate();

    // If a form has submitted with error the product list is brought back as DIV's
    // with oldproduct as the class. Check if they exist, apply select2 to the inputs
    // and increment the base counting number to the number of the last product
    if ($('.oldproduct').length) {
      $('.oldproduct').select2({
        placeholder: 'Select a Product',
        allowClear: true
      });
      num = $('.oldproduct:last').attr('name').split('[')[1].split(']')[0];
    }

    // Start the javascript datepicker plugin
    $('#newOrderDate').datepicker();

    // Start select2 javascript plugin on the Customer input
    $('#customerSelect').select2({
      placeholder: 'Select a Customer',
      allowClear: true
    });

    // When form fails check to see if the Status input has a previously set
    // value and apply it to the select2 input if it exists.
    var value = $('.oldstatus').data('value');
    if (value != '') {
      $('#statusInput').val(value).trigger('change');
    }

    // Apply a jquery listener to dynamically added Delete buttons on each
    // row to remove the entire row.
    $('#workOrderForm').on('click', '.deleteButton', function(e){
      e.preventDefault();
      $(this).closest('.row').remove();
    });

    // When you go to add an additional system it copies the HTML of a
    // hidden input, changes its name with the base incrementing number and
    // finally applies the select2 plugin to the input.
    $('#addButton').click(function(e){
        e.preventDefault();
        num++;
        $('#addProduct').before($('#systems0').html());
        $('.full-width:last').attr('name', 'systems[' + num + ']');
        $('.full-width:last').select2({
          placeholder: 'Select a System',
          allowClear: true
        });
    });

});
