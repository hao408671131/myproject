/*
*多个可以直接同步更新状态的方法  对象模块
*/
import {
        ADD_GOODS,
        INIT_SHOP_CART,
    REDUCE_CART,
    SELECTED_SINGER_GOODS,
    SELECTED_ALL_GOODS,
    CLEAR_CART,
    USER_INFO,
    INIT_USER_INFO,
    RESET_USER_INFO,
    INIT_USER_ADDRESS
} from './mutations-type'
import Vue from 'vue'
import {getStore, removeStore, setStore} from './../config/global'
import {getGoodsCart} from'./../service/api/index'


export default {
        //1.往购物车中添加数据
        [ADD_GOODS](state, {goodsId, goodsName, smallImage, goodsPrice}) {//ADD_GOODS并不是方法名, add_goods  这里的state是state模块对象,todo是外部传参
                let shopCart = state.shopCart;
                //1.1判断该商品是否存在
                if (shopCart[goodsId]) {//该商品已经有了
                        shopCart[goodsId]["num"]++;
                } else {   //购物车中没有该商品
                        shopCart[goodsId] = {
                                num: 1,
                                id: goodsId,
                                name: goodsName,
                                small_image: smallImage,
                                price: goodsPrice,
                                checked:true
                        }
                }
                //1.2产生新对象
                state.shopCart={...shopCart}; //shopCart里面的属性发生变化时，外部可能监视不到，所以让shopCart整个发生变化，以便于vue做出响应
                //1.3存入本地
                setStore('shopCart',state.shopCart);//页面每次刷新的时候vuex的数据都会重新刷新，如果不保存到本地或者到服务器，那么每次刷新，上一次添加到购物车的数据都会被清空
        },

        //2.页面初始化，获取购物车的数据(本地)
       [ INIT_SHOP_CART](state){//这里应该在dashboard那里调用，每次刷新页面，购物车消息都会全局响应
                let initCart=getStore('shopCart');
                if(initCart){
                        initCart=JSON.parse(initCart);
                        state.shopCart={...initCart}
                }else{

                }
        },
    //3.把商品从购物车移出
    [REDUCE_CART](state,{goodsId}){
            let shopCart=state.shopCart;
            let goods=shopCart[goodsId];
            if (goods){//找到该商品
                if(goods['num']>0){
                    goods['num']--;
                    //3.1判断是否只有0个
                    if(goods['num']===0){
                        delete shopCart[goodsId];
                    }

                }
                else {
                    goodsId=null;
                }
                //3.2同步数据
                //产生新对象
                state.shopCart={...shopCart};
                //存入本地
                setStore('shopCart',state.shopCart);//页面每次刷新的时候vuex的数据都会重新刷新，如果不保存到本地或者到服务器，那么每次刷新，上一次添加到购物车的数据都会被清空
            }
    },

    //4.单个商品选中和取消
    [SELECTED_SINGER_GOODS](state,{goodsId}){
        let shopCart=state.shopCart;
        let goods=shopCart[goodsId];
        if(goods){//商品存在
            if(goods.checked){
                goods.checked=!goods.checked;
            }else{//不存在该属性或者check为false
                Vue.set(goods,'checked',true)//用Vue添加该属性,在goods对象里面添加值为true的checked属性

            }
            //3.2同步数据
            //产生新对象
            state.shopCart={...shopCart};
            //存入本地
            setStore('shopCart',state.shopCart);
        }
    },

    //5.全选和取消全选
    [SELECTED_ALL_GOODS](state,{isSelected}){
        let shopCart = state.shopCart;
        Object.values(shopCart).forEach((goods, index)=>{
                goods.checked = !isSelected;

        });
        //3.2同步数据
        //产生新对象
        state.shopCart={...shopCart};
        //存入本地
        setStore('shopCart',state.shopCart);
    },
    //6.清空购物车
    [CLEAR_CART](state){
            state.shopCart=null;
        //3.2同步数据
        //产生新对象
        state.shopCart={...state.shopCart};
        //存入本地
        setStore('shopCart',state.shopCart);
    },
    //7.保存用户信息到本地
    [USER_INFO](state,userInfo){
            state.userInfo=userInfo; //用vuex的改变来做页面的响应
            setStore('userInfo',state.userInfo);
    },
    //8.获取用户信息
    [INIT_USER_INFO](state){
            //8.1获取用户信息
        let userInfo=getStore('userInfo');
        if(userInfo){
            state.userInfo=JSON.parse(userInfo);
        }
    },
    //9.退出登录
    [RESET_USER_INFO](state){
            state.userInfo={};
            removeStore('userInfo');
    },
    //10.保存用户选中后的地址
    [INIT_USER_ADDRESS](state,Address){
            let userAddress=Address;
            state.userAddress={...userAddress};
    }
}
