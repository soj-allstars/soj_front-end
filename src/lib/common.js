export default {
    install(Vue)
    {
        Vue.prototype.serveUrl = function () {
            var currentBaseURL = location.protocol + "//" + location.hostname;
            return currentBaseURL;
        };

        Vue.prototype.signInGlobalInfo = function () {
            let thisCom = this;
            let ret = {};
            $.ajax({
                async: false,
                type: "GET",
                url: thisCom.serveUrl() + "/api/global-info/",
                success: function(result) {
                    ret.is_signed_in = result.is_signed_in;
                    ret.username = result.username;
                },
                error: function(e) {
                    console.error(e.status);
                    console.error(e.responseText);
                },
            });
            return ret;
        }
        
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