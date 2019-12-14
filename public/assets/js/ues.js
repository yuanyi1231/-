$('#userform').on('submit', function () {
    // alert(1)
    var dataForm = $(this).serialize()
    // console.log(dataForm);

    $.ajax({
        type: "post",
        url: "/users",
        data: dataForm,
        // dataType: "dataType",
        success: function (response) {
            // console.log(response);
            location.reload()

        },
        error: function (response) {

            var aa = JSON.parse(response.responseText)
            console.log(aa.message);
        }
    });
    return false
})
// $('#avatar').on('change', function () {
   
// })

$('#modifyTpl').on('change','#avatar',function () { 
    var formData = new FormData()
    formData.append('avatar', this.files[0])
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        contentType: false,
        processData: false,
        //  dataType: "dataType",
        success: function (response) {
            console.log(response[0].avatar);
            $('#preview').attr('src', response[0].avatar)
            $('#hiddenavater').val(response[0].avatar)
        }
    });
 })

$.ajax({
    type: "get",
    url: "/users",
    //    data: "data",
    //    dataType: "dataType",
    success: function (response) {
        console.log(response);
        var html = template('usertpl', { data: response })
        // console.log(html);
        $('#tbodybox').html(html)
        // document.querySelector('#tbodybox').html(html)


    }
});
// 
$('#tbodybox').on('click', '.edit', function () {
    var id = $(this).attr('data-id')
    $.ajax({
        type: "get",
        url: "/users/" + id,
        //    data: "data",
        //    dataType: "dataType",
        success: function (response) {
            console.log(response);
            var html = template('gaitpl', response)
            $('#modifyTpl').html(html)

        }
    });
})
// 修改上传
$('#modifyTpl').on('submit', '#boxform', function () {
    var id = $(this).attr('data-id')
    var data = $(this).serialize()
    console.log(data);

    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: data,
        // dataType: "dataType",
        success: function (response) {
            console.log(response);

        }

    });
    location.reload()
    return false

})

// 删除
$('#tbodybox').on('click', '.delete', function () {
    // var confirm = 
    if(confirm('您真的要删除用户')) {
        var id = $(this).attr('data-id')
    console.log(id);
    
    $.ajax({
        type: "delete",
        url: "/users/" + id,
        // data: "data",
        // dataType: "dataType",
        success: function (response) {
           location.reload()
            
        }
    });
    } else {
        location.href = 'users.html'
    }
    // console.log($(this))
})

var selectall = $('#selectall')
var deleteMany = $('#deleteMany')

selectall.on('click',function () { 
    var status = $(this).prop('checked')
    //    批量删除
    if(status) {
        // 显示批量删除
        deleteMany.show()
    } else {
        // 隐藏批量删除
        deleteMany.hide()
    }
    console.log(status);
    // 全选状态和按钮保持一致
    $('#tbodybox').find('input').prop('checked',status)
    
 })

 $('#tbodybox').on('change','#userstatus',function () {
     var inputs = $('#tbodybox').find('input')
    //  console.log(inputs);
     
    if(inputs.length == inputs.filter(':checked').length){
        // console.log(inputs.length);
        
        selectall.prop('checked',true)
    } else {
        selectall.prop('checked' ,false)
    }
    if(inputs.filter(':checked').length > 0) {
        // 显示批量删除
        deleteMany.show()
    } else {
        // 隐藏批量删除
        deleteMany.hide()
    }
   })
// 批量删除
deleteMany.on('click',function () {
    var checkedUser = $('#tbodybox').find('input').filter(':checked')
    // console.log(checkedUser);
    var ids = []
    checkedUser.each(function (index,item) { 
        ids.push($(item).attr('data-id'))
     })
     console.log(ids);
     if(confirm('确定要删除?')){
         $.ajax({
             type: "delete",
             url: "/users/" + ids.join('-'),
            //  data: "data",
            //  dataType: "dataType",
             success: function (response) {
                 location.reload()
             }
         });
     } else {
         location.href = 'users.html'
     }
     
    
  })