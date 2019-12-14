// 添加分类表单
$('#addCategory').on('submit',function () {
    var formData = $(this).serialize()
    console.log(formData);
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function (response) {
            console.log('ok');
            location.reload()
        },
        error: function (param) {
            var aa = param.responseText
            var bb= JSON.parse(aa)
            console.log(bb)
            alert(bb['message'])
          }
       
        
    })
    return false
  })

//   发送ajax请求 想服务器端所有分类列表数据
$.ajax({
    type: "get",
    url: "/categories",
    // data: "data",
    // dataType: "dataType",
    success: function (response) {
        console.log(response);
        var html = template('categoriesListTpl',{data:response})
        $('#tbody').html(html)
    }
});
// 根据id获取分类数据
$('#tbody').on('click','.edit',function () { 
    // 获取id
    var id = $(this).attr('data-id')
    console.log(id);
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        // data: "data",
        // dataType: "dataType",
        success: function (response) {
            console.log(response);
            var html = template('addCategoryListTpl',response)
            $('#formbox').html(html)
        }
    });
    
 })
 $('#formbox').on('submit','#modifyCategory',function () { 
    // var formdata = $(this).serialize()
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    console.log(id);
    
    // console.log(formData);
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function (response) {
            console.log('ok');
            location.reload()
        }
       
       
        
    })
    return false
  })
//   根据id删除分类
$('#tbody').on('click','.delete',function () {
    if(confirm('是否删除')){
        var id = $(this).attr('data-id')
    console.log(id);
    $.ajax({
        type: "delete",
        url: "/categories/" + id,
        // data: "data",
        // dataType: "dataType",
        success: function (response) {
            location.reload()
        }
    })
    }else {
        location.href = 'categories.html'
    }
    return false
    
  })
