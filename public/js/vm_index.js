import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'


window.onload = function(){




   
var search = window.location.search;
var page_key = getSearchString('page',search);
index_rec.cur_page=page_key>0?parseInt(page_key):1;


axios.get('http://167.179.81.168/bangumiAll/'+index_rec.cur_page)
.then(function(response){
    var data = response.data;
    console.log(data);
    for(var i = 0;i < data.length;i++){

        var new_anime = {
            name:data[i].name,
            id:data[i].bangumi_id,
            cover_url:data[i].cover_url,
            score:data[i].bangumi_score
        }
        index_rec.animes.push(new_anime);
    }

});


}





var index_rec = new Vue({
    el:'#index_rec',
    data:{
        cur_page:4,
        total_page:223,
        animes:[  
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