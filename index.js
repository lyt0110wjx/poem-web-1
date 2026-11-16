// 获取元素
var banner_p = document.querySelector('.banner_p');
var spans = document.querySelectorAll('.banner_b span');
var arrow_left = document.querySelector('.arrow_left');
var arrow_right = document.querySelector('.arrow_right');
var index = 0;
var timer;

// 切换图片函数
function changeImg(i){
    index = i;
    banner_p.style.left = -1200 * i + 'px';
    // 小圆点激活
    for(var j=0;j<spans.length;j++){
        spans[j].className = '';
    }
    spans[i].className = 'on';
}

// 小圆点点击事件
for(var i=0;i<spans.length;i++){
    spans[i].onclick = function(){
        var num = parseInt(this.innerHTML)-1;
        changeImg(num);
    }
}

// 左箭头
arrow_left.onclick = function(){
    index--;
    if(index < 0){
        index = 5;
    }
    changeImg(index);
}

// 右箭头
arrow_right.onclick = function(){
    index++;
    if(index > 5){
        index = 0;
    }
    changeImg(index);
}

// 自动播放
function autoPlay(){
    timer = setInterval(function(){
        index++;
        if(index>5){
            index=0;
        }
        changeImg(index);
    },3000);
}
autoPlay();

// 鼠标移入停止自动播放，移出继续
var banner = document.querySelector('.banner');
banner.onmouseover = function(){
    clearInterval(timer);
}
banner.onmouseout = function(){
    autoPlay();
}
