<template>
    <div>
        <div v-if="notice">
            <h3>{{notice.noticeName}}</h3>
            <div class="content">{{notice.content}}</div>
            <div class="msg">
                <p><a :href="'http://119.23.22.99/static/'+notice.file" download="notice.file">{{notice.file}}</a></p>
                <p>{{notice.noticeTime|dateFormat}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import filter from './filter.js'
    export default {
        data(){
            return {
                notice:null
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
        methods: {
            fetchData () {
                this.error =  null
                this.loading = true
                this.$http.post("http://119.23.22.99:8080/Student_Website/notice/getNoticeContent.do",{noticeId:this.$route.params.noticeId},{emulateJSON:true}).then(function (response) {
                    var data=response.body;
                    console.log(data.msg);
                    this.notice=data.notice;
                    this.loading=false;
                },function(error){
                    console.log(error);
                    this.error=error;
                });
            }
        },
        filter
    }
</script>

<style scoped>
.msg{
    text-align: right;
}

</style>