function deleteEmployee(id) {
    $.ajax({
        url: '/employees/' + id,
        type: 'DELETE',
        success: function (result) {
            window.location.reload(true);
        }
    })
};

function deleteCustomer(id) {
    $.ajax({
        url: '/customers/' + id,
        type: 'DELETE',
        success: function (result) {
            window.location.reload(true);
        }
    })
};

function deletePayment(paymentNum) {
    $.ajax({
        url: '/payments/' + paymentNum,
        type: 'DELETE',
        success: function (result) {
            window.location.reload(true);
        }
    })
};

function deleteCert(certifiedEmployees, serviceType){
  $.ajax({
    url: '/certs/employeeID/' + certifiedEmployees + '/cert/' + serviceType,
    type: 'DELETE',
    success: function(result){
        if(result.responseText != undefined){
          alert(result.responseText)
        }
        else {
          window.location.reload(true)
        }
    }
  })
};
