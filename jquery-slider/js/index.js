var flag = true,
    index = 0,
    len = $('.order li').length,
    moveWidth = $('.move li').width(),
    ulMove = $('.move'),
    timer = null;
  
function init(){
    bindEvent();
    autoMove();
}
init();

function bindEvent(){
    $('.left-btn').add($('.right-btn')).add($('.order li')).on('click', function (){
        if($(this).attr('class') == 'btn left-btn'){
            changeIndex('left');
        }else if($(this).attr('class') == 'btn right-btn'){
            changeIndex('right');
        }else{
            var index = $(this).index();
            changeIndex(index);
        }
      
    });
    //如果图片还在运动没有停止（图片处于setTimeout设置的1000ms时间内）mouseenter调用clearTimeout(timer);是无用的，在动画结束//时还是会调用autoMove(),所以采用mousemove
    $('.wrapper').on('mousemove', function (){
        clearTimeout(timer);
        $('.btn').css('display', 'block');
    }).on('mouseleave', function (){
        autoMove();
        $('.btn').css('display', 'none');
    })
}

function changeIndex(dir){
    if(flag){
        flag = false;
        if(dir == 'left' || dir == 'right'){
            if(dir == 'left'){
                if(index == 0){
                    ulMove.css('left', -len * moveWidth);
                    index = len - 1;
                }else{
                    index--;
                }
            }else{
                if(index == len - 1){
                    ulMove.animate({left: -len * moveWidth}, 1000, function (){
                        ulMove.css('left', '0px');
                        
                    })
                    index = 0;
                }else{
                    index ++;
                }
            }
        }else{
            index = dir;
        }
        move();
        changeActive(index);
    }
}
function move(){
    ulMove.animate({left: -index * moveWidth}, 1000, function (){
        console.log(index);
        autoMove();
        flag = true
    });
}

function changeActive(index){
    $('.active').removeClass('active');
    $('.order ul li').eq(index).addClass('active');
}
function autoMove(){
    clearTimeout(timer);
    timer = setTimeout(function (){
        changeIndex('right');
    }, 1000);
}