<template>
    <div>
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
                    :class="(highlighted_id) ?
                                ((highlighted_id === res.id) ?
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
                        <!--分成比赛的列表页和非比赛的列表页……-->
                        <!--耦合度极高……但是不管了-->
                        <v-btn  text block
                                class="d-flex justify-start px-0"
                                :to="contest_mode ?
                                      { name: 'contestProblem', query: { pid: res.problem_no, cid: cid} }
                                    : { name: 'problem', query: {pid : res.problem_id} }">
                            {{contest_mode ? res.problem_no : res.problem_id}}
                        </v-btn>
                    </td>
                    <td class="text-left">{{res.user}}</td>
                    <td class="text-left caption">{{res.submit_time.replace('T', ' ').replace(/\..*/, '')}}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-row class="pt-3">
            <v-col>
                <v-pagination
                        :length="Math.ceil(submission_count / page_length)"
                        v-model="selected_page"
                        @input="click_input"
                        :total-visible="10"
                ></v-pagination>
            </v-col>
        </v-row>

        <v-dialog v-model="show_res_detail"
                  max-width="1000px"
        >
            <problemSubmitResDetail :submission_id="res_id"
            ></problemSubmitResDetail>
        </v-dialog>
    </div>
</template>

<script>
import router from "../router";
import problemSubmitResDetail from './problemSubmitResDetail';
import { verdict_font_color, verdict_long_name, language_long_name} from "../lib/lang_common";
export default {
    name: "problemSubmitRes",
    components: {
        problemSubmitResDetail,
    },
    props: {
        request_url: {
            type: String,
            default: null,
        },
        page: {
            type: Number,
            default: 1,
        },
        highlighted_id: {
            type: Number,
        },
        contest_mode: {
            type: Boolean,
            default: false,
        },
        cid: {
            type: Number,
            default: null,
        }
    },
    data : function () {
        return {
            // 和后端交互
            submission_count: 0,
            previous: null,
            next: null,
            results: null,
            res_id: null,
            // submission的websocket
            ws: null,
            resid_resobj_mapping: {},

            // 一页的提交数，需要和后端协调，目前定为20
            page_length: 20,
            
            /* 用于控制页面本身元素 */
            // 分页数的v-model
            selected_page: 1,
            // 弹出框的v-model
            show_res_detail: false,


            // verdict text mapping
            verdict_detail: verdict_long_name,
            // verdict color mapping
            verdict_color: verdict_font_color,
            // language mapping
            language_detail: language_long_name,
        }
    },
    methods: {
        click_input: function (num) {
            this.getSubmissionPage(num);
        },

        show_detail: function (res_id) {
            this.show_res_detail = true;
            this.res_id = res_id;
        },

        getSubmissionPage: function (page_num) {
            let thisCom = this;

            if (!this.ws) {
                let ws = new WebSocket("ws://" + location.hostname + "/ws/submission/");
                ws.onopen = function (evt) {
                    console.log("problemsubmitres ws connection open ...");
                    // if (thisCom.$route.params.hasOwnProperty("submission_id")) {
                    //     let post_data = {
                    //         type: "detail",
                    //         submission_id: thisCom.$route.params.submission_id,
                    //     };
                    //     this.ws.send(JSON.stringify(post_data));
                    //     console.log('send : ' + JSON.stringify(post_data));
                    // }
                    // for (let res of thisCom.results) {
                    //     if (res.verdict === "PENDING") {
                    //         let post_data = {
                    //             type: "detail",
                    //             submission_id: res.id,
                    //         };
                    //         this.ws.send(JSON.stringify(post_data));
                    //         console.log('send : ' + JSON.stringify(post_data));
                    //     }
                    // }

                    let post_data = {
                        type: "all"
                    };
                    ws.send(JSON.stringify(post_data));
                };
                ws.onmessage = function (evt) {
                    console.log("problemsubmitres this.ws received Message: " + evt.data);

                    let recv_data = JSON.parse(evt.data);
                    if (recv_data.hasOwnProperty("id")) {
                        if (thisCom.resid_resobj_mapping.hasOwnProperty(recv_data.id)) {
                            let res = this.resid_resobj_mapping[recv_data.id];
                            thisCom.$set(res, "verdict", recv_data.verdict);
                            thisCom.$set(res, "time", recv_data.time);
                            thisCom.$set(res, "memory", recv_data.memory);

                            console.log("edited");
                        }

                        // 遍历方法，蠢毙了
                        // for (let i = 0; i < thisCom.results.length; ++i) {
                        //     if (thisCom.results[i].id === recv_data.id) {
                        //         thisCom.$set(thisCom.results[i], "verdict", recv_data.verdict);
                        //         thisCom.$set(thisCom.results[i], "time", recv_data.time);
                        //         thisCom.$set(thisCom.results[i], "memory", recv_data.memory);
                        //         break;
                        //     }
                        // }
                    }
                };
                ws.onclose = function (evt) {
                    console.log("this.ws connection closed.");
                };

                this.ws = ws;
            }
            
            $.ajax({
                // 请求方式
                type : "GET",
                // 请求地址
                url: thisCom.request_url ? thisCom.request_url : thisCom.serveUrl() + '/api/submissions/',
                // url : thisCom.serveUrl() + '/api/submissions' + '/',
                data : {
                    page: page_num,
                },
                // 请求成功
                success : function(result) {
                    console.log(thisCom.request_url);
                    thisCom.submission_count = result.count;
                    thisCom.next = result.next;
                    thisCom.previous = result.previous;
                    thisCom.results = result.results;

                    // results[x].id到result[x]的mapping
                    thisCom.resid_resobj_mapping = {};

                    for (let i = 0; i < thisCom.results.length; ++i) {
                        thisCom.resid_resobj_mapping[thisCom.results[i].id] = thisCom.results[i];
                    }

                },
                // 请求失败，包含具体的错误信息
                error : function(e){
                    console.log(e.status);
                    console.log(e.responseText);
                    alert(e.responseText);
                }
            });

        },
    },

    beforeMount() {

        let page_num = 1;
        if (this.page) {
            this.getSubmissionPage(this.submission_id);
        } else if (this.$route.query.page) {
            this.getSubmissionPage(this.$route.query.submission_id);
        } else {
            this.getSubmissionPage(page_num);
        }
    },

    beforeRouteUpdate(to, from, next) {
        let thisCom = this;
        let page_num = 1;
        if (to.query.page) {
            page_num = to.query.page;
        }
        this.getSubmissionPage(page_num);

        next();
    },

    beforeRouteLeave(to, from, next) {
        this.ws.close();
        next();
    }

}
</script>