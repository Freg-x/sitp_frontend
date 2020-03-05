import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'


window.onload = function(){

/*axios.get('http://167.179.81.168:8010/CB/305')
.then(function(response){console.log(response)});*/
   
var search = window.location.search;
var page_key = getSearchString('page',search);
index_rec.cur_page=page_key>0?parseInt(page_key):1;



}





var index_rec = new Vue({
    el:'#index_rec',
    data:{
        cur_page:4,
        total_page:300,
        animes:[
            {name:'名侦探柯南',id:51,cover_url:'https://lain.bgm.tv/pic/cover/c/01/88/899_Q3F3X.jpg',score:7.6},
            {name:'2'},
            {name:'3'},
            {name:'4'},
            {name:'5'},
            {name:'6'},
            {name:'7'},
            {name:'8'},
            {name:'1'},
            {name:'2'},
            {name:'3'},
            {name:'4'},
            {name:'5'},
            {name:'6'},
            {name:'7'},
            {name:'8'},
            {name:'1'},
            {name:'2'},
            {name:'3'},
            {name:'4'}
            
        ]
    },
    methods:{

    }
})


var navbar = new Vue({
    el:'#navbar',
    data:{
        login_status:0,
        login_show:0
    },
    methods:{
        handleClick:function(){
            this.login_show = 1;
            console.log(index_rec.animes);
        }
    }
});







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