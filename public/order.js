$(document).ready(function() {
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
      $(this).closest('.form-group-attached').remove();
    });

    $('#workOrderForm').on('click', '.deleteExternal', function(e){
      e.preventDefault();
      $(this).closest('.row').remove();
    });

    // When you go to add an additional system it copies the HTML of a
    // hidden input, changes its name with the base incrementing number and
    // finally applies the select2 plugin to the input.
    $('#addButton').click(function(e){
        e.preventDefault();
        $('#addProduct').before($('#systems0').html());
        // $('.system-dropdown:last').attr('name', 'systems[' + num + ']');
        select = $('.system-dropdown:last').select2({
          placeholder: 'Select a System',
          allowClear: true
        });
        select.on('select2:select', function(e) {
          switch(e.params.data.text) {
            case '2 Channel Testhead':
            case 'Upgrade Only':
              $('.motherboarda:last').show()
              $('.motherboardb:last').show()
              mba = $('.motherboarda-dropdown:last').select2({
                placeholder: 'Select a Motherboard',
                allowClear: true
              });
              mba.on('select2:select', function(a) {
                $(a.target).attr('name', 'systems[system-' + e.params.data.id + '][motherboarda]');
                $('.amodules:last').show()
                $('.amodules:last .module-dropdown').attr('name', 'systems[system-' + e.params.data.id + '][motherboarda][modules]')
                $('.amodules:last .module-dropdown').select2({
                  placeholder: 'Select a Module',
                  allowClear: true
                });
              })
              mbb = $('.motherboardb-dropdown:last').select2({
                placeholder: 'Select a Motherboard',
                allowClear: true
              });
              mbb.on('select2:select', function(b) {
                $(b.target).attr('name', 'systems[system-' + e.params.data.id + '][motherboardb]');
                $('.bmodules:last').show()
                $('.bmodules:last .module-dropdown').attr('name', 'systems[system-' + e.params.data.id + '][motherboardb][modules]')
                $('.bmodules:last .module-dropdown').select2({
                  placeholder: 'Select a Module',
                  allowClear: true
                });
              })
              $('.externals:last').show()
              $('.externals:last .external-dropdown:last').attr('name', 'systems[system-' + e.params.data.id + '][externals]')
              $('.externals:last .external-dropdown:last').select2({
                placeholder: 'Select an External Module',
                allowClear: true
              });
              $('.addExternal').click(function(c){
                c.preventDefault();
                $('.externals:last .row:last').after($('#systems0 .externals').html());
                $('.externals:last .row:last button').removeClass('addExternal btn-primary').addClass('deleteExternal btn-danger');
                $('.externals:last .row:last button i').removeClass('pg-plus').addClass('pg-minus');
                $('.externals:last .external-dropdown:last').attr('name', 'systems[system-' + e.params.data.id + '][externals]')
                $('.externals:last .external-dropdown:last').select2({
                  placeholder: 'Select an External Module',
                  allowClear: true
                });
              });
              break;
            case 'Spares Kit':
              $('.motherboarda-dropdown:last').val('6').trigger('change').attr('name', 'systems[system-' + e.params.data.id + '][motherboarda]');
              $('.amodules:last').show()
              $('.amodules:last .module-dropdown').attr('name', 'systems[system-' + e.params.data.id + '][motherboarda][modules]')
              $('.amodules:last .module-dropdown').select2({
                placeholder: 'Select a Module',
                allowClear: true
              });
              break;
            default:
              console.log('something went wrong');
              break;
          }
        })
    });

});
