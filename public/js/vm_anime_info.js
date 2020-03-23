import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

window.onload = function(){

var search = window.location.search;
var anime_id = getSearchString('id',search);




axios.get('http://167.179.81.168/bangumi/'+anime_id)
.then(function(response){
    var data = response.data[0];

    console.log(data);



   
            
    var new_str = '';
    for(var j = 0;j < data.staff_list.length;j++){
        if(data.staff_list[j] == '\''){
            if(data.staff_list[j-1]==','||data.staff_list[j+1]==','||data.staff_list[j-1]==':'||data.staff_list[j+1]==':'||data.staff_list[j-1]=='{'||data.staff_list[j+1]=='}'){
                new_str+='\"';continue;
            }
            else {new_str+='‘';continue;}
        }
        if(data.staff_list[j] == '\"'){new_str+='“';continue;}
        new_str+=data.staff_list[j];
    }
    

    var staff_list = JSON.parse(new_str);
    var main_list = {};
    var other_info = {};

    

    for(let attribute in staff_list){
       
       
      if(attribute == '导演'||attribute == '总导演'||attribute == '副导演'||attribute == '脚本'||attribute == '音乐'||attribute == '作画监督'||attribute == '总作画监督'){
          main_list[attribute] = staff_list[attribute];
      }
      else other_info[attribute] = staff_list[attribute];
    }
    console.log(main_list);




    anime_info.staff_list = staff_list;
    anime_info.name = data.name;
    anime_info.bangumi_id = data.bangumi_id;
    anime_info.cover_url = data.cover_url;
    anime_info.bangumi_score = data.bangumi_score;
    anime_info.vote_num = data.vote_num;
    anime_info.episode_num = data.episode_num;
    anime_info.desc = data.desc;
    anime_info.main_list = main_list;
    anime_info.other_info  = other_info;
    anime_info.cv_list = data.cv_list;

});




axios.get('http://167.179.81.168:8010/CB/'+anime_id)
.then(function(response){
    var data = response.data;
    console.log(data);
   for(var i = 0;i < data.length;i++){

       var new_anime={
       'id':data[i].bangumi_id,
       'url':data[i].cover_url,
       'score':data[i].bangumi_score,
       'name':data[i].name

    }
    rec_info.animes.push(new_anime);
   }
    
});


}


var anime_info = new Vue({
    el:'#anime_info',
    data:{
       name:'',
       bangumi_id:'',
       cover_url:'',
       bangumi_score:'',
       vote_num:'',
       episode_num:'',
       desc:'',
       main_list:[],
       other_info:[],
       cv_list:[],
       cv_list:''
    },
    computed: {
        one_star_array:function(){
            var result = [];
            for(var i = 1;i <= this.bangumi_score/2;i++)result.push(1);
            return result;
        },
        half_star:function(){
            return parseInt(this.bangumi_score + 0.5) % 2 == 0?0:1;
        }
    },
    methods:{
        handle_fav:function(){
            if(!sessionStorage.getItem('login_status')){
                alert("请先登录");
                window.location.href='/index.html';
            }else{
                var username = sessionStorage.getItem('username');
                var req_id = this.bangumi_id;
               
                axios.get('http://167.179.119.126:1323/api/user/username/'+username+'/addBangumi/'+req_id).then(
                    function(){
                        
                        axios.get('http://167.179.119.126:1323/api/user/username/'+username).then(
                        function(response){
                            var data = response.data;
                            sessionStorage.setItem("fav_list",data.bangumi_list);
                            alert("收藏成功");
                        
                    }
                ); 
                
            }
                );
        }


    }
}})




var rec_info = new Vue({
el:'#rec_info',
data:{
    animes:[

    ],


},
methods:{
    handleRecFav:function(){
        if(!sessionStorage.getItem('login_status'))alert("请先登录");
        else {
            var username = sessionStorage.getItem('username');
            var el_id = event.target.id;
            var req_id = el_id.substring(3);
            axios.get('http://167.179.119.126:1323/api/user/username/'+username+'/addBangumi/'+req_id).then(
                function(){
                    axios.get('http://167.179.119.126:1323/api/user/username/'+username).then(
                    function(response){
                        var data = response.data;
                        sessionStorage.setItem("fav_list",data.bangumi_list);
                        
                        alert("收藏成功");
                    }
                );
                }
            ); 
    }
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