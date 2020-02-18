export default {
    install(Vue)
    {
        Vue.prototype.serveUrl = function () {
            var currentBaseURL = location.protocol + "//" + location.hostname;
            return currentBaseURL;
            // return 'http://localhost';
        };
        
        // getCookie转移到这里了
        Vue.prototype.getCookie = function(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    // console.log(cookie);
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        };
    }
}