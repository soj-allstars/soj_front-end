<template>
    <v-content
     fluid
     no-gutters
    >
        <v-row
         align='center'
         justify='center'
        >
            <v-col cols='10' align="center">
                <v-card tile
                        class="pa-10"
                >
                    <v-row>
                        <v-col>
                            <v-simple-table fixed-header
                                            height="450px"
                            >
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th class="text-left">ID</th>
                                        <th class="text-left">Verdict</th>
                                        <th class="text-left">Time Cost</th>
                                        <th class="text-left">Memory Cost</th>
                                        <th class="text-left">Language</th>
                                        <th class="text-left">Problem ID</th>
                                        <th class="text-left">Username</th>
                                        <th class="text-left">Submit Time</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="res in results" :key="res.id"
                                        :class="($route.params.submission_id) ?
                                                    (($route.params.submission_id === res.id) ?
                                                        'lime lighten-5'
                                                    : '')
                                                : '' "
                                    >
                                        <td class="text-left">
                                            <v-btn  text block
                                                    class="d-flex justify-start px-0"
                                                    @click="show_detail(res.id)"
                                                    >
                                                {{res.id}}
                                            </v-btn>
                                        </td>
                                        <td class="text-left"
                                            :class="verdict_color[res.verdict]"
                                        >
                                            {{verdict_detail[res.verdict]}}
                                        </td>
                                        <td class="text-left caption">
                                            {{res.time}} ms
                                        </td>
                                        <td class="text-left caption">
                                            {{res.memory}} KB
                                        </td>
                                        <td class="text-left">{{language_detail[res.lang]}}</td>
                                        <td class="text-left">
                                            <v-btn  text block
                                                    class="d-flex justify-start px-0"
                                                    :to="{ name: 'problem', query: {pid : res.problem_id} }">
                                                {{res.problem_id}}
                                            </v-btn>
                                        </td>
                                        <td class="text-left">{{res.user}}</td>
                                        <td class="text-left caption">{{res.submit_time.replace('T', ' ').replace(/\..*/, '')}}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-pagination
                                :length="Math.ceil(submission_count / page_length)"
                                v-model="selected_page"
                                @input="click_input"
                                :total-visible="10"
                        ></v-pagination>
                    </v-row>

                    <v-dialog v-model="show_res_detail"
                              max-width="1000px"
                    >
                        <problemSubmitResDetail :submission_id="res_id"
                        ></problemSubmitResDetail>
                    </v-dialog>

                </v-card>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
import router from "../router";
import problemSubmitResDetail from './problemSubmitResDetail';
export default {
    components: {
        problemSubmitResDetail,
    },
    data : function () {
        return {
            // 和后端交互
            submission_count: 0,
            previous: null,
            next: null,
            results: null,
            res_id: null,

            // 一页的提交数，需要和后端协调，目前定为20
            page_length: 20,
            
            /* 用于控制页面本身元素 */
            // 分页数的v-model
            selected_page: 1,
            // 弹出框的v-model
            show_res_detail: false,


            // verdict text mapping
            verdict_detail: {
                "AC": "Accepted",
                "WA": "Wrong Answer",
                "CE": "Compile Error",
                "RE": "Runtime Error",
                "SE": "System Error",
                "MLE": "Memory Limit Exceeded",
                "TLE": "Time Limit Exceeded",
                "OLE": "Output Limit Exceeded",
                "PE": "Presentation Error",
                "PENDING": "Pending",
            },
            // verdict color mapping
            verdict_color: {
                "AC": "green--text text--darken-1",
                "WA": "red--text text--darken-3",
                "CE": "deep-orange--text text--darken-1",
                "RE": "deep-orange--text text--darken-1",
                "SE": "deep-orange--text text--darken-1",
                "MLE": "amber--text text--darken-3",
                "TLE": "amber--text text--darken-3",
                "OLE": "amber--text text--darken-3",
                "PE": "light-blue--text text--darken-4",
                "PENDING": "blue-grey--text text--lighten-1",
            },
            // language mapping
            language_detail: {
                "GXX": "g++",
                "GCC": "gcc",
                "JAVA": "java",
                "CPY": "python(cpy)",
                "PYPY": "python(pypy)",
                "GO": "go",
                "JS": "javascript",
            }
        }
    },
    methods: {
        click_input: function (num) {
            router.push({name: 'problemSubmitRes', query: {page: num}});
        },

        show_detail: function (res_id) {
            this.show_res_detail = true;
            this.res_id = res_id;
        },

        getSubmissionPage: function (page_num) {
            let thisCom = this;
            $.ajax({
                // 请求方式
                type : "GET",
                // 请求地址
                url : thisCom.serveUrl() + '/api/submissions' + '/',
                data : {
                    page: page_num,
                },
                // 请求成功
                success : function(result) {
                    thisCom.submission_count = result.count;
                    thisCom.next = result.next;
                    thisCom.previous = result.previous;
                    thisCom.results = result.results;
                },
                // 请求失败，包含具体的错误信息
                error : function(e){
                    console.log(e.status);
                    console.log(e.responseText);
                    alert(e.responseText);
                }
            });

            let ws = new WebSocket("ws://" + location.hostname + "/ws/submission/");

            ws.onopen = function(evt) {
                console.log("WS connection open ...");
                if (!thisCom.results) {
                    // 如果ajax还没返回就再等等
                    setTimeout(ws.onopen, 250);
                    return;
                }
                if (thisCom.$route.params.hasOwnProperty("submission_id")) {
                    let post_data = {
                        type: "detail",
                        submission_id: thisCom.$route.params.submission_id,
                    };
                    ws.send(JSON.stringify(post_data));
                    console.log('send : ' + JSON.stringify(post_data));
                }
                for (let res of thisCom.results) {
                    if (res.verdict === "PENDING") {
                        let post_data = {
                            type: "detail",
                            submission_id: res.id,
                        };
                        ws.send(JSON.stringify(post_data));
                        console.log('send : ' + JSON.stringify(post_data));
                    }
                }
            };

            ws.onmessage = function(evt) {
                console.log( "WS received Message: " + evt.data);
                let recv_data = JSON.parse(evt.data);
                if (recv_data.hasOwnProperty("id")) {
                    // 遍历20个项……应该还好吧（？
                    for (let i = 0; i < thisCom.results.length; ++i) {
                        if (thisCom.results[i].id === recv_data.id) {
                            thisCom.$set(thisCom.results[i], "verdict", recv_data.verdict);
                            thisCom.$set(thisCom.results[i], "time", recv_data.time);
                            thisCom.$set(thisCom.results[i], "memory", recv_data.memory);
                            break;
                        }
                    }
                }
            };

            ws.onclose = function(evt) {
                console.log("WS connection closed.");
            };
        },
    },

    beforeMount() {
        let page_num = 1;
        if (this.$route.query.page) {
            page_num = this.$route.query.page;
        }
        this.getSubmissionPage(page_num);
    },

    beforeRouteUpdate(to, from, next) {
        let thisCom = this;
        let page_num = 1;
        if (to.query.page) {
            page_num = to.query.page;
        }
        this.getSubmissionPage(page_num);

        next();
    }

}
</script>