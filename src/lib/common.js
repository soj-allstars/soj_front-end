export default {
    install(Vue)
    {
        Vue.prototype.serveUrl = function () {
            return 'http://localhost';
        };
    }
}