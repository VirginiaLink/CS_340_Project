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
