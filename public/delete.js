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

function deletePayment(id) {
    $.ajax({
        url: '/payments/' + id,
        type: 'DELETE',
        success: function (result) {
            window.location.reload(true);
        }
    })
};
