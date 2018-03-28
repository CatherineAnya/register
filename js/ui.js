// 搜索组件
// 头部搜索框交互：jquery插件开发方法
// 1.通过 $.fn 向jquery添加新方法：uiSearch方法的定义
$.fn.uiSearch = function () {
    // 获取对象
    var ui = $(this);
    // 2.考虑如何交互
    // 首先，点击.ui-search-selected就显示出下拉列表.ui-search-list
    $('.ui-search-selected', ui).on('click', function () {
        $('.ui-search-list').show();
        return false;
    });
    // 其次，点击.ui-search-list中任意一项a就改变.ui-search-selected中文本内容
    $('.ui-search-list a', ui).on('click', function () {
        $('.ui-search-selected').text($(this).text());
        // 并且隐藏下拉列表.ui-search-list
        $('.ui-search-list').hide();
        return false;
    });
    // 最后，当下拉列表显示时，点击任意地方，除.ui-search-selected外，下拉列表隐藏
    $('body').on('click', function () {
        $('.ui-search-list').hide();
    });
};

// 选项卡组件
// 内容区tab交互：jquery插件开发方法
// 1.通过 $.fn 向jquery添加新方法：uiTab方法的定义
// uiTab方法有两个必选参数：
 /*
  * @param {string} header tab组件中所有选项的item，必选
  * @param {string} content tab组件中内容区的所有item，必选
  */
$.fn.uiTab = function (header, content) {
    // 获取对象
    var ui = $(this);
    var tabs = $(header, ui);
    var cons = $(content, ui);
    // 2.考虑如何交互
    // 首先，点击tab组件中header的任意一个选项时，就会显示tab组件中content的对应内容
    tabs.on('click', function () {
        // 那么，就要知道当前所点击的选项的索引，就可找到对应索引的内容
        var index = $(this).index();
        // 其次，把默认第一个选项上的高亮样式去除，并且为第index+1个的选项添加高亮样式
        tabs.removeClass('item_click').eq(index).addClass('item_click');
        // 最后，把默认第一个选项对应的内容隐藏，并且显示第index+1个的选项对应的内容
        cons.hide().eq(index).show();
        return false;
    });
};

// 幻灯片组件
// 边栏区图片的轮播：jquery插件开发方法
// 1.通过 $.fn 向jquery添加新方法：uiSlider方法的定义
// 2.考虑轮播图都需要具有什么功能
 /* 功能：
  * 1.点击上一张、下一张箭头按钮可以进行翻页，当向下翻到最后一张的时候，再往下翻将回到第一张，当向上翻到第一张的时候，再往上翻将回到最后一张
  * 2.点击上一张、下一张箭头按钮进翻页的同时，对应的圆点导航需要高亮
  * 3.点击圆点导航按钮，会切换到对应的图片，点击的圆点导航高亮
  * 4.打开网站后，图片会自动轮播，如果鼠标悬停在ui-slider区域内，则停止自动滚动，鼠标移开继续滚动
  * 5.高级效果：无缝滚动
  */
$.fn.uiSlider = function () {
    // 获取对象
    var ui = $(this);
    var wrap = $('.ui-slider-wrap', ui);
    var items = $('.ui-slider-wrap .item', ui);
    var prev = $('.ui-slider-arrow .item-left', ui);
    var next = $('.ui-slider-arrow .item-right', ui);
    var tips = $('.ui-slider-process .p-item', ui);
    // 预先定义：索引current、图片个数size、轮播图区域宽度width、是否自动滚动enableAuto
    var current = 0;
    var size = items.size();
    var width = items.eq(0).width();
    var enableAuto = true;
    // 自定义具体操作：上翻页move_prev、下翻页move_next、圆点导航切换图片move_to、自动轮播图片auto_move
    wrap.on('move_prev', function () {
        current = current - 1;
        if (current < 0) {
            current = size - 1;
        }
        wrap.triggerHandler('move_to', current);
    });

    wrap.on('move_next', function () {
        current = current + 1;
        if (current >= size) {
            current = 0;
        }
        wrap.triggerHandler('move_to', current);
    });

    wrap.on('move_to', function (evt, index) {
        wrap.css('left', index*width*-1);
        tips.removeClass('item_click').eq(index).addClass('item_click');
    });

    wrap.on('auto_move', function () {
        setInterval(function () {
            enableAuto && wrap.triggerHandler('move_next');
        }, 2000);
    });
    // 事件
    prev.on('click', function () {
        wrap.triggerHandler('move_prev');
    });

    next.on('click', function () {
        wrap.triggerHandler('move_next');
    });

    tips.on('click', function () {
        var index = $(this).index();
        wrap.triggerHandler('move_to', index);
    });

    // 设置自动滚动感应
    ui.on('mouseover', function () {
        enableAuto = false;
    });

    ui.on('mouseout', function () {
        enableAuto = true;
    });

    wrap.triggerHandler('auto_move');
};

// 页面脚本逻辑
// 3.调用我们定义的uiSearch、uiTab、uiSlider方法
$(function () {
    $('.ui-search').uiSearch();

    $('.content-tab').uiTab('.capition > .item', '.container > .item');
    $('.content-tab .container .item').uiTab('.item-capition > a', '.item-content > .content-wrap');
    $('.content-tab .container .c-item').uiTab('.item-capition > a', '.item-content > .content-wrap');

    $('.ui-slider').uiSlider();
})









