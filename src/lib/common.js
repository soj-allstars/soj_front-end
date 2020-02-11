export default {
    install(Vue)
    {
        Vue.prototype.serveUrl = function () {
            var currentBaseURL = location.protocol + "//" + location.hostname;
            return currentBaseURL;
            // return 'http://localhost';
        };
    }
}