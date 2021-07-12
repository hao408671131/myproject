<template>
    <div id="home">
        <div v-if="!showLoading">
            <Header></Header>
            <!--轮播图-->
            <Sowing :sowing_list="sowing_list"></Sowing>
            <!--中部导航-->
            <Nav :nav_list="nav_list"></Nav>
            <!--限时抢购-->
            <FlashSale :flash_sale_product_list="flash_sale_product_list"></FlashSale>
            <!--猜你喜欢-->
            <YouLike :you_like_product_list="you_like_product_list"></YouLike>
            <!--回到顶部-->
            <MarkPage v-if="showBackStatus" :scrollToTop="scrollToTop"></MarkPage>
        </div>
        <van-loading
                v-else
                type="spinner"
                color="#75a342"
                style="position: absolute;left: 50%;top: 40%;transform: translateX(-50%)"
        >
            小撩拼命加载中···
        </van-loading>

    </div>
</template>

<script>
    //1.引入  获取数据函数
    import {getHomeData}from './../../service/api/index'
    //2.引入组件
    import Header from "./components/header/Header";
    import Sowing from './components/sowing/Sowing'
    import Nav from "./components/nav/Nav";
    import FlashSale from "./components/flashSale/FlashSale";
    import YouLike from './components/youLike/YouLike'
    import MarkPage from './components/markPage/MarkPage'


    //3引入处理返回顶部的函数
    import {showBack, animate} from "./../../config/global";
    //4引入通知插件
    import PubSub from 'pubsub-js'
    //5引入vuex
    import {mapMutations, mapState} from 'vuex'
    import { Toast } from 'vant';
    //6.引入购物车接口
    import {addGoodsToCart} from './../../service/api/index'
    export default {
        name: "Home",
        data(){
            return{
                sowing_list:[],
                nav_list:[], //nav图片数据
                //限时抢购数据
                flash_sale_product_list:[],

                //猜你喜欢
                you_like_product_list:[],

                //判断是否显示返回顶部按钮
                showBackStatus: false,

                //是否显示加载图片  有可能数据到来之前，组件就已经渲染完成，导致组件出bug
                showLoading:true,
            }
        },
        computed:{
            ...mapState(['userInfo']),
        },
        mounted() {
            //订阅消息(添加到购物车的消息)
            PubSub.subscribe('homeAddToCart',(msg,goods)=>{
               if(msg==='homeAddToCart'){

                   // //判断用户是否登录
                    if(this.userInfo.token){//已经登录
                        this.dealGoodsAdd(goods);

                       this.add_goods({
                           goodsId:goods.id,
                           goodsName:goods.name,
                           smallImage:goods.small_image,
                           goodsPrice:goods.price
                       });
                       Toast({
                           message:'添加到购物车成功！',
                           duration:800
                       });
                   }else{//没有登录
                       this.$router.push('/login');
                   }

                }
            });
        },
        created() {

            this.reqData();

/*
            //2.请求网络数据   有可能数据到来之前，组件就已经渲染完成，导致组件出bug
            getHomeData().then(response=>{
                console.log(response);
                if(response.success){
                    //轮播图
                    this.sowing_list=response.data.list[0].icon_list;
                    //中部导航
                    this.nav_list=response.data.list[2].icon_list;
                    //限时抢购
                    this.flash_sale_product_list=response.data.list[3].product_list;
                    //猜你喜欢
                    this.you_like_product_list=response.data.list[12].product_list

                        //开始监听滚动  到达一定位置显示  返回顶部 按钮
                    showBack((status)=>{
                        this.showBackStatus=status;
                    })
                    //有可能数据到来之前，组件就已经渲染完成，导致组件出bug
                    //隐藏加载动画
                    this.showLoading=false;

                }
            }).catch(error=>{
                //todo...
            });
*/
        },

        methods:{
            ...mapMutations(['add_goods']),

            async reqData(){//用异步编程进行同步处理数据 getHomeData是一个promise，异步的
                let res=await getHomeData();//这里返回一个promise的结果，不管是resolve,还是rejiect
                //console.log(res);
                if(res.success){
                    //轮播图
                    this.sowing_list=res.data.list[0].icon_list;
                    //中部导航
                    this.nav_list=res.data.list[2].icon_list;
                    //限时抢购
                    this.flash_sale_product_list=res.data.list[3].product_list;
                    //猜你喜欢
                    this.you_like_product_list=res.data.list[12].product_list

                    //开始监听滚动  到达一定位置显示  返回顶部 按钮
                    showBack((status)=>{
                        this.showBackStatus=status;
                    })
                    //有可能数据到来之前，组件就已经渲染完成，导致组件出bug
                    //隐藏加载动画
                    this.showLoading=false;

                }
            },
            // 1. 滚回顶部
            scrollToTop() {
                // 做缓动动画返回顶部
                let docB = document.documentElement || document.body;
                animate(docB, {scrollTop: '0'}, 400, 'ease-out');
            },
            //2.添加商品到购物车
          async  dealGoodsAdd(goods){
                let result=await addGoodsToCart(goods.id,goods.name,goods.price,goods.small_image)
             // console.log(result);
          }
        },

        components:{
            MarkPage,
            YouLike,
            FlashSale,
            Header,
            Sowing,
            Nav
        },
        beforeDestroy() {
            PubSub.unsubscribe('homeAddToCart')
        }
    }
</script>

<style lang="less" scoped>
#home{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
</style>