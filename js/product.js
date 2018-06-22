$(function(){
    $.ajax({
        url:`${APP.baseUrl}/product/queryProductDetailList`,
        type:'get',
        data:{
            page:1,
            pageSize:10
        },
        success:function(response){
            console.log(response);
             var html=template('proTpl',response);
             $('#proBox').html(html);
        }
    });
    add();
    var brandLogo='';

$('#fileUpload').fileupload({
    dataType: 'json',
    done: function (e, data) {
        console.log(data);
        // 存储图片地址
        brandLogo = data._response.result.picAddr;
        // 拼接图片url
        var imgUrl= data._response.result.picAddr;
        $("#imgPreview").attr("src",imgUrl);
        
    }
});
    $('#addProduct').on('click',function(){
        var result = $('#formList').serializeToJson();
      var proName = result.proName;
      var oldPrice = result.oldPrice;
      var price = result.price;
      var proDesc = result.proDesc;
      var size = result.size;
      var num = result.num;
      var brandId = Math.floor(Math.random()*100);
      var statu=1;
      console.log(  proName,
        oldPrice,
        price,
        proDesc,
        size,
        num,
        brandId,
        brandLogo,
        statu
    );
        $.ajax({
            type:'post',
            url:`${APP.baseUrl}/product/addProduct`,
            data:{
                proName,
                oldPrice,
                price,
                proDesc,
                size,
                num,
                brandId,
                statu,
                brandLogo
            },
            success:function(response){
                console.log(response);
                if(response.success){
                    location.reload();
                }
                
            }
        });
    })
})

function add(){
    $.ajax({
        type:'get',
        url:`${APP.baseUrl}/category/querySecondCategoryPaging`,
        data:{
            page:1,
            pageSize:1000
        },
        success:function(response){
            console.log(response);
            var html=template('addTpl',response);
            $('#addBox').html(html);
        }
    })
}