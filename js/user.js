$(function(){

    //显示的请求
    $.ajax({
        type:'get',
        url:`${APP.baseUrl}/user/queryUser`,
        data:{
            page:1,
            pageSize:40
        },
        success:function(response){
            console.log(response);
                var html=template('userTpl',response);
                $('#userBox').append(html);
        }
    })



    //修改的请求
    $('#userBox').on('click', '.changeStatus', function () {
        var id=$(this).attr('data-id');
        var isDelete=$(this).attr('data-isdelete');
        $.ajax({
            type:'post',
            url:`${APP.baseUrl}/user/updateUser`,
            data:{
               id:id,
               isDelete:isDelete == 1 ? 0 : 1 
            },
            success:function(response){
               if(response.success){
                   location.reload();
               }else{
                alert(response.message);
               }
            }
        });
    });
})