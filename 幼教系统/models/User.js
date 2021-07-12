const mongoose=require('mongoose');

//1连接数据库
mongoose.connect('mongodb://localhost:27017/colleges',{useNewUrlParser: true, useUnifiedTopology: true});

//2.监听数据库的各种状态
mongoose.connection.on('open',()=>{
    console.log('数据库连接成功');
});
//连接失败
mongoose.connection.on('error',(err)=>{
    console.log('数据库连接失败!');

});

//创建管理员(用户)的模式对象
let Schema=mongoose.Schema;
let userSchema=new Schema({
    //真实姓名
    real_name:{type:String,default:'浩哥小迷弟'},//类型为String，且必须要有值(因为required：true)
    //用户名
    user_name:{type:String,required:true},
    //密码
    user_pwd:{type:String,required:true},
    //头像
    icon_url:{type:String,required:false},
    //邮箱
    e_mail:{type:String,required:false},
    //手机号码
    phone:{type:String,required:false},
    //加入日期
    join_time:{type:String,required:false},
    //自我介绍
    intro_self:{type:String,default: '我是浩哥的忠实小迷弟'},
    //积分
    points:{type:Number,default:100},
    //等级
    rank:{type:Number,default:1},
    //金币
    gold:{type:Number,default:1000},
    //当前编辑时间
    l_edit:{type:Date,default:Date.now()},
    //添加时间
    c_time:{type:Date,default:Date.now()},

});
let User=mongoose.model('Userare',userSchema);

export default User;