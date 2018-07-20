//点击开始游戏----->startPage消失----->游戏开始
//随机出现食物，出现三节蛇，开始运动
//控制上下左右四个键来操纵蛇的运动方向
//判断吃到食物，食物消失，蛇身长度加1
//判断游戏结束，弹出结束框

var content = document.getElementById('content'),
    scoreBox = document.getElementById('score'),
    loser = document.getElementsByClassName('loser')[0],
    loserScore = document.getElementsByClassName('loserScore')[0],
    close = document.getElementsByClassName('close')[0],
    startP = document.getElementsByClassName('startP')[0],
    startBtn = document.getElementsByClassName('startBtn')[0],
    startPage = document.getElementsByClassName('startPage')[0];



var snakeMove,
    startGameBool = true,
    startPauseBool = true,
    speed = 200;


init();

//初始化函数
function init() {
    //地图
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;

    //食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;

    //蛇
    this.snakeW = 20;
    this.snakeH = 20;

    //初始化蛇。一维数组第0位代表蛇头，后面都是蛇身。二维数组第0位代表X轴坐标，第1位代表Y轴坐标。
    this.snakeBody = [
        [3, 1, 'head'],
        [2, 1, 'body'],
        [1, 1, 'body']
    ];

    //游戏属性
    this.direct = 'right';
    this.left = 0;
    this.right = 0;
    this.top = 1;
    this.bottom = 1;

    //分数
    this.score = 0;
    this.scoreBox.innerHTML = 0;

    bindEvent();
}

function startGame() {
    startP.style.display = 'block';
    startPage.style.display = 'none';
    //游戏开始前先生成一个food和一条snake
    food();
    snake();



    //绑定键盘事件处理函数，控制蛇运动方向
    
}

//生成food的方法
function food() {
    //创建一个food并赋予它width和height,设置绝对定位，方便随机出现在content区域
    var food = document.createElement('div');
    food.style.width = foodW + 'px';
    food.style.height = foodH + 'px';
    food.style.position = 'absolute';

    //利用food的width和height，map的width和height，随机生成food的坐标。
    foodX = Math.floor(Math.random() * (mapW / 20));
    foodY = Math.floor(Math.random() * (mapH / 20));

    //利用food的随机坐标乘以自身的width和height，得出距离map左顶点的px值，从而得出food的left和top值。
    food.style.left = foodX * 20 + 'px';
    food.style.top = foodY * 20 + 'px';

    //将food插入到map中，同时设置一个class属性为food。
    mapDiv.appendChild(food).setAttribute('class', 'food');

}

//生成snake的方法
function snake() {
    //初始化snake，一个head和两个body。
    for (var i = 0; i < snakeBody.length; i++) {
        //生成一节snake，赋予它height和width。
        var snake = document.createElement('div');
        snake.style.width = snakeW + 'px';
        snake.style.height = snakeH + 'px';
        snake.style.position = 'absolute';

        //距离map的px值,并且给每一节蛇添加一个class类名，蛇头为head，其它为body。
        snake.style.left = snakeBody[i][0] * 20 + 'px';
        snake.style.top = snakeBody[i][1] * 20 + 'px';
        snake.classList.add(snakeBody[i][2]);

        //将每一节snake插入到map中。
        mapDiv.appendChild(snake).classList.add('snake');

        //根据运动方向来改变蛇头的方向
        switch (this.direct) {
            case 'right':
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)'
                break;
            case 'top':
                snake.style.transform = 'rotate(270deg)'
                break;
            case 'bottom':
                snake.style.transform = 'rotate(90deg)'
                break;
            default:
                break;
        }

    }
}


