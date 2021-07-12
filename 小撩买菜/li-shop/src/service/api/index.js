import ajax from './ajax'


//http://demo.itlike.com/web/xlmc/api/homeApi
//http://demo.itlike.com/web/xlmc/api/homeApi/categories
//http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail

//1.定义基础路径
//const LOCAL_BASE_URL='http://demo.itlike.com/web/xlmc';//上线后的接口，在服务器响应里面设置了允许跨域的响应头
const LOCAL_BASE_URL='/api';//代理服务器解决跨域
export const getHomeData=()=>ajax(LOCAL_BASE_URL+'/api/homeApi');
export const getCategories=()=>ajax(LOCAL_BASE_URL+'/api/homeApi/categories');
export const getCategoriesDetail=(preParams)=>ajax(LOCAL_BASE_URL+'/api/homeApi/categoriesdetail'+preParams);



//2.用户中心接口
//1）获取短信验证码
//http://demo.itlike.com/web/xlmc/api/send_code
//2）手机验证码登录
//请求方式：POST 参数：{phone: String, code:String}
//http://demo.itlike.com/web/xlmc/api/login_code


//用户名/密码登录
//请求方式：POST 参数：{user_name: String, user_pwd : String, captcha : String}
//http://demo.itlike.com/web/xlmc/api/login_pwd

//export const LOCAL_BASE_URL='http://localhost:3000/web/xlmc';

//2.1获取短信验证码
export  const getPhoneCode=(phone)=>ajax(LOCAL_BASE_URL+'/api/send_code',{phone});
//2.2手机验证码登录(POST)
export const phoneCodeLogin=(phone,code)=>ajax(LOCAL_BASE_URL+'/api/login_code',{phone,code},'POST');

//2.3用户名和密码登录
export const pwdLogin=(user_name,user_pwd,captcha)=>ajax(LOCAL_BASE_URL+'/api/login_pwd',
    {user_name,user_pwd,captcha},'POST')

//2.4自动登录
export  const  getUserInfo=()=>ajax(LOCAL_BASE_URL+'/api/userinfo');

//2.5退出登录
export  const  getLogOut=()=>ajax(LOCAL_BASE_URL+'/api/logout');

//3.购物车接口
//3.1添加商品到购物车
export const addGoodsToCart=(goods_id,goods_name,goods_price,small_image)=>ajax(LOCAL_BASE_URL+
'api/cart/add',{goods_id,goods_name,goods_price,small_image},'POST');
// 3.2 获取当前用户购物车中的商品
export const getGoodsCart = () => ajax(LOCAL_BASE_URL+ '/api/cart/search');

// 3.3 修改购物车商品数量
export const changeCartNum = (goods_id, type)=>ajax(LOCAL_BASE_URL + '/api/cart/num', {goods_id, type}, 'POST');

// 3.4 删除当前用户购物车中所有的商品
export const clearAllCart = () => ajax(LOCAL_BASE_URL+ '/api/cart/clear');

// 3.5 单个商品的选中和取消选中
export const singerGoodsSelect = ( goods_id)=>ajax(LOCAL_BASE_URL + '/api/cart/singer_select', {goods_id}, 'POST');

// 3.6 所有商品的选中和取消选中
export const allGoodsSelect = (flag)=>ajax(LOCAL_BASE_URL + '/api/cart/all_select', {flag}, 'POST');

// 3.7 查询所有已经被选中的商品
export const getAllSelectedGoods = () => ajax(LOCAL_BASE_URL+ '/api/cart/selected');

// 3.8 删除已经生成订单的商品
export const delAllSelectedGoods = () => ajax(LOCAL_BASE_URL+ '/api/cart/del_checked');

// 4. 地址接口

// 4.1 获取当前用户的地址
export const getUserAddress = (user_id) => ajax(LOCAL_BASE_URL+ '/api/address/search/'+ user_id);

// 4.2 添加新的地址
export const addUserAddress = ( user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode)=>ajax(LOCAL_BASE_URL + '/api/address/add', {user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode}, 'POST');

// 4.3 编辑用户的地址
export const changeUserAddress = ( address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode)=>ajax(LOCAL_BASE_URL + '/api/address/edit', {address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode}, 'POST');

// 4.4 删除用户的地址
export const delUserAddress = (address_id) => ajax(LOCAL_BASE_URL+ '/api/address/del/'+ address_id);

// 4.5 获取单条地址
export const getCurrentUserAddress = ( user_id, address_id)=>ajax(LOCAL_BASE_URL + '/api/address/one', {user_id, address_id}, 'POST');

// 5. 订单接口
// 5.1 提交订单
export const postOrder = ( user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price)=>ajax(LOCAL_BASE_URL + '/api/order/post', {user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price}, 'POST');

// 5.2 订单支付成功
export const orderPaySuccess = (user_id, order_id)=>ajax(LOCAL_BASE_URL + '/api/order/change_status', {user_id, order_id}, 'POST');

// 5.3 查询订单
export const getOrder = (user_id, status)=>ajax(LOCAL_BASE_URL + '/api/order/get', {user_id, status}, 'POST'); // pay will

// 6. 微信支付接口部署
/*支付接口白名单：demo.itlike.com */
//const PAY_URL = 'http://47.98.157.152/WXPayProject/pay';
 const PAY_URL = '/pay';
// 6.1 获取支付的URL
export const getWXCode = (outTradeNo, totalFee) => ajax(PAY_URL+ '/createNative.do', {outTradeNo, totalFee});
// 6.2 查询是否支付成功
export const queryPayStatus = (out_trade_no) => ajax(PAY_URL+ '/queryPayStatus.do', {out_trade_no});



