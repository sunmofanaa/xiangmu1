// const { table, clear } = require("console");

define(["jquery"],function($){
    // 下载数据的函数
    function download(){
        $.ajax({
            url:"../data/slide.json",
            success:function(result){
                var slideArr = result.data.list.list;
                for(var i = 0; i < slideArr.length; i++){
                    $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                    <a href="#" target = "_blank">
                        <div class = 'content'>
                            <div class = 'thumb'>
                                <img width="160" height="160" src="${slideArr[i].img}" alt=""/>
                            </div>
                            <h3 class = 'title'>"${slideArr[i].goods_name}</h3>
                            <p class = 'desc'>${slideArr[i].desc}</p>
                            <p class = 'price'>
                                <span>${slideArr[i].seckill_Price}</span>元
                                <del>${slideArr[i].goods_price}</del>
                            </p>
                        </div>
                    </a>
                </li>`).appendTo("#J_flashSaleList ul")
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }


    // 商品列表的滚动
    function slideTab(){
        // 获取页面上的左右按钮的标签
        var aSpans = $(".swiper-controls") .find("span");
        var iNow = 0;  // 显示的第一组图片，默认下标从0开始的，每四个图片为一组,iNow代表显示的是第几组数据
        var count = Math.ceil(26 / 4) - 1;
        // 启动一个定时器，让他自己去进行滚动
        var timer = setInterval(function(){
            iNow++;
            tab();
            if(iNow == count){
                clearInterval(timer);
            }
        },4000);

        // 滚动的方法
        function tab(){
            iNow == 0 ? aSpans.eq(0).addClass("swiper-button-disabled") : aSpans.eq(0).removeClass("swiper-button-disabled");
            iNow == count ? aSpans.eq(1).addClass("swiper-button-disabled") : aSpans.eq(1).removeClass("swiper-button-disabled");
            // 计算最终要运动的目的值
            var iTarget = iNow == count ? iNow * (-992) + 496 : iNow * (-992);
            $("#J_flashSaleList ul").css({
                transform: `translate3d(${iTarget}px, 0px, 0px)`,
                transitionDuration:`1000ms`
            })
            if(iNow == count){
                clearInterval(timer);
                iNow = 0
            }
        }
        aSpans.click(function(){
            if($(this).index() == 0){
                // 左箭头方向
                iNow--;
                iNow = Math.max(0,iNow);
            }else{
                iNow++;
                iNow = Math.min(count,iNow);
            }
            tab();
        })
        // 移入移出动画停下来
        $("#J_flashSaleList").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            var timer = setInterval(function(){
                iNow++;
                tab();
                if(iNow == count){
                    clearInterval(timer);
                }
            },4000)
        })
    }
    return {
        download:download,
        slideTab:slideTab
    }
});