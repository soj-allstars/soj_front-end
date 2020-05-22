<template>
    <problem-submit-view
            :pid="pid"
            @submit="submit_code"
    ></problem-submit-view>
</template>

<script>
    import problemSubmitView from "./problemSubmitView";
    export default {
        components: {
            problemSubmitView,
        },
        data : function () {
            return {
                cid: -1,
                pid: -1,
            }
        },
        methods: {
            submit_code: function(data_for_submit) {
                data_for_submit.contest_id = this.cid;
                let thisCom = this;
                $.ajax({
                    //请求方式
                    type : "POST",
                    //请求地址
                    url : thisCom.serveUrl() + '/api/submission/',
                    //POST里面的data
                    dataType: 'json',
                    data: data_for_submit,
                    //请求成功
                    success : function(result) {
                        thisCom.$router.push({
                            name: 'contest',
                            query: {
                                cid: thisCom.cid,
                            },
                            params: {
                                hlid: result.submission_id,  // 高亮提交的那一行
                            },
                        })
                    },
                    //请求失败，包含具体的错误信息
                    error : function(e){
                        /* eslint-disable no-console */
                        console.error(e.status);
                        console.error(e.responseText);
                        alert(e.responseText);
                        /* eslint-enable no-console */
                    },
                    
                });
            },
        },
        beforeMount: function () {
            this.pid = this.$route.query.pid;
            this.cid = this.$route.query.cid;
        },
        
    }
</script>

<style scoped>
    .button_font {
        font-weight: 500;
    }
    .white_font {
        color: white;
    }
</style>