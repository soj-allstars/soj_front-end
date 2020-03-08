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
                    <div class="text-center">
                        <v-row class="row_height">
                            <v-col cols='1' class="font-weight-black pa-0 ma-0 row_height">
                                ID
                            </v-col>
                            <v-col cols='2' class="font-weight-black pa-0 ma-0 row_height">
                                Begin Time
                            </v-col>
                            <v-col class="font-weight-black pa-0 ma-0">
                                Name
                            </v-col>
                            <v-col cols='2' class="font-weight-black pa-0 ma-0 row_height">
                                Length
                            </v-col>

                        </v-row>
                        <v-row v-for="(ctst, index) in contests" :key="ctst.id"
                               class="row_height"
                               align="center"
                               justify="center">
                            <v-col cols='1' class="pa-0 ma-0 row_height rela_pos ">
                                <v-card outlined tile class="row_height align-center justify-center d-flex">
                                    {{ctst.id}}
                                </v-card>
                            </v-col>
                            <v-col cols='2' class="pa-0 ma-0 row_height rela_pos "
                            >
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-card outlined tile class="row_height align-center justify-center d-flex"
                                                :class="text_class[contests_status[index]]"
                                                v-on="on"
                                                @mouseenter.stop="mouse_in($event, index)"
                                                @mouseleave.stop="mouse_out($event, index)"
                                        >
                                            {{cal_now_time_length(new Date(), ctst.start_time)}}
                                        </v-card>
                                    </template>
                                    <span>{{contests_status[index]}}</span>
                                </v-tooltip>

                            </v-col>
                            <v-col class="pa-0 ma-0 row_height">
                                <v-btn text block outlined tile height="50px" class="text-none"
                                       link :to="{ name:'contest', params: { cid: ctst.id } }">{{ctst.name}}</v-btn>
                            </v-col>
                            <v-col cols='2' class="pa-0 ma-0 row_height">
                                <v-card outlined tile class="row_height align-center justify-center d-flex text--secondary">
                                    {{cal_time_length(ctst.start_time, ctst.end_time)}}
                                </v-card>
                            </v-col>

                        </v-row>


                        <v-pagination
                                v-model="page"
                                :length="6"
                                class="mt-10"
                        ></v-pagination>
                    </div>

                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        name: "contestSet",
        data: function () {
            return {
                /* 用于控制页面元素 */

                // 下面的页面栏的v-model
                page: 1,

                // 每个比赛开始时间的简化（字符串）
                start_time_simplified: [],

                // 每个比赛的状态（字符串）
                contests_status: [],

                // 每个状态的字体颜色
                text_class: {
                    running: "red--text text--darken-1",
                    scheduled: "light-blue--text text--darken-4",
                    ended: "grey--text text--darken-1",
                },

                nowTime: new Date(),
                contest_cnt: 0,
                prev: null,
                next: null,
                contests: [
                    {
                        "id": 0,
                        "name": "number 0 contest",
                        "start_time": "2020-03-05T17:23:39.639++08:00",
                        "end_time": "2020-03-05T19:29:39.639+08:00",
                        "is_running": false,
                        "category": "string",
                    },
                    {
                        "id": 1,
                        "name": "to be expert in BFS!",
                        "start_time": "2020-03-05T17:23:39.639+08:00",
                        "end_time": "2021-03-05T17:36:39.639+08:00",
                        "is_running": true,
                        "category": "string",
                    },
                    {
                        "id": 12345678,
                        "name": "DYNAMIC PROGRAMMING",
                        "start_time": "2020-03-08T17:23:39.639+08:00",
                        "end_time": "2020-03-09T17:59:59.639+08:00",
                        "is_running": false,
                        "category": "string",
                    },
                    {
                        "id": 12345679,
                        "name": "DYNAMIC PROGRAMMING",
                        "start_time": "2020-03-08T17:23:39.639+08:00",
                        "end_time": "2020-03-08T17:23:56.639+08:00",
                        "is_running": false,
                        "category": "string",
                    },
                ],
            }
        },

        methods: {
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

            cal_now_time_length: function (
                now /* Date */,
                st_str /* string */) {
                let st = new Date(st_str);
                let end_text = "";
                if (now >= st) {
                    end_text = " Ago";
                    let tmp = now;
                    now = st;
                    st = tmp;
                } else {
                    end_text = " Later";
                }

                return this.cal_time_length(now, st) + end_text;
            },

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
                return '< 1 minute';
            },

            mouse_in: function (evt, index) {
                let el = evt.currentTarget;
                el.innerText = this.start_time_simplified[index];
                console.log('IN');
            },

            mouse_out: function (evt, index) {
                let el = evt.currentTarget;
                el.innerText = this.cal_now_time_length(new Date(), this.contests[index].start_time);
                console.log('OUT');
            },
        },




        beforeMount: function() {
            var thisCom = this;
            $.ajax({
                // 请求方式
                type : "GET",
                // 请求地址
                url : thisCom.serveUrl() + '/api/contests/',
                // 请求成功
                success : function(result) {
                    thisCom.contest_cnt = result.count;
                    thisCom.prev = result.previous;
                    thisCom.next = result.next;
                    thisCom.contests = result.results;

                    // 给每条比赛项目算出所需要的属性
                    thisCom.contests.forEach(
                        function (element) {
                            thisCom.contests_status.push(
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
                }
            });

            // 给每条比赛项目算出所需要的属性
            // thisCom.contests.forEach(
            //     function (element) {
            //         thisCom.contests_status.push(
            //             thisCom.cal_contest_status(element.start_time, element.end_time)
            //         );
            //         thisCom.start_time_simplified.push(
            //             element.start_time.replace('T', '\n').replace(/\.\d+.*/, '')
            //         )
            //     }
            // );
        }
    }
</script>

<style scoped>
    .row_height {
        height: 50px;
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