<template>
    <div>
        <v-row class="row_height">
            <v-col  class="px-5 d-flex align-center justify-end row_height">
                <v-select
                        :items="query_mode_selection"
                        v-model="selected_query_mode"
                >
                </v-select>
            </v-col>
            <v-col cols="7" class="px-5 d-flex align-center row_height"
                   v-if="selected_query_mode !== 'self' && selected_query_mode !== 'all'"
            >
                <v-text-field :placeholder="query_hint_text[selected_query_mode]"
                              v-model="query_text"
                >
                </v-text-field>
            </v-col>
            <v-col cols="2" class="px-5 d-flex align-center justify-end row_height">
                <v-btn block outlined
                       @click="getSubmissionPage(1)"
                >
                    查询
                </v-btn>
            </v-col>
        </v-row>

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
                            :class="(highlighted_id) ?
                                ((highlighted_id === res.id) ?
                                    'lime lighten-5'
                                : '')
                            : '' "
                        >
                            <td class="text-left">
                                <v-btn  text block
                                        class="d-flex justify-start px-0"
                                        :to="{ name: 'problemSubmitResDetail', query: { submission_id: res.id } }"
                                >
                                    {{res.id}}
                                </v-btn>
                            </td>
                            <td class="text-left show_res_btn"
                                :class="verdict_color[res.verdict]"
                                @click="show_detail(res.id)"
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
            </v-col>
        </v-row>

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
import problemSubmitResDetail from './problemSubmitResDetail';
import { verdict_font_color, verdict_long_name, language_long_name, query_mode, query_hint_text} from "../lib/lang_common";
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
            /* 和后端交互 */
            submission_count: 0,
            previous: null,
            next: null,
            results: null,
            res_id: null,

            // 已选择的查询模式
            selected_query_mode: null,
            // 用于查询的文本
            query_text: "",

            // websocket of submission
            ws: null,
            resid_resobj_mapping: new Map(),
            // mapping of ws
            ws_resid_resobj_mapping: new Map(),


            // 一页的提交数，需要和后端协调，目前定为20
            page_length: 20,
            
            /* 用于控制页面本身元素 */
            // 分页数的v-model
            selected_page: 1,
            // 弹出框的v-model
            show_res_detail: false,
            // 查询模式的选项
            query_mode_selection: query_mode,
            // 查询模式对应的输入提示文字
            query_hint_text: query_hint_text,


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

        getSubmissionPage: function(page_num) {
            let thisCom = this;
            let data_builder = {
                page: page_num
            };
            switch (this.selected_query_mode) {
                case "username":
                    data_builder.username = this.query_text;
                    break;
                case "self":
                    let global_info = this.signInGlobalInfo();
                    if (global_info.is_signed_in) {
                        data_builder.username = global_info.username;
                    }
                    break;
                default:
                    break;
            }
            $.ajax({
                // 请求方式
                type : "GET",
                // 请求地址
                url: thisCom.request_url ? thisCom.request_url : thisCom.serveUrl() + '/api/submissions/',
                // url : thisCom.serveUrl() + '/api/submissions' + '/',
                data : data_builder,
                // 请求成功
                success : function(result) {

                    // console.log(thisCom.request_url);
                    thisCom.submission_count = result.count;
                    thisCom.next = result.next;
                    thisCom.previous = result.previous;
                    thisCom.results = result.results;

                    // results[x].id到result[x]的mapping
                    thisCom.resid_resobj_mapping.clear();

                    for (let i = 0; i < thisCom.results.length; ++i) {
                        // 一定要用这个方式，否则则是看做Object添加属性了
                        thisCom.resid_resobj_mapping.set(thisCom.results[i].id, thisCom.results[i]);
                        if (thisCom.ws_resid_resobj_mapping.has(thisCom.results[i].id)) {
                            let res = thisCom.ws_resid_resobj_mapping.get(thisCom.results[i].id);
                            let target = thisCom.results[i];
                            thisCom.$set(target, "verdict", res.verdict);
                            thisCom.$set(target, "time", res.time);
                            thisCom.$set(target, "memory", res.memory);
                        }
                    }
                    thisCom.selected_page = parseInt(page_num);

                },
                // 请求失败，包含具体的错误信息
                error : function(e){
                    console.error(e.status);
                    console.error(e.responseText);
                    alert(e.responseText);
                }
            });
        },

        initLiveRes: function (page_num) {
            let thisCom = this;
            let ws = null;
            if (!thisCom.ws) {
                ws = new WebSocket("ws://" + location.hostname + "/ws/submission/");
                ws.onopen = function (evt) {
                    /* eslint-disable no-console */
                    console.log("problemsubmitres ws connection open ...");

                    let post_data = null;

                    if (thisCom.contest_mode) {
                        post_data = {
                            type: "contest",
                            contest_id: thisCom.cid,
                        };
                    }
                    else {
                        post_data = {
                            type: "all"
                        };
                    }
                    ws.send(JSON.stringify(post_data));
                    thisCom.getSubmissionPage(page_num);
                };

                ws.onmessage = function (evt) {
                    console.log("problemsubmitres this.ws received Message: " + evt.data);

                    let recv_data = JSON.parse(evt.data);
                    if (recv_data.hasOwnProperty("id")) {
                        if (thisCom.resid_resobj_mapping.has(recv_data.id)) {
                            let res = thisCom.resid_resobj_mapping.get(recv_data.id);
                            thisCom.$set(res, "verdict", recv_data.verdict);
                            thisCom.$set(res, "time", recv_data.time);
                            thisCom.$set(res, "memory", recv_data.memory);
                        } else {
                            thisCom.ws_resid_resobj_mapping.set(recv_data.id, recv_data);
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
                    /* eslint-enable no-console */
                };

                thisCom.ws = ws;
            }
        },
    },

    watch: {
        page: function () {
            if (this.page) {
                this.getSubmissionPage(this.page);
            }
        }
    },

    beforeMount() {
        if (this.$route.query.page) {
            this.initLiveRes(this.$route.query.page);
        } else if (this.page) {
            this.initLiveRes(this.page);
        }
    },

    beforeDestroy() {
        if (this.ws) {
            this.ws.close();
        }
    },

    beforeRouteUpdate(to, from, next) {
        let page_num = 1;
        if (to.query.page) {
            page_num = to.query.page;
            console.error("to.page: " + to.query.page);
        }
        this.getSubmissionPage(page_num);

        next();
    },

}
</script>

<style scoped>
    .row_height {
        height: 50px;
    }

    .show_res_btn:hover {
        cursor: pointer;
    }
</style>