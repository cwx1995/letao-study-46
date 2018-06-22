$(function(){
    $.ajax({
        url:`${APP.baseUrl}/category/querySecondCategoryPaging`,
        type:'get',
        data:{
            page:1,
            pageSize:5
        },
        success:function(response){
            console.log(response);
                var html=template('secondTpl',{
                    list:response,
                    api:APP.baseUrl
                });
                $('#secondBox').html(html);
        }
    });

//获取一级分类数据 渲染在二级分类添加弹出框内
$.ajax({
    url:`${APP.baseUrl}/category/queryTopCategoryPaging`,
    type:'get',
    data:{
        page:1,
        pageSize:1000
    },
    success:function(response){
        console.log(response);
        var html = template('flTpl',response);
        $('#flBox').html(html);
    }
})

var brandLogo='';

$('#fileUpload').fileupload({
    dataType: 'json',
    done: function (e, data) {
        console.log(data);
        // 存储图片地址
        brandLogo = data._response.result.picAddr;
        // 拼接图片url
        var imgUrl= APP.baseUrl + data._response.result.picAddr;
        // 将图片渲染到页面中
         $("#imgPreview").attr("src",imgUrl);
    }
});


    $('#saveBtn').on('click',function(){
            var brandName=$('#brandName').val();
           var categoryId=$('#flBox').val();
           var hot=1;
       $.ajax({
          
           url:`${APP.baseUrl}/category/addSecondCategory`,
           type:'post',
           data:{
            brandName,
            categoryId,
            brandLogo,
            hot
           },
           success:function(response){
               console.log(response);
            if(response.success){
                alert('添加成功');
                location.reload();
                return;
            }else{
                alert(response.message);
            }
           }
       });
    });
});