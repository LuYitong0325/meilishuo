//分类页
let data,
    resumeContainer = document.getElementsByClassName('resumeContainer')[0],
    oAs = resumeContainer.getElementsByTagName('a'),
    userContain = document.getElementsByClassName('userContain')[0],
    orderWrap = userContain.getElementsByClassName('orderWrap')[0],
    tips = orderWrap.getElementsByClassName('both'),
    priceCon = orderWrap.getElementsByClassName('priceCon')[0],
    priceDesc = priceCon.getElementsByClassName('priceDesc')[0],
    down = priceDesc.getElementsByClassName('down')[0],
    up = priceDesc.getElementsByClassName('up')[0],
    minPrice = orderWrap.getElementsByClassName('minPrice')[0],
    maxPrice = orderWrap.getElementsByClassName('maxPrice')[0],
    sure = orderWrap.getElementsByClassName('sure')[0],
    productBox = userContain.getElementsByClassName('product')[0],
    oUl = productBox.getElementsByTagName('ul')[0],
    oImgs = productBox.getElementsByTagName('img'),
    pageNav = document.getElementsByClassName('pageNav')[0],
    pagePrev = pageNav.getElementsByClassName('pagePrev')[0],
    pageNext = pageNav.getElementsByClassName('pageNext')[0],
    pages = pageNav.getElementsByTagName('a');
//首页
let nav = document.getElementsByClassName('nav')[0],
    ul = nav.getElementsByTagName('ul')[0],
    lis = ul.getElementsByTagName('li'),
    main = document.getElementsByClassName('main')[0],
    kinds = main.getElementsByClassName('kinds')[0],
    mainBox = document.getElementsByClassName('mainBox')[0],
    mainImgs = mainBox.getElementsByTagName('img'),
    indexUl = mainBox.getElementsByTagName('ul')[0],
    productKinds = document.getElementsByClassName('productKindsBox')[0],
    subLis = kinds.children;

//回到顶部
let sideContainer = document.getElementsByClassName('sideContainer')[0],
    btnBox = sideContainer.getElementsByClassName('btnBox')[0],
    sideDown = btnBox.getElementsByClassName('sideDown')[0],
    sideCode = sideDown.getElementsByClassName('sideCode')[0],
    backTop = sideContainer.getElementsByClassName('backTop')[0],
    header = document.getElementsByClassName('header')[0],
    icon = header.getElementsByClassName('icon')[0],
    myCollect = icon.getElementsByClassName('myCollect')[0],
    moreCollect = myCollect.getElementsByClassName('moreCollect')[0],
    helpCenter = icon.getElementsByClassName('helpCenter')[0],
    moreHelp = helpCenter.getElementsByClassName('moreHelp')[0],
    search = header.getElementsByClassName('com-search')[0];

/*点击事件*/
function markClick() {
    for (let i = 0; i < oAs.length; i++) {
        oAs[i].onclick = function () {
            [...oAs].forEach((item, index) => {
                utils.removeClass(item, 'checked');
            });
            utils.addClass(oAs[i], 'checked');
        }
    }
}
markClick();
function tipClick() {
    for (let i = 0; i < tips.length; i++) {
        tips[i].onclick = function () {
            [...tips].forEach((item, index) => {
                utils.removeClass(item, 'on');
                utils.removeClass(item, 'borderleft');
            });
            if (i === 1) {
                utils.addClass(tips[i], 'on');
            }
            utils.addClass(tips[i], 'on');
            utils.addClass(tips[i], 'borderleft');
        }
    }
}
tipClick();
function pageClick() {
    for (let i = 0; i < pages.length; i++) {
        pages[i].onclick = function () {
            if (i === 1) {
                pagePrev.style.opacity = 0;
                pageNext.style.display = 'inline-block';
            }
            if (i >= 2) {
                pagePrev.style.opacity = 1;
                pageNext.style.display = 'inline-block';
            }
            if (i === 8) {
                pagePrev.style.opacity = 1;
                pageNext.style.display = 'none';
            }
            [...pages].forEach((item, index) => {
                utils.removeClass(item, 'currentpage');
            });
            utils.addClass(pages[i], 'currentpage');
        }
    }
}
pageClick();
myCollect.onmouseover = function () {
    moreCollect.style.display = 'block';
};
myCollect.onmouseleave = function () {
    moreCollect.style.display = 'none';
};
helpCenter.onmouseover = function () {
    moreHelp.style.display = 'block';
};
helpCenter.onmouseleave = function () {
    moreHelp.style.display = 'none';
};

