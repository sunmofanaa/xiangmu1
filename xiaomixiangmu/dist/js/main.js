console.log("加载成功");

// 配置项目用到的第三方模块
require.config({
    paths:{
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav": "nav",
        "slide":"slide",
        "data":"data"
    },
    shim: {
        // 依赖关系
        "jquery-cookie" : ["jquery"]  // jquery-cookie依赖jquery开发的
    }
})
require(["nav","slide","data"],function(nav, slide,data){
    nav.download();
    nav.banner();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();
    // 商品数据列表加载部分
    slide.download();
    slide.slideTab();
    // 主页的数据
    data.download();
    data.tabMenu()
})