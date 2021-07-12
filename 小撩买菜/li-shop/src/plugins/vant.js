import Vue from 'vue'
//底部导航条
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);

//轮播图
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
//加载提示
import { Loading } from 'vant';
Vue.use(Loading);

//图片懒加载

import { Image as VanImage } from 'vant';
Vue.use(VanImage);

//文字提示
import { Toast } from 'vant';
Vue.use(Toast);

//弹出框
import { Dialog } from 'vant';
Vue.use(Dialog);

//导航栏
import { NavBar } from 'vant';
Vue.use(NavBar);

//地址
import { ContactCard, ContactEdit,ContactList} from 'vant';
Vue.use(ContactCard).use(ContactEdit).use(ContactList);

//我的地址
import { AddressList } from 'vant';
Vue.use(AddressList);

import { AddressEdit } from 'vant';
Vue.use(AddressEdit);

//单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell);
Vue.use(CellGroup);

//提交订单
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);

//宫格
import { Grid, GridItem } from 'vant';
Vue.use(Grid);
Vue.use(GridItem);

//改造日期-弹出层
import { Popup } from 'vant';
Vue.use(Popup);
//日期组件
import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker);
//商品卡片
import { Card } from 'vant';
Vue.use(Card);


import { Tab, Tabs } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);