function getData(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            try {
                data = JSON.parse(xhr.responseText);
            } catch (e) {
                data = eval(`(${xhr.responseText})`);
            }
            giveHtml(data);
        }
    };
    xhr.send();
}
function giveHtml(data) {
    var str = '';
    data.forEach((item) => {
        str += `<li class="product-list fl">
        <div>
            <div class="img-size">
                <a class="img-link" target="_blank" href="${item.link}">
                    <img src="" trueSrc="${item.picImg}" alt="">
                </a>
            </div>
            <div class="product-info clearfix">
                <div class="price fl">
                    <em class="price-u">¥</em>
                    <span class="price-n">${item.price}.00</span>
                </div>
                <div class="fav fr">
                    <em class="fav-i"></em>
                    <span class="fav-n">${item.collect}</span>
                </div>
            </div>
            <a class="text-link" target="_blank" href="${item.link}">
                <span>${item.title}</span>
            </a>
        </div>
</li>`;
    });
    oUl.innerHTML = str;
    loadAll(oImgs);
}
function getIndexData() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'data/index.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            data = utils.toJson(xhr.responseText);
            giveIndexHtml(data);
        }
    };
    xhr.send();
}
getIndexData();
function giveIndexHtml(data) {
    var str = '';
    data.forEach((item) => {
        str += `<li class="fl">
            <div class="beauty">
                <div class="img-size">
                    <a href="${item.link}" target="_blank" class="picBox">
                       <img src="" trueSrc="${item.picImg}" alt="">
                    </a>
                </div>
                <div class="info">
                    <div class="part">
                        <div class="price">￥${item.price}.00</div>
                        <div class="collect">
                            <i class="icon-star"></i>
                            ${item.collect}
                        </div>
                    </div>
                    <a class="title" href="${item.link}">
                        <i class="icon-select"></i>
                        ${item.title}
                    </a>
                </div>
            </div>
        </li>`;
    });
    indexUl.innerHTML = str;
    loadAll(mainImgs);
}
/*排序*/
priceCon.onmouseover = function () {
    priceDesc.style.display = 'block';
    down.onclick = function () {
        data.sort(function (a, b) {
            return b['price'] - a['price'];
        });
        giveHtml(data);
        loadAll(oImgs);
    };
    up.onclick = function () {
        data.sort(function (a, b) {
            return a['price'] - b['price'];
        });
        giveHtml(data);
        loadAll(oImgs);
    };
};
priceCon.onmouseleave = function () {
    priceDesc.style.display = 'none';
};

/*价格范围*/
function surePrice(data) {
    sure.onclick = function () {
        var ary = [];
        for (var i = 0; i < data.length; i++) {
            if (minPrice.value <= data[i]['price'] && data[i]['price'] <= maxPrice.value) {
                ary.push(data[i]);
            }
        }
        giveHtml(ary);
        loadAll(oImgs);
    };
}
surePrice(data);

/*图片懒加载*/
function loadImg(ele) {
    if (ele.loaded) return;
    var sT = utils.win('scrollTop');
    var cH = utils.win('clientHeight');
    var tarT = utils.offset(ele).top;
    if (sT + cH > tarT + ele.clientHeight / 2) {
        var temp = document.createElement('img');
        var trueSrc = ele.getAttribute('trueSrc');
        temp.src = trueSrc;
        temp.onload = function () {
            ele.src = trueSrc;
            ele.loaded = true;
            fadeIn(ele);
        };
        temp = null;
    }
}
function loadAll(eles) {
    for (let i = 0; i < eles.length; i++) {
        loadImg(eles[i]);
    }
}
loadAll(oImgs);
loadAll(mainImgs);
function fadeIn(ele) {
    ele.style.opacity = 0;
    var opa = 0.1;
    var timer = setInterval(function () {
        opa += 0.1;
        ele.style.opacity = opa;
        if (opa >= 1) {
            clearInterval(timer);
            ele.style.opacity = 1;
        }
    }, 50)
}

//选项卡
clearClass();
subLis[0].style.display = 'block';
lis[0].className = 'aline';
productKinds.style.display = 'none';
mainBox.style.display = 'block';

function clearClass() {
    for (let i = 0; i < lis.length; i++) {
        subLis[i].style.display = 'none';
        lis[i].className = '';
        productKinds.style.display = 'none';
        mainBox.style.display = 'none';
    }
}

for (let i = 1; i < lis.length; i++) {
    lis[i].onclick = function () {
        clearClass();
        productKinds.style.display = 'block';
        mainBox.style.display = 'none';
        lis[i].className = 'aline';
        subLis[i].style.display = 'block';
        let url = `data/data${[i]}.json`;
        getData(url);
    };
}
lis[0].onclick = function () {
    clearClass();
    mainBox.style.display = 'block';
    lis[0].className = 'aline';
    subLis[0].style.display = 'block';
};

//回到顶部
function appear() {
    let dTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (dTop !== 0) {
        backTop.style.display = 'block';
    } else {
        backTop.style.display = 'none';
    }
    backTop.onclick = function () {
        let timer = window.setInterval(function () {
            dTop -= 20;
            if (dTop <= 0) {
                clearInterval(timer);
                dTop = 0;
            }
            document.documentElement.scrollTop = dTop;
            document.body.scrollTop = dTop;
        }, 10)
    }
}

sideDown.onmouseenter = function () {
    sideCode.style.display = 'block';
};
sideDown.onmouseleave = function () {
    sideCode.style.display = 'none';
};

window.onscroll = function () {
    var scrollT = utils.win('scrollTop');
    var clientH = icon.clientHeight + search.clientHeight;
    if(scrollT > clientH){
        utils.addClass(nav,'pos-fixed');
    }else{
        utils.removeClass(nav,'pos-fixed');
    }
    appear();
    loadAll(oImgs);
    loadAll(mainImgs);
};

//广告卡
let adBox = document.getElementsByClassName('adBox')[0],
    span = adBox.getElementsByTagName('span')[0];
span.onclick = function () {
    adBox.style.display = 'none';
};