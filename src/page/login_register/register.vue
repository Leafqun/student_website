<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="register" id="register">
        <div class="rrrr">
        <div class="register_page">
            <h1 class="hh1">注册</h1>
            <div class="regInput">
            <form method="POST" action="javascript:void(0)" name="regForm">
                <div class="lineH">
                    <div :class="user_pic">
                    <input type="text" class="in" name="username" id="regName" v-model="regname" v-on:blur="userCheck"
                           placeholder="手机号、账号或邮箱" ></input>
                    </div>
                </div>
                <div class="lineH">
                    <div :class="pwd_pic" >
                    <input type="password" class="in" name="password" id="pwd1" v-model="regpwd" v-on:blur="pwdCheck"
                           placeholder="密码"></input>
                    </div>
                </div>
                <div class="lineH">
                    <div :class="pwd2_pic" >
                    <input type="password" class="in" name="pwd2" id="pwd2" v-model="regpwd2" v-on:blur="pwd2Check"
                           placeholder="确认密码"></input>
                    </div>
                </div>
                <span>
                    <button class="button1" id="regButton" v-on:click="register">注册</button>
                </span>
            </form>
            </div>
        </div>
        <div class="has_account">
            <p class="plz_log">
                已有账户？ <router-link to="/login">登录</router-link>
            </p>
        </div>
        </div>
        <div class="error" style="display: none">
            <div class="eee">
            <img v-if="regUserCheck=='success'" v-bind:src="pic" />
            <p v-else>{{regUserCheck}}</p>
            </div>
            <div class="ee">
            <img v-if="regpwdCheck=='success'" :src="pic" />
            <p v-else>{{regpwdCheck}}</p>
            </div>
            <div class="e">
            <img v-if="regpwd2Check=='success'" :src="pic" />
            <p v-else>{{regpwd2Check}}</p>
            </div>
        </div>

    </div>

    </div>
</template>

<script>
    var pic=require('./img/right.png');
    export default {
        data(){
            return {
                regname:null,
                regpwd:null,
                regpwd2:null,
                regUserCheck:null,
                regpwdCheck:null,
                regpwd2Check:null,
                pic:pic,
                user_pic:null,
                pwd_pic:null,
                pwd2_pic:null
            }
        },
        methods:{
            register:function () {
                if(this.regUserCheck=='success'&&this.regpwdCheck=='success'&&this.regpwd2Check=='success'){
                    this.$http.post("http://119.23.22.99:8080/Student_Website/registerCheck.do",{userName:this.regname,userPwd:this.regpwd},{emulateJSON:true}).then(function (response) {
                        var data=response.body;
                        console.log(data.msg);
                        if(data.msg=='success'){
                            this.$router.push({name:'login'});
                        }else{
                            this.regpwdCheck=data.msg;
                        }
                    },function(error){
                        console.log(error);
                    });
                }
            },
            userCheck:function () {
                if(this.regname==''||this.regname==null){
                    this.regUserCheck = "用户名不能为空";
                    this.user_pic='wrong1';
                }else if (this.regname.length < 4 || this.regname.length > 10) {
                    this.regUserCheck = "请输入4-9位的用户名";
                    this.user_pic='wrong2';
                }else{
                    this.$http.post("http://119.23.22.99:8080/Student_Website/registerCheck.do",{userName:this.regname},{emulateJSON:true}).then(function (response) {
                        var data=response.body;
                        console.log(data.msg);
                        if(data.msg=='用户名可用'){
                            this.regUserCheck='success';
                            this.user_pic='right';
                        }else{
                            this.regUserCheck='用户名已存在';
                            this.user_pic='wrong';
                        }
                    },function(error){
                        console.log(error);
                    });
                }
            },
            pwdCheck:function () {
                if(this.regpwd==null||this.regpwd==''){
                    this.regpwdCheck="请输入4-19位的密码";
                    this.pwd_pic='wrong3';
                }else if(this.regpwd.trim().length<3||this.regpwd.trim().length>20){
                    this.regpwdCheck="请输入4-19位的密码";
                    this.pwd_pic='wrong3';
                }else{
                    this.regpwdCheck='success';
                    this.pwd_pic='right';
                }
            },
            pwd2Check:function () {
                if(this.regpwd!=this.regpwd2){
                    this.regpwd2Check="两次输入密码不一致";
                    this.pwd2_pic='wrong4';
                }else{
                    this.regpwd2Check='success';
                    this.pwd2_pic='right';
                }
            }
        }
    }
</script>

<style scoped>
    body{
        background: white no-repeat left top;
        background-size:100% 100%;
    }
    .register{
        color: #262626;
        margin: 100px 300px 100px 40%;
        width:700px;
        position:relative;
        overflow:hidden;
    }
    .register_page{
        width:100%;
        position:relative;
        background-color: #fff;
        border: 1px solid #e6e6e6;
        border-radius: 1px;
        overflow: hidden;
    }
    .has_account{
        background-color: #fff;
        border: 1px solid #e6e6e6;
        border-radius: 1px;
        width:100%;
        margin-top:15px;
        overflow: hidden;
    }
    .rrrr{
        width:50%;
        float:left;
    }
    .lineH{
        width:100%;
        margin-bottom: 10px;
    }
    .in{
        background: 0 0;
        border: 1px solid #dbdbdb;
        border-radius: 3px;
        box-sizing: border-box;
        color: #262626;
        font-size: 14px;
        padding: 9px 8px 7px;
        -webkit-appearance: none;
        width:100%;
        height: 30px;
    }
    .regInput{
        padding: 10px 40px;
    }
    .button1{
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
    .hh1{
        text-align: center;
    }
    .plz_log{
        text-align: center;
    }
    .error{
        position:relative;
        float:left;
    }
    .eee{
        margin-top:102px;
        text-align: left;
        font-size:15px;
        color:red;
    }
    .ee{
        text-align: left;
        color:red;
        font-size:15px;
        margin-top:20px;
    }
    .e{
        text-align: left;
        color:red;
        font-size:15px;
        margin-top:20px;
    }
    .right{
        background: url("img/right.png") no-repeat 100% 50%;
    }
    .wait{

    }
    .wrong{
        background: url("img/wrong.png") no-repeat 100% 50%;
    }
    .wrong1{
        background: url("img/wrong1.png") no-repeat 100% 50%;
    }
    .wrong2{
        background: url("img/wrong2.png") no-repeat 100% 50%;
    }
    .wrong3{
        background: url("img/wrong3.png") no-repeat 100% 50%;
    }
    .wrong4{
        background: url("img/wrong4.png") no-repeat 100% 50%;
    }
</style>