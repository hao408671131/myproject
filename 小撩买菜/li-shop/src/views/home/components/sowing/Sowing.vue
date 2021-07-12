<template>
    <swiper id='swiper'ref="mySwiper" :options="swiperOption">
        <!-- slides -->
        <swiper-slide v-for="(sowing, index) in sowing_list" :key="sowing.public_id">
            <img :src="sowing.icon_url"  :alt="sowing.public_name">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
    //npm install vue-awesome-swiper --save
    import 'swiper/dist/css/swiper.css'

    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        name: "Sowing",
        props:{
            sowing_list:Array
        },
        data() {
            return {
                swiperOption: {
                    notNextTick: true,
                    // 分页
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    // 循环
                    loop:true,
                    // 切换时长
                    autoplay: {
                        delay: 1000
                    },
                    stopOnLastSlide:false,
                    // 速度
                    speed: 600,
                    // 滑动后回调函数
                    on: {
                        slideChangeTransitionEnd() {
                            // console.log(this.activeIndex);
                        }
                    }
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        },
        mounted() {
            // this.swiper.slideTo(5, 1000, false);
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>



<style scoped>

    #swiper {
        width: 100%;
        height: 14rem;
        background-color: transparent;
    }

    #swiper img{
        width: 100%;
        height: 100%;
    }

    /*
      穿透修改样式
   */
    #swiper >>> .swiper-pagination-bullet-active{    /*优先级达到最高*/
        background-color: #75a342 ;
    }
</style>