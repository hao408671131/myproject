<template>
    <div id="myAddress">
        <!--导航栏-->
        <van-nav-bar
                title="我的地址"
                left-text="返回"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
                :border=true
                :placeholder=true

        />
            <!--选择收货地址-->
            <van-address-list
                    v-model="chosenAddressId"
                    :list="list"
                    :disabled-list="disabledList"
                    disabled-text="以下地址超出配送范围"
                    default-tag-text="默认"
                    @select="onBackAddress"
                    @add="onAdd"
                    @edit="onEdit"

            />


    </div>
</template>

<script>
    import {Toast} from "vant";
    import {getUserAddress}from './../.././../service/api/index'
    import {mapState,mapMutations}from 'vuex'
    import PubSub from 'pubsub-js'
    export default {
        name: "MyAddress",
        data() {
            return {
                chosenAddressId: '1',
                list: [
                    {
                        id: '1',
                        name: '张三',
                        tel: '13000000000',
                        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                        isDefault: true,
                    },
                    {
                        id: '2',
                        name: '李四',
                        tel: '1310000000',
                        address: '浙江省杭州市拱墅区莫干山路 50 号',
                    },
                ],
                disabledList: [
                    {
                        id: '3',
                        name: '王五',
                        tel: '1320000000',
                        address: '浙江省杭州市滨江区江南大道 15 号',
                    },
                ],
            };
        },
            mounted() {
            this.initUserAddress();
            },
        computed:{
            ...mapState(['userInfo'])
        },
        methods:{
            onClickLeft(){
                //this.$router.back();
                this.$router.go(-1);
            },
            onAdd() {
                //Toast('新增地址');
                this.$router.push('/confirmOrder/myAddress/addAddress')
            },
            onEdit(item, index) {
                //Toast('编辑地址:' + index);
                this.$router.push('/confirmOrder/myAddress/editAddress?address_id='+item.address_id);
            },
            ...mapMutations(['init_user_address']),
            // 返回选中的地址
           onBackAddress(item,index){
                if(item){
                    this.init_user_address(item);
                    // 返回上一级界面
                    this.$router.back();
                   // console.log(item)
                }
            },
            //获取当前用户的地址
          async  initUserAddress(){
                if(this.userInfo.token){//处于登录状态
                    let result=await getUserAddress(this.userInfo.token);
                    if(result.success_code === 200){
                        let addressArr = result.data;
                        this.list = [];
                        addressArr.forEach((address, index)=>{
                            let addressObj = {
                                id: String(index + 1),
                                name: address.address_name,
                                tel: address.address_phone,
                                address: address.address_area + address.address_area_detail,
                                address_id: address._id,
                                user_id: address.user_id
                            };
                            // 追加到数组
                            this.list.push(addressObj);
                        });
                    }else {
                        Toast({
                            message: '获取地址失败！',
                            duration: 400
                        })
                    }
                }else{
                    Toast({
                        message:'登录已过期，请退出登录！',
                        duration:400
                    })
                }

            }
        },
        beforeDestroy() {
            PubSub.unsubscribe('ss');
        }
    }
</script>

<style scoped>
#myAddress{
    height: 100%;
    background-color:#f5f5f5;


}

</style>