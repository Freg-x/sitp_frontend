import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

window.onload= function(){
    var search = window.location.search;
    var search_key = getSearchString('key',search);
    alert(search_key);





}

function getSearchString(key, Url) {
    var str = Url;
    str = str.substring(1, str.length); // 获取URL中?之后的字符（去掉第一位的问号）
   
    var arr = str.split("&");
    var obj = new Object();
    // 将每一个数组元素以=分隔并赋给obj对象
    for (var i = 0; i < arr.length; i++) {
        var tmp_arr = arr[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
    }
    return obj[key];
}

var navbar = new Vue({
    el:'#navbar',
    data:{
        login_show:0
    },
    methods:{
        handleClick:function(){
            this.login_show = 1;
        }
    }
});