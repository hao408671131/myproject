<template>
    <div id="dashboard">
        <!--dashboard的子页面(子路径的页面)会保留dashboard页面的内容，所以下面的UI组件会在
        dashboard的所有子页面显示，可以理解为dashboard页面(实质上是一个div)的子页面(div)插到这个div来 -->

        <van-tabbar v-model="active"active-color="#75a342"style="overflow: hidden">
            <van-tabbar-item  replace to="/dashboard/home">
                <span>首页</span>
                <template #icon="props">
                    <img :src="props.active ? home_icon.active : home_icon.inactive" />
                </template>
            </van-tabbar-item>

            <van-tabbar-item replace to="/dashboard/category">
                <span >分类</span>
                <template #icon="props">
                    <img :src="props.active ? category_icon.active : category_icon.inactive" />
                </template>
            </van-tabbar-item>

            <van-tabbar-item :badge="goodsNum >0 ?goodsNum:'' "replace to="/dashboard/cart">
                <span>购物车</span>
                <template #icon="props">
                    <img :src="props.active ? cart_icon.active : cart_icon.inactive" />
                </template>
            </van-tabbar-item>

            <van-tabbar-item replace to="/dashboard/mine">
                <span>我的</span>
                <template #icon="props">
                    <img :src="props.active ?mine_icon.active : mine_icon.inactive" />
                </template>
            </van-tabbar-item>

        </van-tabbar>


        <keep-alive>
            <!--当$route.meta.keepAlive存在时，此时进来的路由不刷新，用之前缓存好的数据-->
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <!--    想要进入dashboard 的子集路径，则要在这里设置路由出口   -->
        <!--当$route.meta.keepAlive不存在时，此时进来的路由刷新,重新获取数据-->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>

</template>

<script>
    import {mapMutations,mapState,mapActions}from'vuex'
    import {getGoodsCart}from'./../../service/api/index'
    import {setStore}from'./../../config/global'
    export default {
        name: "Dashboard",
        created() {
            //console.log(this.$route.path);
            if (this.$route.path==='/dashboard/category'){
                this.active=1;
            }
            else if(this.$route.path==='/dashboard/cart'){
                this.active=2;
            }
            else if(this.$route.path==='/dashboard/mine'){
                this.active=3;
            }
        },
        data() {
            return {
                active:0,
                home_icon: {
                    inactive: require('../../images/tabbar/home_default.png'),
                    active: require('../../images/tabbar/home_selected.png'),
                },
                category_icon: {
                    inactive: require('../../images/tabbar/category_default.png'),
                    active: require('../../images/tabbar/category_selected.png'),
                },
                cart_icon: {
                    inactive: require('../../images/tabbar/shoppingcart_default.png'),
                    active: require('../../images/tabbar/shoppingcart_selected.png'),
                },
                mine_icon: {
                    inactive: require('../../images/tabbar/mine_default.png'),
                    active: require('../../images/tabbar/mine_selected.png'),
                },
                computed:{
                    IsActive(num){
                        return num;
                    }
                }

            };
        },
        computed:{
            ...mapState(['shopCart','userInfo']),
            goodsNum(){//购物车商品数量
                let num=0;
                if(this.shopCart){

                    for (let shop in this.shopCart){
                        num+=this.shopCart[shop]['num'];
                    }
                        return num;
                }else{
                    return 0
                }
            }

        },
        create(){

        },
        beforeMount() {

        },

        mounted(){//页面初始化完毕之后进入此钩子
            //1.自动登录
            //this.reqUserInfo();
            //2.初始化购物车数据

                this.initShopCart();
        },
        methods:{
            ...mapMutations(['init_shop_cart']),
            ...mapActions(['reqUserInfo']),
            async initShopCart(){
               await this.reqUserInfo();
                if(this.userInfo.token){
                    let result=await getGoodsCart();
                    if(result.success_code===200){
                        let cartArr=result.data;
                        let shopCart={};
                        cartArr.forEach((value)=>{
                            shopCart[value.goods_id]={
                                "num": value.num,
                                "id": value.goods_id,
                                "name": value.goods_name,
                                "small_image": value.small_image,
                                "price": value.goods_price,
                                "checked": value.checked
                            }
                        });
                        setStore('shopCart',shopCart)//把从服务器拿到的数据同步到本地
                        this.init_shop_cart();//初始化vuex中的shopCart
                    }

                }


            }
        }

    }
</script>

<style lang="less" scoped>
    #dashboard{
        width: 100%;
        height: 100%;

    }
</style>