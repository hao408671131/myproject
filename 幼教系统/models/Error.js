const mongoose=require('mongoose');

//1连接数据库
mongoose.connect('mongodb://localhost:27017/colleges',{useNewUrlParser: true, useUnifiedTopology: true});

//2.监听数据库的各种状态
mongoose.connection.on('open',()=>{
    console.log('数据库连接成功');
});
//连接失败
mongoose.connection.on('error',(err)=>{
    console.log('数据库连接失败');

});

//创建轮播图的模式对象
let Schema=mongoose.Schema;
let errorSchema=new Schema({
    //错误名称
    error_name:{type:String,required:true},//类型为String，且必须要有值(因为required：true)
    //错误消息
    error_message:{type:String,required:true},
    //错误堆栈
    error_stack:{type:String,required:true},
    //错误发生时间
    error_time:{type:Date,default:Date.now()},

});
let Error=mongoose.model('Errorare',errorSchema);

export default Error;