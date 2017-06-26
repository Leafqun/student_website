<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>
        <div>
            <form action="javascript:void(0)" method="post"  enctype="multipart/form-data" id="tf" v-model="notice">
                <div>
                    <input type="hidden" v-model="notice.noticeId" name="noticeId"/>
                    <input type="hidden" v-model="notice.userId" name="userId"/>
                    <input type="hidden" v-model="notice.file" name="file"/>
                </div>
                <div>
                    <input type="text" name="noticeName" v-model="notice.noticeName"/>
                </div>
                <div>
                    <textarea class="content" name="content" v-model="notice.content"/>
                </div>
                <div class="file">
                    <span v-if="notice"><a :href="'http://119.23.22.99/static/'+notice.file" download="notice.file">{{notice.file}}</a></span>
                    <span><input type="file"  name="cfile" class="ff"/>上传</span>
                </div>
                <el-button type="primary" @click="submit">提交</el-button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                notice:{
                    noticeId:null,
                    userId:null,
                    noticeName:null,
                    content:null,
                    file:null
                }
            }
        },
        created(){
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
        },
        /*watch: {
         // 如果路由有变化，会再次执行该方法
         '$route': 'fetchData'
         },*/
        methods:{
            submit:function () {
                var formData=new FormData(document.getElementById("tf"));
                /*var request=new XMLHttpRequest();
                request.open("POST","http://localhost:8080/notice/submitNotice.do");
                if(request.readyState==4&&callback){
                    callback(request);
                }
                request.send(formData);
                request.onreadystatechange=function(){
                    if(request.readyState ===4 && request.status===200){
                        var data= JSON.parse(request.responseText);
                        console.log(data.msg);
                        if(data.msg=='更改成功'){
                            window.location.href='../#/notice';
                        }
                    }
                }*/
                this.$http.post("http://119.23.22.99:8080/Student_Website/notice/submitNotice.do",formData,{emulateJSON:true}).then(function (response) {
                    var data=response.body;
                    console.log(data.msg);
                    if(data.msg=='更改成功'){
                        this.$router.push({name:'notice'});
                    }

                },function(error){
                    console.log(error);
                    this.error=error;
                });
            },
            fetchData () {
                this.$http.post("http://119.23.22.99:8080/Student_Website/notice/getNoticeContent.do",{noticeId:this.$route.params.noticeId},{emulateJSON:true}).then(function (response) {
                    var data=response.body;
                    console.log(data.msg);
                    if(data.notice!=null) {
                        this.notice = data.notice;
                    }
                },function(error){
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
    .content{
        width:600px;
        height:500px;
    }
    .file{

    }
</style>