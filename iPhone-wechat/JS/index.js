//点击发送按钮，绑定事件处理函数。

$('.left_btn').click(function (){
    sendMsg_left();
    viewHistory();
});
$('.right_btn').click(function (){
    sendMsg_right();
    viewHistory();

});

//按下回车键，将消息发送出去，监听document。
$(document).bind('keydown', function (e){
    if(e.keyCode === 13){
        sendMsg_left();
        sendMsg_right();
        viewHistory();
    }
    
})

//返回字符串的字节长度

function retBytes(str) {
	var num = str.length;
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 255) {
			num++;
		}
	}
	return num;
}

//left_btn的事件处理函数
function sendMsg_left(){
    //1.获取输入框的value值
    var value = $('.left_text').val();

    if(value.trim() !== ""){
        //2.生成li标签，并将value值插入到li中
        var li = $('<li>'+value+'<img class="right_img" src="./imgs/17.jpg"></li>');
        

        //3.手动控制li在left_move中的位置，和li的大小
        var len = retBytes(value);
        li.css('width', len*7+'px');
        var liW = li.outerWidth();
        if(liW <= 150){
            li.css('marginLeft', 225 - liW - 50 + 'px');
        }else{
            li.css('marginLeft', 225 - 150 - 50 + 'px');
        }
        
         //4.将li插入到left_move中
         $('.left_move').append(li);

         //5.将li插入到right_move中。
         var lis = $('<li>'+value+'<img class="left_img" src="./imgs/17.jpg"></li>');
        //  lis.css('width', len * 14 + 'px');
        //  lis.css('marginLeft', '40px');
        lis.css({width: len*7, marginLeft: 40, backgroundColor: "deepskyblue"})
         $('.right_move').append(lis);

         //6.将输入框中的文本内容清空
         $('.left_text').val('');
    }
}


//right_btn的事件处理函数
function sendMsg_right(){
    var value = $('.right_text').val();
    if(value.trim() !== ''){
        var li = $('<li>'+value+'<img class="right_img" src="./imgs/18.jpg"></li>');

        var len = retBytes(value);
        li.css('width', len*7+'px');
       
        var liW = li.outerWidth();
        if(liW <= 150){
            li.css('marginLeft', 225 - liW - 50 + 'px');
        }else{
            li.css('marginLeft', 225 - 150 - 50 + 'px');
        }

        //将li插入到right_move中
        $('.right_move').append(li);

        //将li插入到left_move中。
        var lis = $('<li>'+value+'<img class="left_img" src="./imgs/18.jpg"></li>');

        lis.css({width: len*7, marginLeft: 40, backgroundColor: "deepskyblue"});
        $('.left_move').append(lis);

        $('.right_text').val('');

    }
}


var contH = $('.content').height() - 16;
var ulH ;
//通过滚动条来查看历史记录
function viewHistory(){
    //当ul高度大于content高度时，让滚动条出现。

    
    
    if(ulH > contH){
        $('.slider').css('opacity', 1);
       
    }
}


 //根据等式 contH / (ulH - contH) === speed / speedU;求出滚动条移动一定距离时，ul需要移动的距离。
//通过上、下键来改变滚动条的位置。
$(document).keydown(function (e){
    ulH = parseFloat($('.move').height());
    var slider_top_left = parseFloat($('.left_slider').css('top'));
    var slider_top_right = parseFloat($('.right_slider').css('top'));
    var speed = 4;
    var speedU = speed * (ulH - contH) / contH;
    var ul_bot_left = parseFloat($('.left_move').css('bottom'));
    var ul_bot_right = parseFloat($('.right_move').css('bottom'));
   

        if(e.keyCode == 38 && slider_top_left > 0){
            
            $('.left_slider').css('top', slider_top_left - speed);
            $('.left_move').css('bottom', ul_bot_left - speedU);
        
           
        }else if(e.keyCode == 40 && slider_top_left < 284){
        
            $('.left_slider').css('top', slider_top_left + speed);
            $('.left_move').css('bottom', ul_bot_left + speedU);
                
        }else if(e.keyCode == 33 && slider_top_right > 0){
            
            $('.right_slider').css('top', slider_top_right - speed);
            $('.right_move').css('bottom', ul_bot_right - speedU);
            
        }else if(e.keyCode == 34 && slider_top_right < 284){
            
            $('.right_slider').css('top', slider_top_right + speed);
            $('.right_move').css('bottom', ul_bot_right + speedU);
            
    }
});


