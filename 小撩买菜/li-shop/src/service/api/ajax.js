import axios from 'axios'


/*
*{
* name:'张三',
* age:18,
* sex:'男'
* }
*/

export default function ajax(url='',params={},type='GET') {
    //1.变量
    let promise;


    //2.返回一个promise对象
    return new Promise((resolve,reject)=>{
                //2.1判断请求类型
                if(type.toUpperCase()==='GET'){//get请求
                        //2.2拼接
                    let paramsStr='';
                        //2.3遍历
                    Object.keys(params).forEach(key=>{
                        paramsStr +=key+'='+params[key]+'&';  //最后多了一个&
                    });
                    //2.4 过滤拼接后最后的那一个&
                    /*
                      注意：为了防止请求缓存，在尾部加了时间戳
                    */
                    if (paramsStr) {
                        paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'));
                        // 2.5 拼接完整路径
                        if(url.indexOf('47.98.157.152') === -1) {
                            url += '?' + paramsStr + '&itlike=' + randomCode(20);
                        }else {
                            url += '?' + paramsStr;
                        }
                    }else {
                        if(url.indexOf('47.98.157.152') === -1){
                            url += '?itlike=' + randomCode(20)
                        }
                    }
                    //2.6发起get请求
                   promise= axios.get(url);

                 }else if(type.toUpperCase()==='POST'){     //post请求
                    //2.7发起post请求
                    promise=axios.post(url,params);

                }
                //2.8处理结果并返回
                promise.then((response)=>{//response是axios的响应体，里面包含了data内容
                    resolve(response.data);
                }).catch(error=>{
                    reject(error)
                });

    });

}
/*生成指定长度的随机数*/
function randomCode(length) {
    let chars = ['0','1','2','3','4','5','6','7','8','9'];
    let result = "";
    for(let i = 0; i < length ; i ++) {
        let index = Math.ceil(Math.random()*9);
        result += chars[index];
    }
    return result;
}