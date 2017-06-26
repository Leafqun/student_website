<template>
    <div class="submitMenu">
        <h3>通知详情</h3>
    <el-form :model="notice" label-width="80px" id="tf">
        <div>
            <input type="hidden" v-model="notice.noticeId" name="noticeId"/>
            <input type="hidden" v-model="notice.userId" name="userId"/>
            <input type="hidden" v-model="notice.file" name="file"/>
        </div>
        <el-form-item label="通知名称">
            <el-input v-model="notice.noticeName" name="noticeName"></el-input>
        </el-form-item>
        <el-form-item label="通知内容">
            <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="notice.content" name="content"></el-input>
        </el-form-item>

        <el-form-item label="通知附件">
            <el-input v-model="notice.file" :disabled="true"></el-input>
            <el-upload
                    class="upload-demo"
                    ref="upload"
                    action=""
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false"
                    name="cfile">
                <el-button slot="trigger" size="small" type="primary">重新上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传一个文件，且不超过50M</div>
            </el-upload>
            <!--<el-upload class="upload-demo" drag action="" :auto-upload="false">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>-->
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                fileList:[],
                notice:{
                    noticeId:null,
                    noticeName:null,
                    userId:null,
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
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        }
    }
</script>

<style scoped>
    .submitMenu{
        width:900px;
        margin:auto;
    }
</style>