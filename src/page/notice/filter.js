/**
 * Created by Leafqun on 2017/6/12.
 */
import Vue from 'vue'
Vue.filter("dateFormat",function (value) {
    var date = new Date(value);
    var Y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var H = date.getHours();
    var i = date.getMinutes();
    var s = date.getSeconds();
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    if (H < 10) {
        H = '0' + H;
    }
    if (i < 10) {
        i = '0' + i;
    }
    if (s < 10) {
        s = '0' + s;
    }
    //获取时间格式 2017-01-03 10:13:48
    var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
    //获取时间格式 2017-01-03
    //var t = Y + '-' + m + '-' + d;
    return t;
});