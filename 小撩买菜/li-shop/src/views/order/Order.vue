<template>
    <div id="order">
        <van-nav-bar
                title="填写订单"
                left-text="返回"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
                :border=true
                :placeholder=true
                style="margin-bottom: 0.3rem"
        />
        <!--收货地址-->
        <van-contact-card
                :type="address_type"
                add-text="选择收货地址"
                :name="address_name"
                :tel="address_phone"
                @click="chooseAddress"
        ></van-contact-card>



        <van-cell-group style="margin-top: 0.5rem">

            <van-cell title="送达时间"  :value="arriveDate"is-link  @click="dateShow=!dateShow"></van-cell>
            <div @click="seeDetail">
                <van-cell :value="'共'+goodsCount+'件'" :center=true is-link style="height:5rem;overflow: hidden;">
                    <!-- 使用 title 插槽来自定义标题 -->
                    <template slot="title" >
                        <div style="display:flex;flex-wrap: nowrap;width: 9rem;overflow: hidden">
                            <div v-for="(shopCart,index) in threeShopCart">
                                <img :src="shopCart.small_image" alt=""style="width: 3rem" >
                            </div>
                        </div>

                    </template>
                </van-cell>
            </div>

        </van-cell-group>



        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="支付方式"  value="微信"is-link ></van-cell>
        </van-cell-group>


        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="备注" >
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template slot="right-icon">
                    <input type="text"placeholder="选填，请备注您的特殊需求"v-model="notice">
                </template>
            </van-cell>
        </van-cell-group>


        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="商品金额"  :value="totalPrice|wholeMoneyFormat"is-link ></van-cell>
            <van-cell title="配送费"  :value="`¥${disPrice}`" is-link ></van-cell>
        </van-cell-group>

        <van-submit-bar
                :price="3050"
                button-text="提交订单"
                label="实付"
                @submit="onSubmit" />

            <!--弹出日期组件-->
        <van-popup round v-model="dateShow" position="bottom" >
            <van-datetime-picker
                v-model="currentDate"
                type="datetime"
                title="选择年月日"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="confirm"
                @cancel="cancel"
                                 />
        </van-popup>

        <!--支付二维码-->
        <van-popup  v-model="isPay" round position="center">
            <qriously :value="qrcode" :size="200" />
        </van-popup>

        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import PubSub from 'pubsub-js'
    import Moment from 'moment'
    import {mapState} from 'vuex'
    import {Toast}from'vant'
    import {postOrder, orderPaySuccess, getWXCode, queryPayStatus, getAllSelectedGoods, delAllSelectedGoods} from'./../../service/api/index'
    export default {
        name: "Order",
        data(){
            return{
                // 1. 地址
                address_type: 'add', // 地址卡片类型
                address_name:'', // 收货人
                address_phone:'', // 收货人电话
                address_id: '', // 收货人地址ID

                // 2. 日期
                dateShow: false,
                minDate: new Date(),
                maxDate: new Date(2021,12,1),
                currentDate: new Date(),
                // 3. 送达时间
                arriveDate: '请选择送达时间',
                // 4. 备注
                notice: null,

                isPay: false, // 是否显示二维码蒙版
                qrcode: null, // 生成二维码的URL地址
            }
        },
        computed:{
            ...mapState(['userAddress','shopCart','userInfo']),
            //商品总件数
            goodsCount(){
                let selectedGoodsCount = 0;
                Object.values(this.shopCart).forEach((goods, index)=>{
                    if(goods.checked){
                        selectedGoodsCount += 1;
                    }
                });
                return selectedGoodsCount;
            },
            //商品总价
            //2.计算商品总价
            totalPrice(){
                let totalPrice=0;
                Object.values(this.shopCart).forEach((goods,index)=>{
                    if(goods.checked){
                        totalPrice+=goods.num*goods.price;
                    }
                });
                return totalPrice;
            },
            //  取购物车中前三件选中的
            threeShopCart(){
                let shopCart = [];
                Object.values(this.shopCart).forEach((goods, index)=>{
                    if(goods.checked){
                        shopCart.push(goods);
                    }
                });
                return shopCart.slice(0, 3);
            },

            // 配送费
            disPrice(){
                // 商品总价 > 40 免配送费  <40 6元
                if(this.totalPrice > 40){
                    return 0;
                }else {
                    return 6;
                }
            }
        },

        mounted() {
            // 接收收货地址
            if (this.userAddress.address_id) {

                    // 修改卡片的类型
                    this.address_type = 'edit';
                    this.address_name = this.userAddress.name;
                    this.address_phone = this.userAddress.tel;
                    this.address_id = this.userAddress.address_id;
                }

        },
        methods:{
            seeDetail(){
                this.$router.push('/confirmOrder/orderDetail');
            },
            //选中日期的取消按钮
            cancel(){
                this.dateShow=!this.dateShow;
            },
            //选中日期的确认按钮
            confirm(value){
                console.log(value);
                this.dateShow=!this.dateShow;
                //送达时间
                this.arriveDate=Moment(value).format(" YYYY-MM-DD, HH:mm");
            },
            // 3.提交订单
            async onSubmit() {
                // 3.1 数据验证
                if(!this.address_id){
                    Toast({
                        message: '请选择收货地址',
                        duration: 500
                    });
                    return;
                }

                if(this.arriveDate === '请选择送达时间'){
                    Toast({
                        message: '请选择送达时间',
                        duration: 500
                    });
                    return;
                }

                if(!this.notice){
                    Toast({
                        message: '请添加注意事项',
                        duration: 500
                    });
                    return;
                }

                // 3.2 处理订单相关
                if(this.userInfo.token){
                    // 3.2.1 查询购物车订单
                    let goodsResult = await getAllSelectedGoods();
                    // console.log(goodsResult);
                    // 3.2.2 创建订单
                    if(goodsResult.success_code === 200){
                        let orderResult = await postOrder(this.userInfo.token, this.address_id, this.arrive_time, goodsResult.data, this.notice, this.totalPrice, this.disPrice);
                        console.log(orderResult);
                        // 3.3.3 删除购物车中已经生成订单的商品
                        if(orderResult.success_code === 200){
                            let delResult = await delAllSelectedGoods();
                            console.log(delResult);
                            // 3.3.4 发起微信支付
                            if(delResult.success_code === 200){
                                // 测试，测试，测试
                                /*
                                let urlResult = await getWXCode(orderResult.data.order_id, 1);

                                console.log(urlResult);
                                if(urlResult.code_url){ // 有值
                                    this.isPay = true;
                                    this.qrcode = urlResult.code_url;
                                    // 3.3.5 验证用户是否扫码
                                    let payResult = await queryPayStatus(orderResult.data.order_id);
                                    console.log(payResult);
                                    if(payResult.success){
                                        Toast({
                                            message: payResult.message,
                                            duration: 1000
                                        });
                                        this.isPay = false;*/
                                        // 3.3.6 通知自己服务器订单支付成功
                                        let statusResult = await orderPaySuccess(this.userInfo.token, orderResult.data.order_id);
                                        console.log(statusResult);
                                        if(statusResult.success_code === 200){
                                            // 3.3.7 跳转到我的
                                            this.$router.replace('/dashboard/mine');

                                        }
                                    }
                                }
                            }
                    /*else {
                                Toast({
                                    message: '订单处理出现问题！',
                                    duration: 500
                                });
                            }
                        }else {
                            Toast({
                                message: '购物车同步出现问题！',
                                duration: 500
                            });
                        }
                    }
                    */
                    else {

                        Toast({
                            message: '获取订单商品失败！',
                            duration: 500
                        });
                    }
                }
            },
            //点击了左边
            onClickLeft(){
               this.$router.back();
            },
            //选择地址
            chooseAddress() {
                this.$router.push('/confirmOrder/myAddress');
            },
        },
    }
</script>

<style scoped>
#order{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}

</style>