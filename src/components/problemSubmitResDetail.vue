<template>
        <v-card class="pa-10" color="#dddddd">
            <v-row align="center" justify="center">
                <v-col cols="12">
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
                                                    <span class="text--secondary">{{language_long_name[lang]}}</span>
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row justify="center" v-if="code">
                            <v-col cols="10">
                                <div class="d-flex justify-start grey lighten-4"
                                >
<!--                                    <pre><code class="pa-12" v-html="code"></code></pre>-->
                                        <pre class="pa-5 grey lighten-4"
                                             :class="language_formal_name[lang]"
                                             v-html="code"></pre>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row justify="center" v-if="desc">
                            <v-col cols="11" class="d-flex justify-center">
                                <v-card outlined tile class="red--text caption pa-3">
                                    <p v-for="para in  desc.split('\n')" :key="para.id">
                                        {{para}}
                                    </p>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
</template>

<script>
    import hljs from 'highlight.js';
    import { language_long_name, language_formal_name } from '../lib/lang_common'

    export default {
        name: "problemSubmitResDetail",
        props: ["submission_id"],
        data: function () {
            return {
                verdict: "CE",
                memory_usage: 0,
                time_usage: 0,
                submit_time: null,
                code: '',
                lang: '',
                desc: null,

                language_long_name: language_long_name,
                language_formal_name: language_formal_name,

            }
        },
        computed: {
            strip_code: function() {
                return $.trim(this.code);
            }
        },

        methods: {
            getSubmission: function(submission_id) {
                let thisCom = this;
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
                        thisCom.desc = result.desc;

                        if (result.verdict === "PENDING") {
                            let ws = new WebSocket("ws://" + location.hostname + "/ws/submission/");

                            ws.onopen = function(evt) {
                                /* eslint-disable no-console */
                                console.log("WS connection open ...");
                                let post_data = {
                                    type: "detail",
                                    submission_id: submission_id,
                                };
                                ws.send(JSON.stringify(post_data));
                            };

                            ws.onmessage = function(evt) {
                                console.log( "submitResDetail WS received Message: " + evt.data);
                                let recv_data = JSON.parse(evt.data);
                                if (recv_data.hasOwnProperty("id")) {
                                    thisCom.verdict = recv_data.verdict;
                                    thisCom.memory_usage = recv_data.memory;
                                    thisCom.time_usage = recv_data.time;
                                }
                            };

                            ws.onclose = function(evt) {
                                console.log("WS connection closed.");
                            };
                            /* eslint-enable no-console */
                        }

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
                    },
                    //请求失败，包含具体的错误信息
                    error : function(e, textStatus) {
                        if (e.status == 403) {
                            thisCom.verdict = 'PENDING';
                            thisCom.memory_usage = 0;
                            thisCom.time_usage = 0;
                            thisCom.submit_time = null;
                            thisCom.code = '';
                            thisCom.lang = '';
                            thisCom.desc = 'you have no permission to check other\'s code';
                        } else {
                            console.error(e.status);
                            console.error(e.responseText);
                            alert(e.responseText);
                        }
                    }
                });
            }
        },

        watch: {
            submission_id: function () {
                if (this.submission_id) {
                    this.getSubmission(this.submission_id);
                }
            }
        },

        created: function() {
            let thisCom = this;
            if (this.submission_id) {
                this.getSubmission(this.submission_id);
            }
            else {
                this.getSubmission(this.$route.query.submission_id);
            }
        },
        mounted() {},
        updated() {
            $('pre').each(function(i, block) {
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
    code, kbd, pre, samp {
        font-family: monospace, monospace !important;
        font-size: .75rem !important;
    }

    pre code::before {
        content: "" !important;
        letter-spacing: 0 !important;
    }
    pre code::after {
        content: "" !important;
        letter-spacing: 0 !important;
    }
</style>