$(function () {
    var page=1;
    var pageSize = 4;
    var totalPage=0;
    getdata();
    $('#prev').on('click',function(){
       page--;
       if(page<1){
            page=1;
            alert('已经是第一页了');
            return;
        }
          
        getdata();   
        
       
    });
    $('#next').on('click',function(){
        page++;   
         if(page>totalPage){
            page=totalPage;
            alert('已经是最后一页了');
            return;
        }
         
           getdata();
        
        
       
    });
    function getdata(){
        $.ajax({
            type: 'get',
            url: `${APP.baseUrl}/category/queryTopCategoryPaging`,
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (response) {
                console.log(response);
                if (response.error == 400) {
                    location.href = 'login.html';
                } else {
                    var html = template('firstTpl', response);
                    $('#firstBox').html(html);
                }
                totalPage =Math.ceil(response.total/pageSize);
            }
    
        });
    }
});

