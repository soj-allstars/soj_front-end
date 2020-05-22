<template>
    <problem-view
            :pid="pid"
            :title="title"
            :time_limit="time_limit"
            :memory_limit="memory_limit"
            :description="description"
            :sample_inputs="sample_inputs"
            :sample_outputs="sample_outputs"
            :note="note"
            :submit-page="{ name: 'problemSubmit', query : { 'pid': pid } }"
    ></problem-view>
</template>

<script>
    import problemView from "./problemView";

    export default {
        components: {
            problemView,
        },
        data : function () {
            return {
                pid: -1,

                title: "",
                time_limit: 0,
                memory_limit: 0,
                description: "",
                sample_inputs: [],
                sample_outputs: [],
                note: "",
            }
        },
        methods: {
            get_problem: function () {
                let thisCom = this;
                $.ajax({
                    //请求方式
                    type : "GET",
                    //请求地址
                    url : thisCom.serveUrl() + '/api/problem/' + thisCom.pid + '/',
                    //请求成功
                    success : function(result) {
                        thisCom.title = result.title;
                        thisCom.time_limit = result.time_limit;
                        thisCom.memory_limit = result.memory_limit;
                        thisCom.description = result.description;
                        thisCom.sample_inputs = result.sample_inputs;
                        thisCom.sample_outputs = result.sample_outputs;
                        thisCom.note = result.note;
                    },
                    //请求失败，包含具体的错误信息
                    error : function(e){
                        /* eslint-disable no-console */
                        console.error(e.status);
                        console.error(e.responseText);
                        /* eslint-enable no-console */
                    }
                });
            },
        },
        beforeMount : function() {
            this.pid = this.$route.query.pid;
            this.get_problem();
        },
      
        // 只改变参数是不会使页面刷新的
        // 需要通过这个函数来执行参数更新的操作
        beforeRouteUpdate (to, from, next) {
        // react to route changes...
        // don't forget to call next()
            this.pid = to.query.pid;
            this.get_problem();
            next();
        }
    }
    
</script>

<style scoped>

</style>