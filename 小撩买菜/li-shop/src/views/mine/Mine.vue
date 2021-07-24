<template>
    <div id="mine"v-if="userInfo.token">
        <van-nav-bar
                title="我的"
                :fixed=true
                :border=false

        />

        <van-cell-group style="margin-top: 2.6rem"@click="toUserCenter">
            <van-cell 
                    style="background-color:#2eba5a;color: #fff"
                    is-link
                    :center=true
            >
                <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title">
                    <div class="personMsg">
                        <img src="./images/567.jpg" alt="">
                        <div class="personInfo">
                            <span>{{userInfo.real_name}}</span>
                            <span>手机号：{{userInfo.phone}}</span>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>



        <van-cell-group >
            <van-cell :center=true
                      icon="label"
                      title="我的订单"
                      value="查看全部订单"
                      is-link
                      @click="TomyOrder"
            ></van-cell>

            <van-grid :column-num="4">
                <van-grid-item
                        v-for="(order,index) in orderData"
                        :key="index"
                        :icon='order.icon'
                        :text="order.title"
                        @click="TomyOrder"
                />
            </van-grid>
        </van-cell-group>


        <van-cell-group >
        <van-cell :center=true
                  icon="gold-coin"
                  title="我的优惠券"
                  value="1张"
                  is-link
                    style="margin-top: 0.5rem"></van-cell>

        <van-cell :center=true
                  icon="balance-list"
                  title="我的收货地址"
                  value=""
                  is-link  ></van-cell>
        </van-cell-group>



        <van-cell-group >
        <van-cell :center=true
                  icon="phone"
                  title="联系客服"
                  value="客服时间 07:00-22:00"
                  style="margin-top: 0.5rem"
                  is-link  ></van-cell>

        <van-cell :center=true
                  icon="smile-comment"
                  title="意见反馈"
                  value=""
                  is-link  ></van-cell>
        </van-cell-group>



        <van-cell-group >
            <van-cell :center=true
                      icon="gift-card"
                      title="小撩买菜"
                      value="下载APP体验更佳"
                      style="margin-top: 0.5rem"
                      is-link  ></van-cell>

        </van-cell-group>
    </div>
    <SelectLogin v-else></SelectLogin>
</template>

<script>
    import SelectLogin from "../login/SelectLogin";
    import {mapState} from "vuex";

    export default {
        name: "Mine",
        methods:{
            //进入我的订单页面
            TomyOrder(){
                this.$router.push('/mine/mineOrder');
            },
            toUserCenter(){
                this.$router.push('/mine/userCenter')
            }
        },
        data(){
            return{
                orderData:[
                    {icon:"cart-circle-o",title:'待支付'},
                    {icon:"point-gift-o",title:'待收货'},
                    {icon:'smile-comment-o',title:'待评价'},
                    {icon:'cash-back-record',title:'售后/退款'}
                    ]
            }
        },
        components:{
            SelectLogin
        },
        computed:{
            ...mapState(['shopCart','userInfo']),
        }
    }
</script>

<style lang="less" scoped>
    #mine{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }
    .van-nav-bar{
        background-color:#2eba5a;
        z-index: 12;
    }
    #mine::v-deep .van-nav-bar__title{
        color: white;
        font-size: 1rem;
    }
    .personMsg{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .personMsg>img{
        width: 4rem;
        height: 4rem;
        border-radius: 2rem;
        border: 0.1rem solid #fff;
    }
    .personInfo{
        display: flex;
        flex-direction: column;
        margin-left: 0.8rem;
    }
    .van-cell__left-icon{
        color:orangered;
        font-size: 1.2rem;
    }

</style>