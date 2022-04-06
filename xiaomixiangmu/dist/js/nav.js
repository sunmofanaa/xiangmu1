// const { abort } = require("process");

// 处理首页的导航部分（顶部导航栏、侧边导航栏、banner图）
define(["jquery"],function($){  // 第一个参数是数组，第二个参数是回调函数
    function download(){
        // 请求数据
        $.ajax({
            type: "get",
            url: "../data/nav.json",
            success:function(result){
                var bannerArr = result.banner;
                // 通过循环添加到页面上
                for(var i = 0; i < bannerArr.length; i++){
                    // 轮播的图片
                    $(`<a href ="${bannerArr[i].url}">
                    <img class = 'swiper-lazy swper-lazy-loaded' src='../images/banner/${bannerArr[i].img}' alt=""
                    </a>`).appendTo("#J_homeSwiper .swiper-slide");
                    // 小圆点
                    var node = $(`<a href="#" class = 'swiper-pagination-bullet'></a>`);
                    // // 默认情况下，第一张图片对应第一个小圆点亮
                    if(i == 0){
                        node.addClass("swiper-pagination-bullet-active") 
                    }
                    node.appendTo("#J_homeSwiper .swiper-pagination")
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })

        leftNavDownload();
        topNavDownload();
    }
    // 单独一个函数 实现轮播图的轮播效果
    function banner(){
        var iNow = 0; // Now当前显示的图片的下标,默认是0
        var aImgs = null; // 记录图片
        var aBtns = null; // 记录小圆圈

    // 自动轮播的效果
        var timer = setInterval(function(){
            iNow++;
            tab();
        },2500)
        // 封装切换函数
        function tab(){
            if(!aImgs){
                aImgs = $("#J_homeSwiper .swiper-slide").find("a")
            }
            if(!aBtns){
                aBtns = $("#J_homeSwiper .swiper-pagination").find("a")
            }
            if(iNow == 5){
                iNow = 0
            }
            // 图片切换
            aImgs.hide().css("opacity",0.2).eq(iNow).show().animate({opacity:1},500);
            // 小圆点的切换
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
        }

        // 添加鼠标的移入和移出
        $("#J_homeSwiper, .swiper-button-next, .swiper-button-prev").mouseenter(function(){
            clearInterval(timer)
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2500)
        })

        // 点击小圆圈，可以完成切换到对应的图片，使用事件委托
        $("#J_homeSwiper .swiper-pagination").on("click","a",function(){
            iNow = $(this).index();
            tab();
            return false; // 阻止 a 链接的默认行为
        })

        $(".swiper-button-next, .swiper-button-prev").click(function(){
            if(this.className == "swiper-button-prev"){
                iNow--;
                if(iNow == -1){
                    iNow = 4;
                }
            }else{
                iNow++;
            }
            tab();
        })
    }

    // 左侧侧边导航栏数据的加载 
    function leftNavDownload(){
        $.ajax({
            url:"../data/nav.json",
            success:function(result){
                var sideArr = result.sideNav;
                for(var i = 0; i < sideArr.length; i++){
                    var node = $(`<li class = 'category-item'>
                    <a href="/index.html" class = 'title'>
                        ${sideArr[i].title}
                        <em class = 'iconfont-arrow-right-big'></em>
                    </a>
                    <div class="children clearfix">
                        
                    </div>
                </li> `);
                    node.appendTo("#J_categoryList")
                    // 取出当前这个选项的子节点
                    var childArr = sideArr[i].child;
                    // 计算一共多少列
                    var col = Math.ceil(childArr.length / 6);
                    // 计算一共多少列,设置对应的class样式
                    node.find("div.children").addClass("children-col-" + col)
                    // 通过循环创建右侧的子选项
                    for(var j = 0; j < childArr.length; j++){
                        if(j % 6 == 0){
                            var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}"></ul>`);
                            newUl.appendTo(node.find("div.children"));
                        }
                        $(`<li>
                        <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                            <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                            <span class="text">${childArr[j].title}</span>
                        </a>
                    </li>`).appendTo(newUl);
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    // 给侧边导航添加移入切换的效果  ==>  选项卡的切换效果
    function leftNavTab(){
        // 通过事件委托，给页面上的选项添加移入移出
        $("#J_categoryList").on("mouseenter",".category-item",function(){
            $(this).addClass("category-item-active")
        })
        $("#J_categoryList").on("mouseleave",".category-item",function(){
            $(this).removeClass("category-item-active")
        })
    }

    // 下载顶部导航的数据的函数
    function topNavDownload(){
        $.ajax({
            url: "../data/nav.json",
            success:function(result){
                var topNavArr = result.topNav;
                topNavArr.push({title:"服务"},{title:"社区"})
                for(var i = 0; i < topNavArr.length; i++){
                    $(`<li data-index="${i}" class="nav-item">
                        <a href="javascript: void(0);"class="link">
                            <span class="text">${topNavArr[i].title}</span>
                        </a>
                    </li>`).appendTo(".site-header .header-nav .nav-list");
                        var node = $(`<ul class ='children-list clearfix' style="display:${i == 0 ? "block" : "none"}"></ul>`);
                        node.appendTo("#J_navMenu .container");
                        // 取出所有的子菜单
                        if(topNavArr[i].childs){
                            var childArr = topNavArr[i].childs;
                            for(var j = 0; j < childArr.length; j++){
                                $(`<li>
                                <a href="#">
                                    <div class="figure figure-thumb">
                                        <img src="${childArr[j].img}" alt="">
                                    </div>
                                    <div class="title">${childArr[j].a}</div>
                                    <p class="price">${childArr[j].i}</p>
                                </a>
                            </li>`).appendTo(node);
                            }
                        }
                }
            },
            error: function(msg){
                console.log(msg)
            }
        })
    }
    
    // 给顶部导航添加移入移出效果
    function topNavTab(){
        $(".header-nav .nav-list").on("mouseenter",".nav-item",function(){
            $(this).addClass("nav-item-active");
            // 找出当前移入这个a标签的下标
            var index = $(this).index() - 1;
            if(index >= 0 && index <= 6){
                $("#J_navMenu").css({display:"block"}).removeClass("slide-up").addClass("slide-down");
                $("#J_navMenu .container").find("ul").eq(index).css("display","block").siblings("ul").css("display","none")
            }
        })
        $(".header-nav .nav-list").on("mouseleave",".nav-item",function(){
            $(this).removeClass("nav-item-active");
        })
        $(".site-header").mouseleave(function(){
            $("#J_navMenu").css({display:"block"}).removeClass("slide-down").addClass("slide-up")
        })
    }

    // list列表页的 侧边栏  鼠标移入移出添加效果
    function allGoodsTab(){
        $(".header-nav .nav-list").on("mouseenter",".nav-category",function(){
            $(this).addClass("nav-category-active");
            $(this).find(".site-category").css("display","block");
        })

        $(".header-nav .nav-list").on("mouseleave",".nav-category",function(){
            $(this).removeClass("nav-category-active");
            $(this).find(".site-category").css("display","none");
        })
    }


    // 搜索框
    function searchTab(){
        $("#search").focus(function(){  // 获取到焦点以后
            $("#J_keywordList").removeClass("hide").addClass("show")
        }).blur(function(){
            $("#J_keywordList").removeClass("show").addClass("hide");
        })
    }

    return {
        download: download,  // 向外暴露一下
        banner: banner,
        leftNavTab: leftNavTab,
        topNavTab:topNavTab,
        searchTab:searchTab,
        topNavDownload:topNavDownload,
        leftNavDownload:leftNavDownload,
        allGoodsTab:allGoodsTab
    }
})