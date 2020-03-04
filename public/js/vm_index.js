import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'


window.onload= function(){

/*axios.get('http://www.baidu.com/s?wd=关键字')
.then(function(response){console.log(response)});*/
   
$.ajax({
    type:'GET',
    url:'http://www.baidu.com/s?wd=关键字',
    datatype:'jsonp',
    success:function(response){console.log(response);}


})


}





var index_rec = new Vue({
    el:'#index_rec',
    data:{
        animes:[
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
        login_show:0
    },
    methods:{
        handleClick:function(){
            this.login_show = 1;
        }
    }
});