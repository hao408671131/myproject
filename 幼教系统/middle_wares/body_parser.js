import querystring from 'querystring'

//处理post请求
export default (req,res,next)=>{

    //1.过滤get请求
    if(req.method.toLowerCase()==='get'){//toLowerCase()转化成小写
        return next();
    }
    //2.如果是普通的表单提交，要处理，application/x-www-form-urlencoded
    //3.如果有文件(图标,音视频，...),不要处理，multipart/form-data
    if(req.headers['content-type'].startsWith('multipart/form-data')){//以multipart/form-data开头
    return next();//不进行处理
    }
    //4.数据流的拼接
    let data='';
    req.on('data',(chunk)=>{
        data+=chunk;

    });
    req.on('end',()=>{
        //console.log(data);
        req.body=querystring.parse(data);//转成对象

        next();

    });
}