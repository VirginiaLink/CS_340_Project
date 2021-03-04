function updateCustomer(customerID) {
    console.log("From the ajax: " + customerID)
    $.ajax({
        url: '/customers/' + customerID,
        type: 'PUT',
        data: $('#update-customer').serialize(),
        success: function (result) {
            window.location.replace("./");
        }
    })
    console.log("From the ajax: " + customerID)
};
