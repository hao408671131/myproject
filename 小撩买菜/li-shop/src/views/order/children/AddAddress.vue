<template>
    <div id="AddAddress">
        <van-nav-bar
                title="添加地址"
                left-text="返回"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
                :border=true
                :placeholder=true

        />
        <van-address-edit
                :area-list="areaList"
                show-postal
                show-set-default
                show-search-result
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @change-detail="onChangeDetail"
        />

    </div>
</template>

<script>
    import { Toast } from 'vant';
    import areaList from './../../../config/area'
    import {mapState,mapMutations}from 'vuex'
    import {addUserAddress} from "../../../../../lk-shop(最新)/lk-shop/src/service/api";
    export default {
        name: "AddAddress",
        data() {
            return {
                areaList:areaList,//省/市/地区
                searchResult: [],
            };
        },
        computed:{
            ...mapState(['userInfo'])
        },
        methods: {
            ...mapMutations(['init_user_info']),
            onClickLeft(){
                this.$router.back();
            },
            async onSave(content) {
                Toast('save');
                let result = await addUserAddress(this.userInfo.token, content.name, content.tel, content.province+content.city+content.county, content.addressDetail, content.postalCode, content.isDefault, content.province, content.city, content.county, content.areaCode);

                // 判断
                if(result.success_code === 200){ // 成功
                    Toast({
                        message: '添加地址成功！',
                        duration: 400
                    });
                    // 回去
                    this.$router.back();
                    this.init_user_info();//这里改变vuex中的userInfo，让我的地址那里可以实时响应新加的地址
                }else {
                    Toast({
                        message: '添加地址失败！',
                        duration: 400
                    });
                }
            },
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [
                        {
                            name: '黄龙万科中心',
                            address: '杭州市西湖区',
                        },
                    ];
                } else {
                    this.searchResult = [];
                }
            },
        },
    }
</script>

<style scoped>
#AddAddress{
   height: 100%;
    background-color: #f5f5f5;

}
</style>