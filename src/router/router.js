/**
 * Created by Leafqun on 2017/6/9.
 */
import Vue from 'vue'
import Router from 'vue-router'
import login from '../page/login_register/login.vue'
import register from '../page/login_register/register.vue'
import notice_home from '../page/notice/notice_home.vue'
import notice_content from '../page/notice/notice_content.vue'
import notice_edit from '../page/notice/notice_edit.vue'
import notice_edit2 from '../page/notice/notice_edit2.vue'

Vue.use(Router)

export default new Router({
    base:'/student_website/',
    routes:[
        { path:'/',redirect:'/login' },
        { path:'/login',name:'login',component:login },
        { path:'/register',name:'register',component:register },
        { path:'/notice',name:'notice',component:notice_home},
        { path:'/notice/:noticeId',name:'notice_content',component:notice_content },
        { path:'/notice/:noticeId/edit',name:'notice_edit',component:notice_edit },
        { path:'/notice/:noticeId/edit2',name:'notice_edit2',component:notice_edit2 }
    ]
})