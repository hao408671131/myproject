import Error from './../models/Error'

export default (error,req,res,next)=>{
     Error.insertMany([{
         //错误名称
         error_name: error.name,
         //错误消息
         error_message:error.message,
         //错误堆栈
         error_stack: error.stack,


     }]).then((data)=>{
           res.json({
               status:500,
               result:'服务器内部错误'
         })
        }).catch((err)=>{
            res.end("插入失败:"+err);
     });
};