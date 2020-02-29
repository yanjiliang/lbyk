export default {
    getDevice() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            //这个是安卓操作系统
            return 'android'
        }
        if (isiOS) {　　 //这个是ios操作系统
            return 'ios'
        }
    }
}