function searchCustomersByBill() {
  console.log("searching customers...")
  var search_amount = document.getElementById("search_amount").value
  window.location = '/customers/search/' + parseInt(search_amount)
}
