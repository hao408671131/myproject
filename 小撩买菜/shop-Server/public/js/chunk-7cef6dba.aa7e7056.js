(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7cef6dba"],{"1f90":function(e,t,n){e.exports=n.p+"img/lk_logo_sm.6059c196.png"},"4a6e":function(e,t,n){},7871:function(e,t,n){e.exports=n.p+"img/hide_pwd.d20f9390.png"},c91b:function(e,t,n){"use strict";var a=n("4a6e"),r=n.n(a);r.a},ede4:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login-container"},[a("div",{staticClass:"login-inner"},[a("div",{staticClass:"login-header"},[e._m(0),a("div",{staticClass:"login-header-title"},[a("a",{class:{current:e.loginMode},attrs:{href:"javascript:;"},on:{click:function(t){return e.dealLoginMode(!0)}}},[e._v("手机登录")]),a("a",{class:{current:!e.loginMode},attrs:{href:"javascript:;"},on:{click:function(t){return e.dealLoginMode(!1)}}},[e._v("密码登录(测试)")])])]),a("div",{staticClass:"login-content"},[a("form",[a("div",{class:{current:e.loginMode}},[a("section",{staticClass:"login-message"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"number",maxlength:"11",placeholder:"手机号"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}}),e.countDown?a("button",{staticClass:"get-verification",attrs:{disabled:"disabled"}},[e._v("\n                            已发送("+e._s(e.countDown)+"s)\n                        ")]):a("button",{staticClass:"get-verification",class:{phone_right:e.phoneRight},on:{click:function(t){return t.preventDefault(),e.getVerifyCode()}}},[e._v("获取验证码")])]),a("section",{staticClass:"login-verification"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],attrs:{type:"number",maxlength:"8",placeholder:"验证码"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}})]),e._m(1)]),a("div",{class:{current:!e.loginMode}},[a("section",[a("section",{staticClass:"login-message"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user_name,expression:"user_name"}],attrs:{type:"tel",maxlength:"11",placeholder:"用户名"},domProps:{value:e.user_name},on:{input:function(t){t.target.composing||(e.user_name=t.target.value)}}})]),a("section",{staticClass:"login-verification"},[e.pwdMode?a("input",{directives:[{name:"model",rawName:"v-model",value:e.pwd,expression:"pwd"}],attrs:{type:"password",maxlength:"20",placeholder:"密码",autocomplete:"off"},domProps:{value:e.pwd},on:{input:function(t){t.target.composing||(e.pwd=t.target.value)}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.pwd,expression:"pwd"}],attrs:{type:"text",maxlength:"20",placeholder:"密码",autocomplete:"off"},domProps:{value:e.pwd},on:{input:function(t){t.target.composing||(e.pwd=t.target.value)}}}),a("div",{staticClass:"switch-show"},[a("img",{class:{on:e.pwdMode},attrs:{src:n("7871"),alt:"",width:"20"},on:{click:function(t){return t.preventDefault(),e.dealPwdMode(!1)}}}),a("img",{class:{on:!e.pwdMode},attrs:{src:n("f880"),alt:"",width:"20"},on:{click:function(t){return t.preventDefault(),e.dealPwdMode(!0)}}})])]),a("section",{staticClass:"login-message"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.captcha,expression:"captcha"}],attrs:{type:"text",maxlength:"4",placeholder:"验证码"},domProps:{value:e.captcha},on:{input:function(t){t.target.composing||(e.captcha=t.target.value)}}}),a("img",{ref:"captcha",staticClass:"get-verification",attrs:{src:"http://demo.itlike.com/web/xlmc/api/captcha",alt:"captcha"},on:{click:function(t){return t.preventDefault(),e.getCaptcha(t)}}})])])]),a("button",{staticClass:"login-submit",on:{click:function(t){return t.preventDefault(),e.login(t)}}},[e._v("登录")])]),a("button",{staticClass:"login-back",on:{click:function(t){return t.preventDefault(),e.$router.back()}}},[e._v("返回")])])])])},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login-logo"},[a("img",{attrs:{src:n("1f90"),alt:"",width:"300"}})])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"login-hint"},[e._v("\n                        温馨提示：测试账号请输入手机号码，获取验证码，验证码均为666666\n                        "),n("a",{attrs:{href:"javascript:;"}},[e._v("采用微信扫码支付")])])}],o=(n("8e6e"),n("ac6a"),n("456d"),n("e7e5"),n("d399")),i=(n("96cf"),n("3b8d")),s=n("bd86"),c=n("a9da"),u=n("2f62");function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(n,!0).forEach(function(t){Object(s["a"])(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var d={name:"Login",data:function(){return{loginMode:!0,phone:null,countDown:0,code:null,userInfo:null,user_name:null,pwd:null,pwdMode:!0,captcha:null}},computed:{phoneRight:function(){return/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)}},methods:p({},Object(u["b"])(["syncUserInfo"]),{dealLoginMode:function(e){this.loginMode=e},getVerifyCode:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t,n=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!this.phoneRight){e.next=7;break}return this.countDown=60,this.intervalId=setInterval(function(){n.countDown--,0===n.countDown&&clearInterval(n.intervalId)},1e3),e.next=5,Object(c["q"])(this.phone);case 5:t=e.sent,console.log(t);case 7:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),login:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!this.loginMode){e.next=23;break}if(this.phone.trim()){e.next=6;break}return Object(o["a"])({message:"请输入手机号码",duration:500}),e.abrupt("return");case 6:if(this.phoneRight){e.next=9;break}return Object(o["a"])({message:"请输入正确的手机号码",duration:500}),e.abrupt("return");case 9:if(this.code.trim()){e.next=14;break}return Object(o["a"])({message:"请输入验证码",duration:500}),e.abrupt("return");case 14:if(/^\d{6}$/gi.test(this.code)){e.next=17;break}return Object(o["a"])({message:"请输入正确的验证码",duration:500}),e.abrupt("return");case 17:return e.next=19,Object(c["v"])(this.phone,this.code);case 19:t=e.sent,200===t.success_code?(this.syncUserInfo(t.data),this.$router.back()):Object(o["a"])({message:"登录失败，手机号码或者验证码不正确！",duration:500}),e.next=40;break;case 23:if(this.user_name){e.next=28;break}return Object(o["a"])({message:"请输入用户名！",duration:500}),e.abrupt("return");case 28:if(this.pwd){e.next=33;break}return Object(o["a"])({message:"请输入密码！",duration:500}),e.abrupt("return");case 33:if(this.captcha){e.next=36;break}return Object(o["a"])({message:"请输入验证码！",duration:500}),e.abrupt("return");case 36:return e.next=38,Object(c["x"])(this.user_name,this.pwd,this.captcha);case 38:n=e.sent,200===n.success_code?(this.syncUserInfo(n.data),this.$router.back()):Object(o["a"])({message:"登录失败，用户名或者密码不正确！",duration:500});case 40:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),dealPwdMode:function(e){this.pwdMode=e},getCaptcha:function(){var e=this.$refs.captcha;this.$set(e,"src","http://demo.itlike.com/web/xlmc/api/captcha?time="+new Date)}})},h=d,m=(n("c91b"),n("2877")),g=Object(m["a"])(h,a,r,!1,null,"1718db0c",null);t["default"]=g.exports},f880:function(e,t,n){e.exports=n.p+"img/show_pwd.fa936067.png"}}]);
//# sourceMappingURL=chunk-7cef6dba.aa7e7056.js.map