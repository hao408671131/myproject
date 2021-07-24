<template>
    <div id="category">
        <!--头部-->
        <Header></Header>
        <!--内容-->
        <div class="listWrapper"v-if="!showLoading">
        <!--左边-->
            <div class="leftWrapper">
                <ul class="wrapper">
                    <li class="categoryItem "
                        v-for="(cate,index) in categoriesData":key="cate.id"
                        :class="{selected:currentIndex===index}"
                        @click="clickLeftLi(index)"
                        ref="menuList"
                    >
                        <span class="textWrapper">{{cate.name}}</span>
                    </li>
                </ul>
            </div>
            <!--右边-->
            <ContentView :categoriesDetailData="categoriesDetailData"></ContentView>
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
    //1.引入组件
    import Header from './components/Header'
    import ContentView from './components/ContentView';

    //2.引入滚动组件    在数据取下来之后再用
    import BScroll from'better-scroll'
    //3.引入接口
    import {getCategories,getCategoriesDetail} from './../../service/api/index'
    import PubSub from "pubsub-js";
    import {Toast} from "vant";
    import {mapMutations,mapState} from "vuex";
    export default {
        name: "Category",
        data() {
            return {
                //是否显示加载图片  有可能数据到来之前，组件就已经渲染完成，导致组件出bug
                showLoading: true,
                //左边列表数据
                categoriesData: [],
                //右边列表数据
                categoriesDetailData: [],
                //左边item选中与否
                currentIndex:0,
            }
        },
        created() {
            this.initData();
        },
        methods: {
            ...mapMutations(['add_goods']),
            //1.初始化操作（数据和界面）
            async initData() {
                //1.获取左边数据
                let leftRes = await getCategories();
                if(leftRes.success){
                    this.categoriesData=leftRes.data.cate;
                }
                //2.获取右边的数据
                let rightRes=await getCategoriesDetail('/lk001');
                if(rightRes.success){
                    this.categoriesDetailData=rightRes.data.cate;
                }
                //console.log(leftRes);
                //3.隐藏loading框
                this.showLoading=false;
                //4.初始化滚动框架
                this.$nextTick(()=>{//this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。假设我们更改了某个dom元素内部的文本，而这时候我们想直接打印出这个被改变后的文本是需要dom更新之后才会实现的
                    this.leftScroll=new BScroll('.leftWrapper',
                        {
                        probeType: 3,
                        click: true,
                        scrollY: true,
                        tap: true,
                        mouseWheel: true
                    });
                });
            },
            //2.处理左边的点击操作
           async clickLeftLi(index){
                //2.1改变索引
                this.currentIndex=index;

                //2.2滚动到相应的位置
                let menuList=this.$refs.menuList;
                let el=menuList[index];

                //2.3滚动到对应的位置上
                this.leftScroll.scrollToElement(el,300);//better-scroll 框架

                //2.4获取右边数据
                let rightRes=await getCategoriesDetail(`/lk00${index+1}`);
                if(rightRes.success){
                    this.categoriesDetailData=rightRes.data.cate;
                }
            }
        },
        computed:{
            ...mapState(['userInfo'])
        },
        mounted() {

        },

    beforeDestroy() {
        PubSub.unsubscribe('categoryAddToCart')
    },
        components: {
            ContentView,
            Header,

        }
    }
</script>

<style lang="less" scoped>
    #category{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .listWrapper {
        display: flex;
        position: absolute;
        top: 2.75rem;
        bottom: 3rem;
        width: 100%;
        overflow: hidden;
    }

    .leftWrapper {
        background-color: #F4F4F4;
        width: 5.3125rem;
        flex: 0 0 5.3125rem;
    }

    .categoryItem {
        padding: 0.75rem 0;
        border-bottom: solid 1px #E8E9E8;
        position: relative;
    }

    .categoryItem .textWrapper {
        line-height: 1.25rem;
        border-left: solid 0.1875rem transparent;
        padding: 0.3125rem 0.6875rem;
        font-size: 0.8125rem;
        color: #666666;
    }

    .categoryItem.selected {
        background: #FFF;
    }

    .categoryItem.selected .textWrapper {
        border-left-color: #3cb963;
        font-weight: bold;
        font-size: 0.875rem;
        color: #333333;
    }

    @media (min-width: 960px) {
        .wrapper {
            border-right: 1px solid #E8E9E8;
        }

        .wrapper .categoryItem {
            background: #fff;
        }
    }
</style>