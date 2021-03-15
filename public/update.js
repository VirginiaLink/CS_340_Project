function updateEmployee(employeeID) {
    $.ajax({
        url: '/employees/' + employeeID,
        type: 'PUT',
        data: $('#update-employee').serialize(),
        success: function (result) {
            window.location.replace("./");
        }
    })
};

function updateCustomer(customerID) {
    $.ajax({
        url: '/customers/' + customerID,
        type: 'PUT',
        data: $('#update-customer').serialize(),
        success: function (result) {
            window.location.replace("./");
        }
    })
};

function updatePayment(paymentID) {
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


function updateGear(gearID){
    $.ajax({
        url: '/gear/' + gearID,
        type: 'PUT',
        data: $('#update-gear').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
