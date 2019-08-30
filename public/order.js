$(document).ready(function() {
    $('#newOrderDate').datepicker();
    $("#addButton").click(function(e){
        e.preventDefault();
        $('#addProduct').before($('#product').html());
        $('.full-width:last').select2();
    });
});
