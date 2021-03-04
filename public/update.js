function updateEmployee(employeeID) {
    console.log("From the ajax: " + employeeID)
    $.ajax({
        url: '/employees/' + employeeID,
        type: 'PUT',
        data: $('#update-employee').serialize(),
        success: function (result) {
            window.location.replace("./");
        }
    })
    console.log("From the ajax: " + employeeID)
};

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

function updatePayment(paymentID) {
    console.log("From the ajax: " + paymentID)
    $.ajax({
        url: '/payments/' + paymentID,
        type: 'PUT',
        data: $('#update-payment').serialize(),
        success: function (result) {
            window.location.replace("./");
        }
    })
    console.log("From the ajax: " + paymentID)
};


