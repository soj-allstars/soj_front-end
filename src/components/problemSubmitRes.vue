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
                                    <tr v-for="res in results" :key="res.id">
                                        <td class="text-left">
                                            <v-btn  text block
                                                    class="d-flex justify-start px-0"
                                                    :to="{ name: 'problemSubmitResDetail', query: {submission_id : res.id} }">
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
                        ></v-pagination>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
import router from "../router";

export default {
    data : function () {
        return {
            // 和后端交互
            submission_count: 0,
            previous: null,
            next: null,
            results: null,
            page_length: 20,
            
            /* 用于控制页面本身元素 */
            // 分页数的v-model
            selected_page: 1,
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
        }
    },

    beforeMount() {
        let thisCom = this;
        let page_num = 0;
        if (thisCom.$route.query.page) {
            page_num = thisCom.$route.query.page;
        }
        $.ajax({
            // 请求方式
            type : "GET",
            // 请求地址
            url : thisCom.serveUrl() + '/api/submissions' + '/',
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
            }
        });
    },

    beforeRouteUpdate(to, from, next) {
        let thisCom = this;
        let page_num = 0;
        if (to.query.page) {
            page_num = to.query.page;
        }
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
            }
        });
        next();
    }

}
</script>