<template>
    <div id="EditAddress">
        <van-nav-bar
                title="修改地址"
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
                show-delete
                show-set-default
                show-search-result
                :address-info="addressInfo"
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @delete="onDelete"
                @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
    import areaList from "../../../config/area";
    import {Toast} from "vant";
    import {getCurrentUserAddress,changeUserAddress} from './../../../service/api/index'
    import {mapState,mapMutations}from 'vuex'
    import {delUserAddress} from "../../../../../lk-shop(最新)/lk-shop/src/service/api";

    export default {
        name: "EditAddress",
        data() {
            return {
                areaList:areaList,//省/市/地区
                searchResult: [],
                addressInfo:{}
            };
        },
        computed:{
            ...mapState(['userInfo'])
        },
        mounted() {
            if(this.$route.query.address_id){
                if(this.userInfo.token){
                    this.getCurrentAddress(this.userInfo.token, this.$route.query.address_id);
                }
            }
        },
        methods: {
            ...mapMutations(['init_user_info']),
            //初始化要修改的地址
          async  getCurrentAddress(user_id,address_id) {
              let result = await getCurrentUserAddress(user_id, address_id);
              //console.log(result);
              if (result.success_code === 200) {
                  this.addressInfo = {
                      id: result.data._id,
                      name: result.data.address_name,
                      tel: result.data.address_phone,
                      province: result.data.province,
                      city: result.data.city,
                      county: result.data.county,
                      addressDetail: result.data.address_area_detail,
                      areaCode: result.data.areaCode,
                      postalCode: result.data.address_post_code,
                      isDefault: result.data.address_tag
                  }
              }


          },
            onClickLeft(){
                this.$router.back();
            },
            // 删除收货地址
            async onDelete() {
                let result = await delUserAddress(this.addressInfo.id);
                console.log(result);
                if(result.success_code === 200){
                    Toast({
                        message: '删除地址成功！',
                        duration: 400
                    });
                    // 2.1 返回到上一级界面
                    this.$router.back();
                    this.init_user_info();//这里改变vuex中的userInfo，让我的地址那里可以实时响应新加的地址
                }else {
                    Toast({
                        message: '删除地址失败！',
                        duration: 400
                    });
                }
            },
          async  onSave(content) {
                //Toast('save');
                if(this.userInfo.token){
                    // 1. 发起修改请求
                    let result = await changeUserAddress(this.addressInfo.id, this.userInfo.token,  content.name, content.tel, content.province+content.city+content.county, content.addressDetail, content.postalCode, content.isDefault, content.province, content.city, content.county, content.areaCode);
                    console.log(result);
                    //  2. 判断是否修改成功
                    if(result.success_code === 200){
                        Toast({
                            message: '修改地址成功！',
                            duration: 400
                        });
                        // 2.1 返回到上一级界面
                        this.$router.back();
                        this.init_user_info();//这里改变vuex中的userInfo，让我的地址那里可以实时响应新加的地址
                    }else {
                        Toast({
                            message: '修改地址失败！',
                            duration: 400
                        });
                    }
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

</style>