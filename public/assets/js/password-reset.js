$('#modifyForm').on('submit',function () {
    var formdata = $(this).serialize()
    console.log(formdata);
    $.ajax({
        type: "put",
        url: "/users/password",
        data: formdata,
        // dataType: "dataType",
        success: function (response) {
            console.log(response);
            
        },
        error:function (response) {
            console.log(response);
            
          }
    });
    return false
  })