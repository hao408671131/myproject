import express from 'express'
const router=express.Router({});
import User from './../models/User'
import md5 from 'blueimp-md5'
import session from "express-session";
import formidable from "formidable";
import config from "../src/config";
import Sowing from "../models/Sowing";
import {basename} from "path";


//加盐
const S_KEY='@WALK1314?.ItikE.Com.#'


/**************************************************数据接口API-start**************************************************/

/*
* 生成后台管理员
* itlike
* 123
* */
router.post('/user/api/add',(req,res,next)=>{
    const user_name=req.body.user_name||'';
    const user_pwd=md5(req.body.user_pwd+S_KEY)||'';

    //操作数据库
    User.insertMany([{
        //用户名
        user_name:user_name,
        //密码
        user_pwd:user_pwd
    }]).then(()=>{
        res.json({
            status:200,
            result:'添加管理员成功'
        })
    }).catch((err)=>{
        return next(err);
    })
});

/*
用户名和密码进行登录
 */
router.post('/user/api/login',(req,res,next)=>{
    //获取数据
    const user_name=req.body.user_name;
    const user_pwd=req.body.user_pwd;
    console.log('-------------------------------------');
    console.log(req.body);
    console.log('-------------------------------------');

    //查询数据
    User.findOne({user_name:user_name},(err,user)=>{
        if(err){
            return next(err);
        }
        //如果用户存在
        if(user !==null){
            //判断密码
            if(user.user_pwd===user_pwd){//密码匹配成功
                //session中存token
                console.log(req.session);

                req.session.token=user._id  //在app.js那里已经配置好了session，在所有的请求中都能拿到session


                //登陆成功
                res.json({
                    status:200,
                    result:{
                        token:user._id,
                        message:'登陆成功'
                    }
                });
            }
            else{
                res.json({
                    status:1,
                    result:'输入密码有误!'
                });
            }
        }
        else{
            res.json({
                status:1,
                result:'用户名不存在！'
            })
        }
    })

});

/*
退出登录
 */
router.get('/back/user/api/logout',(req,res,next)=>{
    //销毁session
    //方式1：将cookie的时间设置为0
    req.session.cookie.maxAge=0;

    //方式2：destroy
    /*req.session.destroy((err)=>{
        return next(err);
    })*/
    //提示用户
    res.json({
        status:200,
        result:'退出登录成功'
    })


})

/*
* 获取用户信息-部分
* */
router.get('/back/user/api/u_msg/:token',(req,res,next)=>{
        User.findById(req.params.token,'-_id icon_url real_name intro_self points rank gold',(err,user)=>{
            if(err){
                return next(err);
            }
            if(user){
                res.json({
                    status:200,
                    result:user
                });
            }else {
                req.session.cookie.maxAge=0;
            }
        });
});

/**
 * 获取用户信息-大部分
 */

router.get('/back/user/api/u_msg_all/:token',(req,res,next)=>{
    User.findById(req.params.token,'-_id -user_name -user_pwd -l_edit -c_time',(err,user)=>{
        if(err){
            return next(err);
        }
        if(user){
            res.json({
                status:200,
                result:user
            });
        }else {
            req.session.cookie.maxAge=0;
        }
    });
});

/**
 *根据id(token)去修改一条用户信息
 */
router.post('/back/user/api/edit',(req,res,next)=> {
    const form=new formidable.IncomingForm();
    form.uploadDir=config.uploadPath;//文件放置的路径
    form.keepExtensions=true;//保存文件原始扩展名
    //解析发过来的数据
    form.parse(req,(err,fields,files)=> {//fields 是普通数据，files是文件
        if (err) {
            return next(err);
        }

        //取出普通字段
        let body = fields;


        //根据id查询文档>
        User.findById(body.token,(err, user) => {
            if (err) {
                return next(err);
            }

            //修改文档内容
            user.real_name=body.real_name;
            user.icon_url=body.icon_url||basename(files.icon_url.path);//如果客户端没有换图片，则不会上传图片，提交过来的是fields.image_url;
            user.phone=body.phone;
            user.e_mail=body.e_mail;
            user.join_time=body.join_time;
            user.intro_self=body.intro_self;

            //保存
            user.save((err,result)=>{
                if(err){
                    return next(err);
                }
                res.json({
                    status:200,
                    result:'用户信息修改成功'
                });
            });


        });

    });


});

/**
 * 根据token修改密码
 */

router.post('/back/user/api/reset',(req,res,next)=>{
    //获取数据
    const token=req.body.token;
    const old_pwd=req.body.old_pwd;
    const new_pwd=req.body.new_pwd;

    //根据token查询用户
    User.findById(token,(err,user)=>{
            if(err){
                return next(err);
            }

        //没有查询到
            if(user){
                //取出散列做对比
                if(user.user_pwd!==old_pwd){
                    res.json({
                        status:1,
                        result:'原密码不正确'
                    });
                }
                //更换密码
                user.user_pwd=new_pwd;
                //保存到数据库
                user.save((err,result)=>{
                    if(err){
                        return next(err);
                    }
                    else{
                        res.json({
                            status:200,
                            result:'修改密码成功'
                        });
                    }
                })
            }
            else{
                res.json({
                    status:1,
                    result:'非法用户'
                });
            }

    })
});


/**************************************************数据接口API-end**************************************************/
















/**************************************************配置页面路由-start**************************************************/

router.get('/back/login',(req,res)=>{
    res.render('back/login.html');
});

router.get('/back/u_center',(req,res)=>{
    res.render('back/user_center.html');
});

router.get('/back/u_set',(req,res)=>{
    res.render('back/user_message.html');
});


router.get('/back/u_reset_pwd',(req,res)=>{
    res.render('back/reset_pwd.html');
});








/**************************************************配置页面路由-end**************************************************/
export default  router;