import Vue from "vue";

//人民币过滤器
Vue.filter('wholeMoneyFormat',(value)=>{
    return '¥'+Number(value).toFixed(2)//保留两位小数;
});