import Vue from 'vue'
import Router from'vue-router'

Vue.use(Router);

//引入一级组件

import DashBoard from "./../views/dashboard/Dashboard";

const Home=()=>import('./../views/home/Home');//懒加载
const Cart=()=>import('./../views/cart/Cart');
const Mine=()=>import('./../views/mine/Mine');
const Category=()=>import('./../views/category/Category');
//引入组件相关
const Order=()=>import('./../views/order/Order');
const MyAddress=()=>import('./../views/order/children/MyAddress');
const AddAddress=()=>import('./../views/order/children/AddAddress');
const EditAddress=()=>import('./../views/order/children/EditAddress');
const Login=()=>import('./../views/login/Login');
const UserCenter=()=>import('./../views/mine/children/UserCenter');
const OrderDetail=()=>import('./../views/order/children/OrderDetail');
const MineOrder=()=>import('./../views/mine/children/MineOrder');
export default new Router({
    routes:[
        {path:'/',redirect:'/dashboard'},
        {
            path: '/dashboard',
            name:'dashboard',
            component:DashBoard,
            children:[
                {path:'/dashboard',redirect:'/dashboard/home'},
                {path:'home',name:'home',component:Home,meta:{keepAlive:true}},//用路由做页面缓存，不用每次都重新获取数据
                {path:'category',name:'category',component:Category,meta:{keepAlive:true}},
                {path:'mine',name:'mine',component:Mine,meta:{animations:'five'}},
                {path:'cart',name:'cart',component:Cart },//做路由动画
            ]

        },
        {   path:'/confirmOrder',name:'order',component:Order,meta:{animations:'zero'}},

        {   path: '/confirmOrder/myAddress', name: 'myAddress', component: MyAddress,meta:{animations:'one'}},

        {   path:'/confirmOrder/myAddress/addAddress',name:'addAddress',component:AddAddress,meta:{animations:'two'}},

        {   path:'/confirmOrder/myAddress/editAddress',name:'editAddress',component:EditAddress,meta:{animations:'three'}},

        {path:'/login',name:'login',component:Login},

        {path:'/mine/userCenter',name:'userCenter',component:UserCenter,meta:{animations:'four'}},

        {path:'/confirmOrder/orderDetail',name:'orderDetail',component:OrderDetail,meta:{animations:'seven'}},
        {path:'/mine/mineOrder',name:'mineOrder',component:MineOrder,meta:{animations:'six'}}
        ]

});