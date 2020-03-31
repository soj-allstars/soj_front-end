<template>
    <v-container
            fluid
            no-gutters
    >
        <v-row align="center" justify="center">
            <v-col cols="10">
                <v-card class="pa-10" color="#dddddd">
                    <v-row align="center" justify="center">
                        <v-col cols="10">
                            <v-card class="pa-7">
                                <v-row justify="center">
                                    <v-col cols="10" class="d-flex justify-center">
                                        <v-row class="py-7">
                                            <v-col cols="6">
                                                <v-row justify="center">
                                                    <v-col class="pt-0">
                                                        <v-img :src="require('../assets/ACMYES/' + verdict + '.png')" height="200" :contain="true"></v-img>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col>
                                                <div>
                                                    <v-row>
                                                        <v-col>
                                                            <v-icon class="mr-2">mdi-calendar</v-icon>
                                                            <span class="text--secondary">{{submit_time}}</span>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col>
                                                            <v-icon class="mr-2">mdi-timer</v-icon>
                                                            <span class="text--secondary">{{time_usage}} ms</span>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col>
                                                            <v-icon class="mr-2">mdi-database</v-icon>
                                                            <span class="text--secondary">{{memory_usage}} KB</span>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col>
                                                            <v-icon class="mr-2">mdi-flag</v-icon>
                                                            <span class="text--secondary">{{lang}}</span>
                                                        </v-col>
                                                    </v-row>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-row justify="center" v-show="code">
                                    <v-col cols="10">
                                        <div class="d-flex justify-center">
                                            <pre><code class="pa-12" v-html="code"></code></pre>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import hljs from 'highlight.js';

    export default {
        name: "problemSubmitResDetail",
        data: function () {
            return {
                verdict: 'PENDING',
                memory_usage: 0,
                time_usage: 0,
                submit_time: null,
                code: '',
                lang: '',
                outputs: null,

            }
        },
        computed: {
            strip_code: function() {
                return $.trim(this.code);
            }
        },

        methods: {
            getSubmission: function(submission_id) {
                var thisCom = this;
                $.ajax({
                    //请求方式
                    type : "GET",
                    //请求地址
                    url : thisCom.serveUrl() + '/api/submission/' + submission_id + '/',
                    //请求成功
                    success : function(result) {
                        // 因为是异步的，所以可能执行这个函数的时候，调用这个函数之后的代码段可能已经运行了

                        thisCom.verdict = result.verdict;
                        thisCom.memory_usage = result.memory;
                        thisCom.time_usage = result.time;
                        // 格式大概是 2020-02-16T07:53:12.550631+08:00
                        thisCom.submit_time = result.submit_time;
                        thisCom.code = result.code;
                        thisCom.lang = result.lang;
                        thisCom.outputs = result.outputs;

                        thisCom.code = thisCom.code.replace(/[<>]/g, function (word) {
                            if (word === '<') {
                                return "&lt;";
                            }
                            else {
                                return "&gt;";
                            }
                        });


                        thisCom.submit_time = thisCom.submit_time.replace('T', ' ');
                        thisCom.submit_time = thisCom.submit_time.replace(/\.\d+/, ' UTC');

                        console.log("sid:\n" + submission_id);
                        console.log('verdict:\n' + thisCom.verdict);
                        console.log('memory_usage:\n' + thisCom.memory_usage);
                        console.log('time_usage:\n' + thisCom.time_usage);
                        console.log('submit_time:\n' + thisCom.submit_time);
                        console.log('code:\n' + thisCom.code);
                        console.log('lang:\n' + thisCom.lang);
                        console.log('outputs:\n' + thisCom.outputs);

                        // thisCom.items[0].status = thisCom.verdict;
                        // thisCom.items[0].memory_cost = thisCom.memory_usage;
                        // thisCom.items[0].time_cost = thisCom.time_usage;
                        // thisCom.items[0].submit_time = thisCom.submit_time;
                        // thisCom.items[0].language = thisCom.lang;
                    },
                    //请求失败，包含具体的错误信息
                    error : function(e){
                        console.log(e.status);
                        console.log(e.responseText);
                    }
                });
            }
        },
        created: function() {
            let thisCom = this;
            this.getSubmission(this.$route.query.submission_id);
        },
        mounted() {
            hljs.initHighlightingOnLoad();
        },
        updated() {
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        },

        beforeRouteUpdate (to, from, next) {
            // react to route changes...
            // don't forget to call next()
            this.getSubmission(to.query.submission_id);
            next();
        },
    }
</script>

<style scoped>
    pre code::before {
        content: "" !important;
        letter-spacing: 0 !important;
    }
    pre code::after {
        content: "" !important;
        letter-spacing: 0 !important;
    }
</style>