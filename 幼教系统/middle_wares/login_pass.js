export default (req,res,next)=>{
        //过滤所有非后端请求
    if(req.path.indexOf('/back/')===-1){//没有找到   转成小写
        return next();
    }
    //判断是否处于有效登录时效
   if(req.session.token){
        return next();
    }
    //没有登录  登录失效
    //如果是接口相关
    if(req.path.indexOf('/api/')!==-1){
        return next(new Error('非法访问!'));
    }
    res.render('back/login.html');
   // next();


}