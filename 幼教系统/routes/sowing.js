import express from 'express';
import Sowing from "./../models/Sowing";
import formidable from 'formidable'
import {basename} from 'path'
import config from "./../src/config";

const router=express.Router({});
/********************接口API，处理后台提交的数据，上传到数据库，再从数据库获取数据返回给前台***********************/
/*
* 往数据库中加入一条新纪录
* */
router.post('/back/sowing/api/add',(req,res,next)=> {
        const form=new formidable.IncomingForm();
        form.uploadDir=config.uploadPath;//文件放置的路径
        form.keepExtensions=true;//保存文件原始扩展名
        //解析发过来的数据
        form.parse(req,(err,fields,files)=>{//fields 是普通数据，files是文件
                        if(err){
                                return next(err);
                        }
                        //取出普通字段
               let body=fields;
                        //解析上传文件的文件路径，取出文件名保存到数据库
                body.image_url=basename(files.image_url.path);//上传的文件对象在image_url，里面有个path就是文件保存的路径,basename只截取文件名字和后缀名

                //操作数据库
                Sowing.insertMany([{
                            //图片名称
                            image_title: body.image_title,//类型为String，且必须要有值(因为required：true)
                            //图片的地址
                            image_url: body.image_url,
                            //图片跳转的连接
                            image_link: body.image_link,
                            //图片上架时间
                            s_time: body.s_time,
                            //图片下架时间
                            e_time: body.e_time,
                            //图片最后编辑
                            l_edit: body.l_edit,
                            //添加时间
                            c_time: body.c_time,
                    }]

                ).then(()=>{
                        res.json({
                                status:200,
                                result:'添加轮播图成功'
                        });

                }).catch((err)=>{
                        next(err);
                });


        });




});

/**
* 获取所有的轮播图列表
* */
router.get('/back/sowing/api/list',(req,res,next)=>{
        Sowing.find({},"_id image_title image_url image_link s_time e_time",(err,docs)=>{
                if(err){
                        return next(err);
                }
                //数据返回
                res.json({
                        status:200,
                        result:docs
                });
        });
});

/**
 * 获取一条轮播图数据(id)
 * /sowing/api/list/singer/:sowingId模糊匹配
 * /sowing/api/list/singer/*
 * /sowing/api/list/singer/111
 * */
router.get('/back/sowing/api/singer/:sowingId',(req,res,next)=>{
        Sowing.findById(req.params.sowingId,"_id image_title image_url image_link s_time e_time",(err,docs)=>{
                if(err){
                        return next(err);
                }
                //数据返回
                res.json({
                    status:200,
                    result:docs,
                });
        });
});

/*

根据ID去修改轮播图数据
/

 */
router.post('/back/sowing/api/edit',(req,res,next)=> {
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
        Sowing.findById(body._id,(err, sowing) => {
            if (err) {
                return next(err);
            }
            //修改文档内容
            sowing.image_title=body.image_title;
            sowing.image_url=body.image_url||basename(files.image_url.path);//如果客户端没有换图片，则不会上传图片，提交过来的是fields.image_url;
            sowing.image_link=body.image_link;
            sowing.e_time=body.e_time;
            sowing.s_time=body.s_time;
            sowing.l_edit=Date.now();

            //保存
            sowing.save((err,result)=>{
            if(err){
                return next(err);
            }
            res.json({
                status:200,
                result:'轮播图修改成功'
            });
            });


        });

    });


});
/*
* 根据id删除一条记录
* */
router.get('/back/sowing/api/remove/:sowingId',(req,res,next)=>{
    Sowing.deleteOne({_id:req.params.sowingId},(err,docs)=>{
        if(err){
            return next(err);
        }
        //数据返回
        res.json({
            status:200,
            result:'删除轮播图成功',
        });
    });
});



/*****************页面路由**************/
/**
 * 加载轮播图列表页面
 * */
router.get('/back/s_list',(req,res,next)=>{
    Sowing.find((err,sowings)=>{
        if(err){
            return next(err);
        }

        //追加一个字段，因为前段样式写的SB，需要追加字段去解决li标签遍历的问题
        var tag=['one','two','three','four'];
        for(let i=0;i<tag.length;i++){
            let sowing=sowings[i];
            sowing['image_tag']=tag[i];
        }
        res.render('back/sowing_list.html',{sowings});
    });

});


/**
 * 加载添加轮播图页面
 * */
router.get('/back/s_add',(req,res,next)=>{
        res.render('back/sowing_add.html');
});

    /**
     * 加载修改轮播图页面
     * */
    router.get('/back/s_edit',(req,res,next)=>{
        res.render('back/sowing_edit.html');
    });

export default router;