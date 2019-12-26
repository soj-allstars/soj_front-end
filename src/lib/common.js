export default {
    install(Vue)
    {
        Vue.prototype.serveUrl = function () {
            return 'http://47.106.140.231';
        };
    }
}