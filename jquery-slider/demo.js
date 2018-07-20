
var timer = null;
//移动的ul
var ulMove = document.getElementsByClassName('move')[0];
//每次轮播时移动的距离
var moveWidth = ulMove.children[0].offsetWidth;
//num为进行轮播的图片的张数
var num = ulMove.children.length - 1;

var leftBtn = document.getElementsByClassName('leftBtn')[0];
var rightBtn = document.getElementsByClassName('rightBtn')[0];

var oSpanArray = document.getElementsByClassName('dot')[0].getElementsByTagName('span');
var len = oSpanArray.length;
var index = 0;

var key = true;

rightBtn.onclick = function (){
    autoMove('left - right');
    
}
leftBtn.onclick = function (){
    autoMove('right - left');
   
}

//direction
//点击right按钮/默认轮播方向   'left - right' / undefined
//点击left按钮  'right - left'
function autoMove(direction) {
    if(key){
        key = false;
    clearTimeout(timer);
    //默认方向或是点击right按钮时的轮播方向
    if(!direction || direction == "left - right"){
            index++;
        startMove(ulMove, {left: ulMove.offsetLeft - moveWidth}, function (){
            //判断是否轮播到最后一张图片，如果是将ul的位置变回初始位置。
            if(ulMove.offsetLeft == -num * moveWidth){
                ulMove.style.left = '0px';
                index = 0;
            }
            timer = setTimeout(autoMove, 1500);
            key = true;
            changeIndex(index);
        });
    }else if(direction == "right - left"){
        index--;
        if(ulMove.offsetLeft == 0){
            ulMove.style.left = -num * moveWidth + "px";
            index = num -1;
        }
        startMove(ulMove, {left: ulMove.offsetLeft + moveWidth}, function (){
            timer = setTimeout(autoMove, 1500);
            key = true;
            changeIndex(index);
        })
    }
    }
}

timer = setTimeout(autoMove, 1500);

for(var i = 0; i < len; i++){
    (function (j){
        oSpanArray[j].onclick = function (){
            key = false;
			clearTimeout(timer);
			index = j;
			startMove(ulMove, {left:- index * moveWidth}, function (){
				key = true;
				timer = setTimeout(autoMove, 1500);
				changeIndex(index);
			});
        }
    })(i)
}

function changeIndex(index){
    
    for(var i = 0; i < len; i++){
        oSpanArray[i].className = '';
    }
    oSpanArray[index].className = 'active';
}


function startMove(elem, json, callBack){
    clearInterval(elem.timer);
    var iSpeed, iCur;
    elem.timer = setInterval(function (){
        var flag = true;
        for(var prop in json){
            iCur = parseInt(getStyle(elem, prop));

            iSpeed = (json[prop] - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            elem.style[prop] = iCur + iSpeed + 'px';
            if(json[prop] != iCur){
                flag = false;
            }
        }
        if(flag){
            clearInterval(elem.timer);
            typeof callBack == "function" ? callBack() : "";
        }
    }, 30);
}

function getStyle(elem, prop){
    if(window.getComputedStyle){
        return window.getComputedStyle(elem, null)[prop];
    }else{
        return elem.currentStyle(prop);
    }
}
