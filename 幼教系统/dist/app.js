'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _body_parser = require('./../middle_wares/body_parser');

var _body_parser2 = _interopRequireDefault(_body_parser);

var _error_log = require('./../middle_wares/error_log');

var _error_log2 = _interopRequireDefault(_error_log);

var _login_pass = require('./../middle_wares/login_pass');

var _login_pass2 = _interopRequireDefault(_login_pass);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _index = require('./../routes/index');

var _index2 = _interopRequireDefault(_index);

var _sowing = require('./../routes/sowing');

var _sowing2 = _interopRequireDefault(_sowing);

var _user = require('./../routes/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require('moment');

//引入express-session


//引入connect-mongo用于express连接数据库存储session
var mongoStore = require('connect-mongo')(_expressSession2.default);

//3引入路由


var app = (0, _express2.default)();
//6.使用session

app.use((0, _expressSession2.default)({
    //参数配置
    secret: 'itlikeddd', //加密字符串
    name: 'likeiddddd', //返回客户端key的名称,默认值为connect_sid
    resave: false, //强制保存session,即使它没有变化
    saveUninitialized: true, //强制将未初始化的session存储。当新建一个session且未设定属性或值时，它就处于未初始化状态。在设定cookie前，这对于登录验证，减轻服务器压力，权限控制是有帮助的，默认为true
    cookie: { maxAge: 24 * 3600 },
    rolling: true, //每次请求时进行设置cookie，将重置cookie过期时间
    store: new mongoStore({
        url: 'mongodb://127.0.0.1/colleges', //数据库地址
        touchAfter: 24 * 3600 //多长时间往数据库中更新存储一次，除了在会话数据上更改了某些数据除外
    })
}));

//console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss')) ;
//1配置公共资源访问路径
app.use(_express2.default.static(_config2.default.publicPath));

//2配置中间件（nunjucks模板引擎能够作用到views文件夹中的模板）
_nunjucks2.default.configure(_config2.default.viewsPath, {
    autoescape: true,
    express: app,
    noCache: true //不使用缓存，模板每次都会重新编译
});
//5.挂载数据处理的中间件
app.use(_body_parser2.default);

//7.配置后端拦截中间件-->权限控制
app.use(_login_pass2.default);

//4.挂载路由
app.use(_index2.default);
app.use(_sowing2.default);
app.use(_user2.default);
//6.挂载错误处理中间件
app.use(_error_log2.default);
//7.挂载404页面中间件
app.use(function (req, res) {
    //传进来的url如果是/back/...，则访问/back里面的静态资源，如果是/web/...则访问/web的静态资源
    res.render('404.html');
});

app.listen(3020, function () {
    console.log('服务器已启动');
});