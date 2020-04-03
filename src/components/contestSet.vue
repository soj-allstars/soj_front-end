<template>
    <v-container
            fluid
            no-gutters
    >
        <v-row
                align='center'
                justify='center'
        >
            <v-col cols='10'>
                <v-card class='pa-10'>
                    <div class="d-inline-flex justify-start align-start flex-wrap">
                        <v-row v-for="(ctst, index) in contests" :key="ctst.id"
                               class="row_length ma-2"
                               no-gutters
                        >
                            <v-col>
                                <v-card outlined tile class="px-7 py-5"
                                        :color="card_class[contests_status[index]]"
                                >
                                    <v-row>
                                        <v-col class="pt-0 pb-1">
                                            <v-btn text block tile
                                                   link :to="{ name:'contest', query: { cid: ctst.id } }"
                                                   class="headline font-weight-medium d-flex justify-start px-0"
                                                   :class="text_class[contests_status[index]]"
                                            >
                                                {{ctst.name}}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <div class="d-flex justify-start">
                                        <v-tooltip bottom color="#333">
                                            <template v-slot:activator="{ on }">
                                                <span class="caption"
                                                      :class="text_class[contests_status[index]]"
                                                      v-on="on"
                                                >
                                                    <v-icon small :color="icon_class[contests_status[index]]"
                                                    >mdi-calendar</v-icon>
                                                    {{start_time_simplified[index]}}
                                                </span>
                                            </template>
                                            <span>{{contests_status[index]}}</span>
                                        </v-tooltip>
                                        <span class="caption ml-8"
                                              :class="text_class[contests_status[index]]"
                                        >
                                            <v-icon small :color="icon_class[contests_status[index]]"
                                            >mdi-clock</v-icon>
                                            <span class="pl-1">{{cal_hour_length(ctst.start_time, ctst.end_time)}}</span>
                                        </span>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>


<!--                    <div class="text-center">-->
<!--                        <v-row class="row_height">-->
<!--                            <v-col cols='2' class="font-weight-black pa-0 ma-0 row_height">-->
<!--                                Begin Time-->
<!--                            </v-col>-->
<!--                            <v-col class="font-weight-black pa-0 ma-0">-->
<!--                                Name-->
<!--                            </v-col>-->
<!--                            <v-col cols='2' class="font-weight-black pa-0 ma-0 row_height">-->
<!--                                Length-->
<!--                            </v-col>-->

<!--                        </v-row>-->
<!--                        <v-row v-for="(ctst, index) in contests" :key="ctst.id"-->
<!--                               class="row_height"-->
<!--                               align="center"-->
<!--                               justify="center">-->
<!--                            <v-col cols='2' class="pa-0 ma-0 row_height rela_pos ">-->
<!--                                <v-tooltip top>-->
<!--                                    <template v-slot:activator="{ on }">-->
<!--                                        <v-card outlined tile class="row_height align-center justify-center d-flex text&#45;&#45;secondary"-->
<!--                                                :class="text_class[contests_status[index]]"-->
<!--                                                v-on="on"-->
<!--                                        >-->
<!--                                            {{start_time_simplified[index]}}-->
<!--                                        </v-card>-->
<!--                                    </template>-->
<!--                                    <span>{{contests_status[index]}}</span>-->
<!--                                </v-tooltip>-->

<!--                            </v-col>-->
<!--                            <v-col class="pa-0 ma-0 row_height">-->
<!--                                <v-btn text block outlined tile height="50px" class="text-none"-->
<!--                                       link :to="{ name:'contest', params: { cid: ctst.id } }">{{ctst.name}}</v-btn>-->
<!--                            </v-col>-->
<!--                            <v-col cols='2' class="pa-0 ma-0 row_height">-->
<!--                                <v-card outlined tile class="row_height align-center justify-center d-flex text&#45;&#45;secondary">-->
<!--                                    {{cal_time_length(ctst.start_time, ctst.end_time)}}-->
<!--                                </v-card>-->
<!--                            </v-col>-->

