$.ajax({
    type: "get",
    url: "/posts",
    // data: "data",
    // dataType: "dataType",
    success: function (response) {
        var data = response.records
        console.log(response)
        // console.log(response['cecords'])
        var html = template('postsTpl',{data:data})
        $('#tbody').html(html)
    }
})
function formateDate(date) {
    var date = new Date(date)
    return date.getFullYear()+'-' +(date.getMonth() +1) + '-'+ date.getDate()
  }