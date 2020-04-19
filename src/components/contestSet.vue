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
                                                   class="headline font-weight-medium d-flex justify-start px-0 text-none"
                                                   :class="text_class[contests_status[index]]"
                                                   @click="enterContest(ctst)"
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
                                        <v-tooltip bottom color="#333">
                                            <template v-slot:activator="{ on }">
                                                <span class="caption ml-8"
                                                      :class="text_class[contests_status[index]]"
                                                      v-on="on"
                                                >
                                                    <v-icon small :color="icon_class[contests_status[index]]"
                                                    >{{access_icon[ctst.category]}}</v-icon>
                                                </span>
                                            </template>
                                            <span>{{ctst.category}}</span>
                                        </v-tooltip>

                                        <v-spacer></v-spacer>

                                        <v-tooltip bottom color="#333">
                                            <template v-slot:activator="{ on }">
                                                <v-btn text x-small class="pa-0"
                                                       v-if="ctst.category === 'REGISTER' && ctst.registered"
                                                       v-on="on"
                                                       @click="unregister_contest(ctst)"
                                                >
                                                    <v-icon small
                                                            :color="icon_class[contests_status[index]]">
                                                        mdi-exit-to-app
                                                    </v-icon>
                                                </v-btn>
                                            </template>
                                            <span>unregister the contest</span>
                                        </v-tooltip>

                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>

                    <v-pagination :length="Math.ceil(contest_cnt / page_length)"
                                  v-model="selected_page"
                                  @input="click_input"
                                  :total-visible="10"
                                  class="mt-10"
                    ></v-pagination>



                    <v-dialog v-model="show_check_enter_dialog"
                              max-width="500px"
                    >
                        <v-card v-if="clicked_ctst.category === 'PRIVATE' ">
                            <v-card-title class="headline">VERIFY</v-card-title>
                            <v-card-text>
                                <v-text-field
                                        v-model="ctst_psw"
                                        :append-icon="show_psw ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show_psw ? 'text' : 'password'"
                                        label="Password"
                                        @click:append="show_psw = !show_psw"
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="blue darken-2"
                                        text
                                        @click="show_check_enter_dialog = false"
                                >
                                    CANCEL
                                </v-btn>
                                <v-btn
                                        color="blue darken-2"
                                        text
                                        @click="goVerify('verify_psw',
                                                {password: ctst_psw}
                                                )"
                                >
                                    ENTER
                                </v-btn>
                            </v-card-actions>
                        </v-card>


                        <v-card v-if="clicked_ctst.category === 'REGISTER' ">
                            <v-card-title class="headline">REGISTER</v-card-title>
                            <v-card-text>Do you want to register this contest?</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="blue darken-2"
                                        text
                                        @click="show_check_enter_dialog = false"
                                >
                                    CANCEL
                                </v-btn>
                                <v-btn
                                        color="blue darken-2"
                                        text
                                        @click="goVerify('register',
                                                { contest_id: clicked_ctst.id }
                                                )"
                                >
                                    REGISTER
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>


                    <v-dialog v-model="show_unregister_dialog"
                              max-width="500px"
                    >
                        <v-card>
                            <v-card-title class="headline">UNREGISTER</v-card-title>
                            <v-card-text>Do you want to unregister this contest?</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="blue darken-2"
                                        text
                                        @click="show_unregister_dialog = false"
                                >
                                    CANCEL
                                </v-btn>

                                <v-btn
                                        color="blue darken-2"
                                        text
                                        @click="goVerify('unregister',
                                            { contest_id: clicked_ctst.id },
                                            false)"
                                >
                                    UNREGISTER
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>


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

                // 验证的对话框得到v-model
                show_check_enter_dialog: false,
                show_unregister_dialog: false,
                show_psw: false,
                ctst_psw: '',
                clicked_ctst: {},

                // 每个比赛开始时间的简化（字符串）
                start_time_simplified: [],

                // 每个比赛的状态（字符串）
                contests_status: [],

                // 每个状态的字体颜色
                icon_class: {
                    "running": "white",
                    "scheduled": "blue darken-4",
                    "ended": "grey darken-1"
                },
                // 比赛权限的icon
                access_icon: {
                    "OPEN": "mdi-door-open",
                    "PRIVATE": "mdi-lock",
                    "REGISTER": "mdi-account-plus",
                    "SOLO": "mid-account-multiple",
                },
                text_class: {
                    "running": "white--text",
                    "scheduled": "blue--text text--darken-4",
                    "ended": "grey--text text--darken-1",
                },
                card_class: {
                    "running": "red lighten-1",
                    "scheduled": "blue lighten-5",
                    "ended": "",
                },

                // 每页的比赛数，需要和后端商量好
                page_length: 20,


                /* 数据 */
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

            getContestPage: function(page_num) {
                let thisCom = this;

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
                        console.log(JSON.stringify(result.results));
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

            goVerify: function (type, post_data){
                let thisCom = this;

                let target_url = {
                    verify_psw: '/api/contest/let-me-in/',
                    register: '/api/contest/register/',
                    unregister: '/api/contest/unregister/',
                };

                $.ajax({
                    // 请求方式
                    type : "POST",
                    // 请求地址
                    url : thisCom.serveUrl() + target_url[type] + thisCom.clicked_ctst.id + '/',
                    data : post_data,
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: true
                    },
                    // 请求成功
                    success : function(result) {
                        switch (type) {
                            case 'verify_psw':
                                if (result.hasOwnProperty("ok")) {
                                    if (!result.ok) {
                                        alert("wrong password!")
                                    }
                                    else {
                                        router.push({ name: "contest", query: { cid: thisCom.clicked_ctst.id } });
                                    }
                                }
                                break;
                            case 'register':
                                router.push({ name: "contest", query: { cid: thisCom.clicked_ctst.id } });
                                break;
                            case 'unregister':
                                router.go(0);
                                break;
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

            unregister_contest: function (ctst) {
                this.clicked_ctst = ctst;
                this.show_unregister_dialog = true;
            },

            enterContest: function (ctst) {
                switch (ctst.category) {
                    case "OPEN":
                        router.push({ name:'contest', query: { cid: ctst.id } });
                        break;
                    case "REGISTER":
                    case "PRIVATE":
                        if (ctst.registered) {
                            router.push({ name:'contest', query: { cid: ctst.id } });
                        }
                        else {
                            this.show_check_enter_dialog = true;
                            this.clicked_ctst = ctst;
                        }
                        break;
                    case "SOLO":
                        break;
                }
            },
        },

        beforeMount: function() {
            let page_num = 1;
            if (this.$route.query.page) {
                page_num = this.$route.query.page;
            }
            this.getContestPage(page_num);
        },

        beforeRouteUpdate(to, from, next) {
            let page_num = 1;
            if (to.query.page) {
                page_num = to.query.page;
            }
            this.getContestPage(page_num);
            next();
        }
    }
</script>

<style scoped>
    .row_length {
        width: 500px;
    }
</style>