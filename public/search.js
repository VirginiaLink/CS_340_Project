function searchCustomersByBill() {
  var search_amount = document.getElementByID('search_amount').value
  window.location = '/customers/search/' + encodeURI(search_amount)
}
