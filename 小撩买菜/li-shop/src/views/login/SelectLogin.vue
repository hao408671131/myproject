<template>
    <div class="select-login">
        <div class="bottom">
            <img src="./images/lk_logo_sm.png" alt="" width="300">
        </div>
        <h4>选择登录方式</h4>
        <button @click="toLogin">手机登录</button>
    </div>
</template>

<script>
    export default {
        name: "SelectLogin",
        methods:{
            //去登录界面
            toLogin(){
                this.$router.push('/login');
            },

        }
    }
</script>

<style scoped>
    .select-login{
        background-color: #f5f5f5;
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 3.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    button{
        width: 80%;
        height: 38px;
        background-color: #2eba5a;
        border: none;
        border-radius: 5px;
        font-size: 20px;
        color: #fff;
        margin-top: 30px;
    }
    .bottom{
        position: fixed;
        top: 130px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>