import express from 'express';
import config from "./config";
import nunjucks from 'nunjucks';
const moment=require('moment');

import bodyParser from './../middle_wares/body_parser'
import errorLog from './../middle_wares/error_log'
import login_pass from './../middle_wares/login_pass'

//引入express-session
import session from 'express-session'

//引入connect-mongo用于express连接数据库存储session
const mongoStore=require('connect-mongo')(session);

//3引入路由
import indexRouter from './../routes/index'
import sowingRouter from './../routes/sowing'
import userRouter from './../routes/user'

const app=express();
//6.使用session

app.use(session({
    //参数配置
    secret:'itlikeddd',//加密字符串
    name:'likeiddddd',//返回客户端key的名称,默认值为connect_sid
    resave:false,//强制保存session,即使它没有变化
    saveUninitialized:true,//强制将未初始化的session存储。当新建一个session且未设定属性或值时，它就处于未初始化状态。在设定cookie前，这对于登录验证，减轻服务器压力，权限控制是有帮助的，默认为true
    cookie:{maxAge:1800000,
    secure:false},
    rolling:true,//每次请求时进行设置cookie，将重置cookie过期时间
    store:new mongoStore({
        url:'mongodb://127.0.0.1/colleges',//数据库地址
        touchAfter:24*3600 //多长时间往数据库中更新存储一次，除了在会话数据上更改了某些数据除外
    })
}))

//console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss')) ;
//1配置公共资源访问路径
app.use(express.static(config.publicPath));

//2配置中间件（nunjucks模板引擎能够作用到views文件夹中的模板）
nunjucks.configure(config.viewsPath, {
    autoescape: true,
    express: app,
    noCache:true //不使用缓存，模板每次都会重新编译
});
//5.挂载数据处理的中间件
app.use(bodyParser);

//7.配置后端拦截中间件-->权限控制
app.use(login_pass)


//4.挂载路由
app.use(indexRouter);
app.use(sowingRouter);
app.use(userRouter);
//6.挂载错误处理中间件
app.use(errorLog);
//7.挂载404页面中间件
app.use((req,res)=>{//传进来的url如果是/back/...，则访问/back里面的静态资源，如果是/web/...则访问/web的静态资源
    res.render('404.html');

});



app.listen(3020,()=>{
    console.log('服务器已启动');
});