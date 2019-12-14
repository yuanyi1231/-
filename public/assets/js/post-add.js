$.ajax({
    type: "get",
    url: "/categories",
    // data: "data",
    // dataType: "dataType",
    success: function (response) {
        console.log(response);
        var html = template('categoryTpl',{data:response})
        $('#category').html(html)
    }
})

// 上传图片


$('#feature').on('change',function () {
    // 获取管理员   选择到的文件
    var file = this.files[0]
    // 创建formdata 实现二进制上传
    var formData = new FormData()
    // 文件添加到formdata中
    formData.append('cover',file)
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // dataType: "dataType",
        // 不要处理data属性对应参数
        processData:false,
        // 不要设置参数属性
        contentType:false,
        success: function (response) {
            console.log(response)
            $('#thumbnail').val(response[0].cover)
            
        }
    });
  })
//   创建文章
$('#addForm').on('submit',function () {
    // alert(1)
    var formData = $(this).serialize()
    console.log(formData);
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        // dataType: "dataType",
        success: function (response) {
            console.log(response);
            
            location.href = '/admin/posts.html'
        },
        error:function (param) {
            console.log(param);
            
          }
    });
    return false
  })