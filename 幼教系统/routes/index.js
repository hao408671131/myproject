const express=require('express');
const router=express.Router({});
import Sowing from "./../models/Sowing";
import config from "./../src/config";
/***********************后端页面路由*********************************/
router.get('/back',(req,res)=>{
    res.render('back/index.html');
});

/*router.get('/back/ss',(req,res)=>{
    res.render('back/login.html');
});
//nunjuck可以这样配置路由，且能访问静态资源

 */
/***********************前端页面路由*********************************/
router.get('/',(req,res)=>{
    res.redirect('/web');//这里传的是url 不是文件路径
});


router.get('/web',(req,res)=>{
    res.render('web/index.html');
});


router.get('/web/res',(req,res)=>{
    Sowing.find({},'-_id image_title image_link image_url',(err,sowings)=>{
        if(err){
            return next(err);
        }
        res.render('web/resources.html',{sowings});
    });

});


router.get('/web/res_c',(req,res)=>{

        res.render('/web/resources_content.html')
});


export default router;//因为该文件被app.js引用了，而app.js文件被babel解析了，所以这里可以用es6语法