//运动函数
function move() {
    for (var i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i][0] = snakeBody[i - 1][0];
        snakeBody[i][1] = snakeBody[i - 1][1];
    }

    //根据方向来决定蛇头的位置变化
    switch (this.direct) {
        case 'right':
            snakeBody[0][0] += 1;
            break;
        case 'left':
            snakeBody[0][0] -= 1;
            break;
        case 'top':
            snakeBody[0][1] -= 1;
            break;
        case 'bottom':
            snakeBody[0][1] += 1;
            break;
        default:
            break;
    }

    //移除class类名为snake的所有蛇头和蛇身
    removeClass('snake');

    //马上重新生成一条蛇。此时snakeBody已经发生改变
    snake();

    //判断蛇头与food的距离来决定是否吃到food。
    if (snakeBody[0][0] == foodX && snakeBody[0][1] == foodY) {

        var snakeEndX = snakeBody[snakeBody.length - 1][0];
        var snakeEndY = snakeBody[snakeBody.length - 1][1];

        //根据运动方向来决定吃到food时，push时的坐标。
        switch (this.direct) {
            case 'right':
                snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'left':
                snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'top':
                snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            case 'bottom':
                snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            default:
                break;
        }

        //吃到food时，score和food的变化。
        this.score += 1;
        scoreBox.innerHTML = score;
        removeClass('food');
        food();
    }

    //碰到边界时，游戏结束
    if (snakeBody[0][0] < 0 || snakeBody[0][0] >= mapW / 20) {
        reloadGame();
    }
    if (snakeBody[0][1] < 0 || snakeBody[0][1] >= mapH / 20) {
        reloadGame();
    }

    //碰到身体，游戏结束。
    var snakeHeaderX = snakeBody[0][0];
    var snakeHeaderY = snakeBody[0][1];
    for (var i = 1; i < snakeBody.length; i++) {
        if (snakeHeaderX == snakeBody[i][0] && snakeHeaderY == snakeBody[i][1]) {
            reloadGame();
        }
    }
}

//游戏结束。重新加载游戏
function reloadGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);

    this.snakeBody = [
        [3, 1, 'head'],
        [2, 1, 'body'],
        [1, 1, 'body']
    ];
    this.direct = 'right';
    this.left = 0;
    this.right = 0;
    this.top = 1;
    this.bottom = 1;


    loser.style.display = 'block';
    loserScore.innerHTML = score;
    score = 0;
    scoreBox.innerHTML = 0;
    
    startGameBool = true;
    startPauseBool = true;
    startP.setAttribute('src', './imgs/start.png');
}

//通过class类名删除dom节点的方法
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    //从index为0一直删到index为length-1
    while (ele.length > 0) {
        ele[0].remove();
    }
}

//绑定键盘按下事件同时设置蛇头运动方向
function bindEvent() {

    close.onclick = function () {
        loser.style.display = 'none';
    }
    startBtn.onclick = function () {
        
        startAndPause();
    }
    startP.onclick = function () {
        startAndPause();
    }
}

//根据e.keyCode返回的数字来判断键盘按下时的方向。同时根据运动时的方向来决定蛇头方向是否改变。
function setDirect(code) {
    
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = 0;
                this.right = 0;
                this.top = 1;
                this.bottom = 1;
            }
            break;
        case 38:
            if (this.top) {
                this.direct = 'top';
                this.left = 1;
                this.right = 1;
                this.top = 0;
                this.bottom = 0;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = 0;
                this.right = 0;
                this.top = 1;
                this.bottom = 1;
            }
            break;
        case 40:
            if (this.bottom) {
                this.direct = 'bottom';
                this.left = 1;
                this.right = 1;
                this.top = 0;
                this.bottom = 0;
            }
            break;
        default:
            break;
    }
}

function startAndPause() {
    if (startPauseBool) {
        if (startGameBool) {
            startGame();
            startGameBool = false;
        }
        startP.setAttribute('src', './imgs/pause.png');
        document.onkeydown = function (e) {
            var e = e || window.event;
            var code = e.keyCode;
            setDirect(code);
        }
        //让蛇一直运动
        snakeMove = setInterval(function () {
            move();
        }, speed)
        startPauseBool = false;
    } else {
        startP.setAttribute('src', './imgs/start.png')
        clearInterval(snakeMove);
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        }
        startPauseBool = true;
    }
}











