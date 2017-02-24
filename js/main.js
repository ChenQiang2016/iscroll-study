/**
 * Created by ChenQiang on 2017/2/24.
 */

var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    pullUpCount = 6;
    pullDownCount = 0;

/**
 * 下拉刷新
 */
function pullDownAction () {
    setTimeout(function () {
        var el, li, i;
        el = document.getElementById('list');

        for (i=0; i<3; i++) {
            li = document.createElement('li');
            li.innerText = '哈哈哈' + (pullDownCount--);
            li.setAttribute('class', 'list-group-item');
            el.insertBefore(li, el.childNodes[0]);
        }
        myScroll.refresh();
    }, 1000);
}
/**
 * 上拉加载
 */
function pullUpAction () {
    setTimeout(function () {
        var el, li, i;
        el = document.getElementById('list');

        for (i=0; i<3; i++) {
            li = document.createElement('li');
            li.innerText = '哈哈哈' + (pullUpCount++);
            li.setAttribute('class', 'list-group-item');
            el.appendChild(li, el.childNodes[0]);
        }
        myScroll.refresh();
    }, 1000);
}

function loaded() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        scrollbarClass: 'myScrollbar', /* 重要样式 */
        useTransition: false, /* 此属性不知用意，本人从true改为false */
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
            }
        },
        onScrollMove: function () {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                pullDownAction();
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                pullUpAction();
            }
        }
    });

    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

loaded();