<template>
    <div>
        <h3>通知列表</h3>
        <div v-if="error" class="error">
            {{ error }}
        </div>
        <div v-loading="loading" element-loading-text="拼命加载中" class="notice">
        <div v-for="(notice,index) in noticeList" v-if="noticeList" class="post" >
            <div>
            <div>
                <span>{{(currentPage-1)*10+index+1}}.</span><router-link :to="{name:'notice_content',params:{noticeId:notice.noticeId}}">{{notice.noticeName}}</router-link>
                <router-link :to="{name:'notice_edit2',params:{noticeId:notice.noticeId}}" class="pic"><img :src="pic"/></router-link>
            </div>
            <p>{{notice.noticeTime|dateFormat}}</p>
            </div>
        </div>
        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="total,prev, pager, next, jumper"
                    :total="totalNum">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import filter from './filter.js'
    var pic=require('./img/page_white_edit.png');
    export default {
        data(){
            return {
                noticeList:null,
                loading:false,
                error:null,
                pic:pic,
                currentPage:1,
                totalNum:null
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
                this.$http.post("http://119.23.22.99:8080/Student_Website/notice/getNoticeNum.do").then(function (response) {
                    var data=response.body;
                    console.log(data.num);
                    this.totalNum=data.num;
                },function(error){
                    console.log(error);
                });
                this.$http.post("http://119.23.22.99:8080/Student_Website/notice/getNotice.do",{pageNum:1},{emulateJSON:true}).then(function (response) {
                    var data=response.body;
                    console.log(data.noticeList);
                    this.noticeList=data.noticeList;
                    this.loading=false;
                },function(error){
                    console.log(error);
                    this.error=error;
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: `+val);
                this.currentPage=val;
                console.log(this.currentPage);
                this.$http.post("http://119.23.22.99:8080/Student_Website/notice/getNotice.do",{pageNum:this.currentPage},{emulateJSON:true}).then(function (response) {
                    var data=response.body;
                    console.log(data.noticeList);
                    this.noticeList=data.noticeList;
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
.post{
    text-align: left;
}
.pic{
    margin-right: 0;
}
.notice{
    margin:10px 10px 0 30%;
}
</style>