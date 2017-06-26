<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="login">
        <div id="login_page">
            <h1 class="hh1">登录</h1>
            <div class="login_input">
                <form method="get" action="javascript:void(0)">
                    <div class="user">
                        <div class="lineH">
                            <i></i>
                            <input type="text" class="in" name="username" id="logname" v-model="username"
                                   placeholder="手机号、账号或邮箱"></input>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input type="password" class="in" name="password" id="password" v-model="password"
                                   placeholder="密码"></input>
                            <div class="forget">
                                <a href="">忘记密码？</a>
                            </div>
                        </div>
                    </div>
                    <span>
						<button class="button1" id="loginButton" v-on:click="login">登录</button>
					</span>
                </form>
                <div id="login_error_msg">{{msg}}</div>
            </div>
        </div>
        <div id="no_account">
            <p class="plz_reg">
                没有账户？ <router-link to="/register">请注册</router-link>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name:'login',
        data(){
            return {
                msg: null,
                username:null,
                password:null
            }
        },
        methods: {
            login: function () {
                if(this.username==null||this.username==''){
                    this.msg='用户名为空';
                }else if(this.username.length<3||this.username.length>10){
                    this.msg='请输入4-9位的用户名';
                }else{
                    this.$http.post("http://localhost:3000/login",{userName:this.username,userPwd:this.password},{emulateJSON:true}).then(function (response) {
                        var data=response.body;
                        console.log(data.msg);
                        if(data.msg=='success'){
                            this.$router.push({name:'notice'});
                        }else{
                            this.msg=data.msg;
                        }
                    },function(error){
                        console.log(error);
                    });
                }
            }
        }
    }
</script>

<style scoped>
    body{
        background: url(./img/1.jpg) no-repeat left top;
        background-size:100% 100%;
    }
    #login{
        color: #262626;
        margin: 100px 300px 100px 40%;
        max-width: 350px;
        position: relative;
    }
    #login_page,#no_account{
        background-color: #fff;
        border: 1px solid #e6e6e6;
        border-radius: 1px;
        margin: 10px 10px;
        padding: 10px 0;
        width:100%;
    }

    .hh1 {
        margin: 22px auto 8px;
        background-position: 0 0;
        height: 51px;
        width: 175px;
        text-align: center;
    }

    .login_input{
        padding: 10px 40px;
    }

    .in {
        background: 0 0;
        border: 1px solid #dbdbdb;
        border-radius: 3px;
        box-sizing: border-box;
        color: #262626;
        font-size: 14px;
        padding: 9px 8px 7px;
        -webkit-appearance: none;
        width:100%;
    }



    .forget {
        text-align: right;
        vertical-align: baseline;
        height: 30px;
    }

    .button1 {
        background: #3897f0;
        border-color: #3897f0;
        color: #fff;
        border-radius: 3px;
        border-style: solid;
        border-width: 1px;
        font-weight: 600;
        outline: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        height: 30px;
        -webkit-appearance: none;
    }

    .lineH {
        height: 40px;
    }

    .plz_reg{
        text-align: center;
    }

    #login_error_msg{
        padding-top:15px;
        text-align:center;
    }
</style>