<!--                        </v-row>-->
<!--                    </div>-->

                        <v-pagination :length="Math.ceil(contest_cnt / page_length)"
                                      v-model="selected_page"
                                      @input="click_input"
                                      :total-visible="10"
                                      class="mt-10"
                        ></v-pagination>


                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    import router from "../router";

    export default {
        name: "contestSet",
        data: function () {
            return {
                /* 用于控制页面元素 */

                // 下面的页面栏的v-model
                selected_page: 1,

                // 每个比赛开始时间的简化（字符串）
                start_time_simplified: [],

                // 每个比赛的状态（字符串）
                contests_status: [],

                // 每个状态的字体颜色
                icon_class: {
                    running: "white",
                    scheduled: "blue darken-4",
                    ended: "grey darken-1",
                },
                text_class: {
                    running: "white--text",
                    scheduled: "blue--text text--darken-4",
                    ended: "grey--text text--darken-1",
                },
                card_class: {
                    running: "red lighten-1",
                    scheduled: "blue lighten-5",
                    ended: "",
                },

                // 每页的比赛数，需要和后端商量好
                page_length: 20,

                nowTime: new Date(),
                contest_cnt: 0,
                prev: null,
                next: null,
                contests: [],
            }
        },

        methods: {
            click_input: function (num) {
                router.push({name: 'contestSet', query: {page: num}});
            },

            cal_contest_status: function (st_str, et_str) {
                let st = new Date(st_str);
                let et = new Date(et_str);
                let now = new Date();

                if (st < now && now < et) {
                    return "running";
                } else if (et < now) {
                    return "ended";
                } else if (st > now) {
                    return "scheduled";
                }
            },

            // cal_now_time_length: function (
            //     now /* Date */,
            //     st_str /* string */) {
            //     let st = new Date(st_str);
            //     let end_text = "";
            //     if (now >= st) {
            //         end_text = " Ago";
            //         let tmp = now;
            //         now = st;
            //         st = tmp;
            //     } else {
            //         end_text = " Later";
            //     }
            //
            //     return this.cal_time_length(now, st) + end_text;
            // },

            cal_time_length: function (st_str, et_str) {
                let st = new Date(st_str);
                let et = new Date(et_str);

                if (et < st) {
                    return "invalid";
                }

                let dateDiff = et.getTime() - st.getTime();//时间差的毫秒数
                let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数

                if (dayDiff > 0) {
                    let d_str = ' Day';
                    if (dayDiff > 1) {
                        d_str += 's';
                    }
                    return dayDiff + d_str;
                }

                let leave1=dateDiff%(24*3600*1000);    //计算天数后剩余的毫秒数
                let hours=Math.floor(leave1/(3600*1000));//计算出小时数
                //计算相差分钟数
                let leave2=leave1%(3600*1000);    //计算小时数后剩余的毫秒数
                let minutes=Math.floor(leave2/(60*1000));//计算相差分钟数

                if (hours > 0) {
                    let h_str = ' Hour';
                    if (hours > 1) {
                        h_str += 's';
                    }
                    if (minutes > 0) {
                        let m_str = ' Minute';
                        if (minutes > 1) {
                            m_str += 's';
                        }
                        return hours + h_str + ' ' + minutes + m_str;
                    }
                    else {
                        return hours + h_str;
                    }
                }

                if (minutes > 0) {
                    let m_str = ' Minute';
                    if (minutes > 1) {
                        m_str += 's';
                    }
                    return minutes + m_str;
                }

                return '< 1 Minute';
            },

            cal_hour_length: function (st_str, et_str) {
                let st = new Date(st_str);
                let et = new Date(et_str);

                if (et < st) {
                    return "invalid";
                }

                let dateDiff = (et.getTime() - st.getTime()) / 1000;     //时间差的秒数
                let hours = dateDiff / (60 * 60);
                hours = hours.toFixed(1);
                return hours + " hours";
            },
        },

        beforeMount: function() {
            let thisCom = this;
            let page_num = 1;
            if (thisCom.$route.query.page) {
                page_num = thisCom.$route.query.page;
            }
            $.ajax({
                // 请求方式
                type : "GET",
                // 请求地址
                url : thisCom.serveUrl() + '/api/contests/',
                data : {
                    page: page_num,
                },
                // 请求成功
                success : function(result) {
                    thisCom.contest_cnt = result.count;
                    thisCom.prev = result.previous;
                    thisCom.next = result.next;
                    thisCom.contests = result.results;
                    thisCom.nowTime = new Date();

                    // 给每条比赛项目算出所需要的属性
                    thisCom.contests.forEach (
                        function (element) {
                            thisCom.contests_status.push (
                                thisCom.cal_contest_status(element.start_time, element.end_time)
                            );
                            thisCom.start_time_simplified.push(
                                element.start_time.replace('T', '\n').replace(/\+\d+.*/, '')
                            )
                        }
                    );
                },
                // 请求失败，包含具体的错误信息
                error : function(e){
                    console.log(e.status);
                    console.log(e.responseText);
                    alert(e.responseText);
                }
            });
        },

        beforeRouteUpdate(to, from, next) {
            let thisCom = this;
            let page_num = 1;
            if (to.query.page) {
                page_num = to.query.page;
            }
            $.ajax({
                // 请求方式
                type : "GET",
                // 请求地址
                url : thisCom.serveUrl() + '/api/contests/',
                data : {
                    page: page_num,
                },
                // 请求成功
                success : function(result) {
                    thisCom.contest_cnt = result.count;
                    thisCom.prev = result.previous;
                    thisCom.next = result.next;
                    thisCom.contests = result.results;
                    thisCom.nowTime = new Date();

                    // 给每条比赛项目算出所需要的属性
                    thisCom.contests.forEach (
                        function (element) {
                            thisCom.contests_status.push (
                                thisCom.cal_contest_status(element.start_time, element.end_time)
                            );
                            thisCom.start_time_simplified.push(
                                element.start_time.replace('T', '\n').replace(/\+\d+.*/, '')
                            )
                        }
                    );
                },
                // 请求失败，包含具体的错误信息
                error : function(e){
                    console.log(e.status);
                    console.log(e.responseText);
                    alert(e.responseText);
                }
            });
            next();
        }
    }
</script>

<style scoped>
    .row_height {
        height: 50px;
    }
    .row_length {
        width: 500px;
    }


    .child {
        background: orange;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
    }


    .rela_pos {
        position: relative;
    }
    .abs_pos {
        position: absolute;
    }

    .left_top {
        left: 0;
        top: 0;
    }

    .border {
        border: 1px solid #aaa;
    }
</style>