function updateEmployee(employeeID) {
  console.log("From the ajax: " + employeeID)
  $.ajax({
    url: '/employees/' + employeeID,
    type: 'PUT',
    data: $('#update-employee').serialize(),
    success: function(result) {
      window.location.replace("./");
    }
  })
  console.log("From the ajax: " + employeeID)
};
