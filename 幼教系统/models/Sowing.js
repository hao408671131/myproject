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

//创建轮播图的模式对象
let Schema=mongoose.Schema;
 let sowingSchema=new Schema({
    //图片名称
    image_title:{type:String,required:true},//类型为String，且必须要有值(因为required：true)
    //图片的地址
    image_url:{type:String,required:true},
    //图片跳转的连接
    image_link:{type:String,required:true},
    //图片上架时间
    s_time:{type:String,required:true},
    //图片下架时间
    e_time:{type:String,required:true},
    //图片最后编辑
    l_edit:{type:Date,default:Date.now()},
    //添加时间
    c_time:{type:Date,default:Date.now()},
});
let Sowing=mongoose.model('Sowingare',sowingSchema);

export default Sowing;