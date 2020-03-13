function showList () {
    var decList = document.querySelectorAll(".wmp__dec--list")[0];
    var btn = document.querySelectorAll(".wmp__button")[0];
    var element = document.querySelector(".wjb__meeting--page");
    var pList 
    if(decList) {
        pList = decList.querySelectorAll("p");
        if(pList.length > 2 ) {
            var listHeight = decList.offsetHeight;
            decList.style.height = 0;
            watermark(element, element.offsetHeight)
            btn.classList.remove("hide");
            btn.addEventListener('click', function() {
                delwatermark();
                decList.classList.toggle('show');
                toggleList(btn,decList,listHeight);
            })
        }else{
            btn.classList.add("hide");
            watermark(element, element.offsetHeight)
        }
    }
    else {
        if (btn) {
          btn.classList.add("hide");
        }
        watermark(element, element.offsetHeight)
    }
}
function toggleList (btn,dom, height) {
    var wordDom = btn.querySelector(".wb__more")
    var wbBth = btn.querySelector(".wb__bth")
    var element = document.querySelector(".wjb__meeting--page")
    var sendHeight 
    if(dom.className.indexOf("show") !== -1) {
     dom.style.height = height+'px';
     setTimeout(function (){
         wordDom.innerHTML = '收起详情';
         wbBth.classList.remove("wm_show");
         wbBth.classList.add("wm_hide");
     }, 300);
      sendHeight = element.offsetHeight + height;
    }else {
     dom.style.height = 0;
     setTimeout(function (){
         wordDom.innerHTML = '查看详情';
         wbBth.classList.add("wm_show");
         wbBth.classList.remove("wm_hide");
     }, 300);
      sendHeight = element.offsetHeight - height;
    }
    watermark(element, sendHeight);
}
function delwatermark () {
    var element = document.querySelector(".wjb__meeting--page");
    var str = '';
    var list = element.children;
    for (i = 0; i < list.length; i++) {
        if (list[i].className.indexOf('watermark-item') !== -1) {
            str += i + ',';
        }
    }
    arr = str.split(",");
    arr.pop();
    arr.reverse();
    for (i = 0; i < arr.length; i++) {
        element.removeChild(element.children[parseInt(arr[i])]);
    }
}
function watermark(element,height) {
    // 获取用户名和瀛湖id
    const userName = document.getElementById("ipt__userName").value;
    const userId = document.getElementById("ipt__userId").value;
    let watermarkText = userName + '+' + userId;
    // 获取元素的坐标
    function getOffset(el) {
        if (el.offsetParent) {
            return {
                x: el.offsetLeft + getOffset(el.offsetParent).x,
                y: el.offsetTop + getOffset(el.offsetParent).y,
            };
        }
        return {
            x: el.offsetLeft,
            y: el.offsetTop,
        };
    }
    if (!element) return;
    // 默认配置
    const _config = {
        text1: watermarkText, //文本1
        start_x: 0, // x轴起始位置
        start_y: 0, // y轴起始位置
        space_x: 60, // x轴间距
        space_y: 0, // y轴间距
        width: 102, // 宽度
        height: 80, // 长度
        fontSize: 18, // 字体
        color: '#E6E6E6', // 字色
        alpha: 0.4, // 透明度
        rotate: 330, // 倾斜度
    };
    // 替换默认配置
    if (arguments.length === 2 && typeof arguments[1] === "object") {
        const src = arguments[1] || {};
        for (let key in src) {
            if (src[key] && _config[key] && src[key] === _config[key]) {
                continue;
            } else if (src[key]) {
                _config[key] = src[key];
            }
        }
    }
    // 节点的总宽度
    const total_width = element.scrollWidth;
    // 节点的总高度
    const total_height = height;
    // 创建文本碎片，用于包含所有的插入节点
    const mark = document.createDocumentFragment();
    // 水印节点的起始坐标
    const position = getOffset(element);
    let x = position.x + _config.start_x,
        y = position.y + _config.start_y;
    // 先循环y轴插入水印
    do {
        // 再循环x轴插入水印
        do {
            // 创建单个水印节点
            const item = document.createElement('div');
            item.className = 'watermark-item';
            // 设置节点的样式
            item.style.position = "absolute";
            item.style.zIndex = 99999;
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            // item.style.width = `${_config.width}px`;
            // item.style.height = `${_config.height}px`;
            item.style.fontSize = `${_config.fontSize}px`;
            item.style.color = _config.color;
            item.style.textAlign = 'center';
            item.style.opacity = _config.alpha;
            item.style.filter = `alpha(opacity=${_config.alpha * 100})`;
            item.style.webkitTransform = `rotate(-${_config.rotate}deg)`;
            item.style.MozTransform = `rotate(-${_config.rotate}deg)`;
            item.style.msTransform = `rotate(-${_config.rotate}deg)`;
            item.style.OTransform = `rotate(-${_config.rotate}deg)`;
            item.style.transform = `rotate(-${_config.rotate}deg)`;
            item.style.pointerEvents = 'none'; //让水印不遮挡页面的点击事件
            // 创建text1水印节点
            const text1 = document.createElement('div');
            text1.appendChild(document.createTextNode(_config.text1));
            item.append(text1);
            // 添加水印节点到文本碎片
            mark.append(item);
            // x坐标递增
            x = x + _config.width + _config.space_x;
            // console.log(x)
            // 超出文本右侧坐标停止插入
            console.log(total_width + position.x)
            console.log(x + _config.width)
        } while (total_width + position.x > x + _config.width);
        // 重置x初始坐标
        x = position.x + _config.start_x;
        // y坐标递增
        y = y + _config.height + _config.space_y;
        // 超出文本底部坐标停止插入
    } while (total_height + position.y > y + _config.height);
    // 插入文档碎片
    element.append(mark);
}
window.onload = function () {
    var element = document.querySelector(".wjb__meeting--page");
    if (element) {
        showList();
    } else {
        return false
    }
}