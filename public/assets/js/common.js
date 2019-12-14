$('#logout').on('click',function () {
    var isConfirm = confirm('您真的要退出吗')
    if(isConfirm) {
      $.ajax({
        type: "post",
        url: "/logout",
        // data: "data",
        // dataType: "dataType",
        success: function (response) {
            console.log(response.message);
            location.href = 'login.html'
            
            
        }
      });
    }
      
    })