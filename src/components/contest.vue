<template>
    <v-container
        fluid
        no-gutters
        class="flex-nowrap"
    >
        <v-row
            align='center'
            justify='center'
        >
            <v-col cols="10"
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col class="ma-0 pa-0"
                    >
                        <v-card class="pa-10"
                                tile
                        >
                            <v-row justify="space-between">
                                <v-col cols="2">
                                    <span class="font-weight-bold">Begin:<br/></span>
                                    {{simplified_start_time}}
                                </v-col>
                                <v-col class="d-flex justify-center align-center">
                                    <span class="headline font-weight-bold">{{name}}</span>
                                </v-col>
                                <v-col cols="2">
                                    <span class="font-weight-bold">End:<br/></span>
                                    {{simplified_end_time}}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-progress-linear height="20"
                                                       striped
                                                       :value=elapsed_ratio
                                    >
                                    </v-progress-linear>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col v-if="contest_status === 'running'" cols="2">
                                    <span class="font-weight-bold">Elapsed:</span><br/>
                                    {{elapsed_time}}
                                </v-col>
                                <v-col class="d-flex justify-center align-center"
                                        :class="text_class[contest_status]"
                                >
                                    <span v-if="contest_status === 'scheduled' ">Start Countdown&nbsp;:&nbsp;{{elapsed_time}}</span>
                                    <span v-if="contest_status === 'running'">Running</span>
                                    <span v-if="contest_status === 'ended'">ended</span>
                                </v-col>
                                <v-col v-if="contest_status === 'running'" cols="2">
                                    <span class="font-weight-bold">Remaining:</span><br/>
                                    {{remain_time}}
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row align="center"
                       justify="center"
                >
                    <v-col class="ma-0 pa-0"
                    >
                        <v-card tile>
                            <v-tabs grow v-model="tabs">
                                <v-tab v-for="title in tabs_title" :key="title.id">
                                    {{title}}
                                </v-tab>
                            </v-tabs>

                            <v-tabs-items v-model="tabs">
                                <v-tab-item>
                                    <v-card outlined>
                                        <v-simple-table fixed-header>
                                            <template v-slot:default>
                                                <thead>
                                                    <tr>
                                                        <th class="text-sm-center">No.</th>
                                                        <th class="text-sm-center">Problem</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(p, index) in problems" :key="p.name">
                                                        <td class="pa-0">
                                                            <v-btn text block link tile
                                                                   class="text-none"
                                                                   :to="{ name: 'contestProblem', query: { pid: p.id, cid: cid } }"
                                                            >
                                                                {{ num_to_alpha(index) }}
                                                            </v-btn>
                                                        </td>
                                                        <td class="pa-0">
                                                            <v-btn text block link tile
                                                                   class="text-none"
                                                                   :to="{ name: 'contestProblem', query: { pid: p.id, cid: cid } }"
                                                            >
                                                                {{ p.title }}
                                                            </v-btn>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-card>
                                </v-tab-item>


                                <v-tab-item>
                                    <v-card outlined>
                                        reserved for detail
                                    </v-card>
                                </v-tab-item>


                                <v-tab-item>
                                    <div class="show_scroll">
                                        <v-hover
                                            v-slot:default="{ hover }"
                                        >
                                            <div class="d-flex flex-nowrap">
                                                <v-card outlined tile
                                                        min-width="50"
                                                        min-height="50"
                                                        class="d-inline-flex align-center justify-center"
                                                        :color="hover ? 'light-blue lighten-5' : ''"
                                                        :elevation="hover ? '2' : '0'"
                                                >
                                                    <span class="font-weight-bold">Rank</span>
                                                </v-card>

                                                <v-card outlined tile
                                                        min-width="250"
                                                        min-height="50"
                                                        class="d-inline-flex align-center justify-center"
                                                        :color="hover ? 'light-blue lighten-5' : ''"
                                                        :elevation="hover ? '2' : '0'"
                                                >
                                                    <span class="font-weight-bold">Name</span>
                                                </v-card>
                                                <v-card outlined tile
                                                        min-width="120"
                                                        min-height="50"
                                                        class="d-inline-flex align-center justify-center"
                                                        :color="hover ? 'light-blue lighten-5' : ''"
                                                        :elevation="hover ? '2' : '0'"
                                                >
                                                    <span class="font-weight-bold">Penalty</span>
                                                </v-card>

                                                <v-card outlined tile
                                                        min-width="120"
                                                        min-height="50"
                                                        class="d-inline-flex align-center justify-center"
                                                        v-for="(pbl, index) in problems" :key="pbl.key"
                                                        :color="hover ? 'light-blue lighten-5' : ''"
                                                        :elevation="hover ? '2' : '0'"
                                                >
                                                    <span class="font-weight-bold">
                                                        {{String.fromCharCode('A'.charCodeAt(0) + index) }}
                                                    </span>
                                                </v-card>
                                            </div>
                                        </v-hover>
                                        <v-hover v-for="(std, index) in standings" :key="std.id"
                                                 v-slot:default="{ hover }"
                                        >
                                            <div class="d-flex flex-nowrap">

                                                <!--排名-->
                                                <v-card outlined tile
                                                        min-width="50"
                                                        min-height="50"
                                                        class="d-inline-flex align-center justify-center"
                                                        :color="hover ? 'light-blue lighten-5' : ''"
                                                        :elevation="hover ? '2' : '0'"
                                                >
                                                    {{index + 1}}
                                                </v-card>

                                                <!--用户名显示-->
                                                <v-card outlined tile
                                                        min-width="250"
                                                        min-height="50"
                                                        class="d-inline-flex align-center justify-center"
                                                        :color="hover ? 'light-blue lighten-5' : ''"
                                                        :elevation="hover ? '2' : '0'"
                                                >
                                                    {{std.username}}
                                                </v-card>
                                                <v-card outlined tile
                                                        min-width="120"
                                                        min-height="50"
                                                        class="d-inline-flex align-center justify-center"
                                                        color="orange lighten-5"
                                                        :elevation="hover ? '2' : '0'"
                                                >
                                                    {{seconds_to_hms(std.total_penalty)}}
                                                </v-card>

                                                <!--问题的排序-->
                                                <v-card outlined tile
                                                        min-width="120"
                                                        min-height="50"
                                                        class="d-inline align-center justify-center"
                                                        v-for="(pbl, index) in problems" :key="pbl.key"
                                                        :color="std.AC_times[index + 1] ? 'light-green lighten-5' :
                                                                    (std.wrong_numbers[index + 1] ? 'red lighten-5' :
                                                                        (hover ? 'light-blue lighten-5' :
                                                                        '')
                                                                    )"
                                                        :elevation="hover ? '2' : '0'"
                                                >
                                                    <v-row no-gutters
                                                           v-if="std.AC_times[index + 1]"
                                                    >
                                                        <v-col class="d-flex justify-center align-center">
                                                            {{seconds_to_hms(std.AC_times[index + 1])}}
                                                            <!-- JSON中从1开始，所以要+1 -->
                                                        </v-col>
                                                    </v-row>
                                                    <v-row no-gutters
                                                           v-if="std.wrong_numbers[index + 1]"
                                                    >
                                                        <v-col class="d-flex justify-center align-center">
                                                            <span class="caption">
                                                                ( -{{std.wrong_numbers[index + 1]}} )
                                                            </span>
                                                        </v-col>
                                                    </v-row>
                                                </v-card>
                                            </div>
                                        </v-hover>
                                    </div>

                                </v-tab-item>
                                <v-tab-item>
                                    <v-card outlined>
                                        reserved for comment ( or nothing )
                                    </v-card>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row align="center"
                       justify="center"
                       v-if="description"
                >
                    <v-col class="mx-0 px-0"
                    >
                        <v-card class="pa-10">
                            <h4>{{description}}</h4>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data: function () {
            return {
                "cid": 0,
                "name": "The first FUCKING contest",
                "description": "string",
                "problems": [
                    {
                        "id": 0,
                        "title": "string"
                    }
                ],
                "start_time": "2020-03-08T06:18:29.124+08:00",
                "end_time": "2020-03-08T23:18:29.124+08:00",
                "is_running": true,
                "registered": true,
                "category": "string",
                "standings": [
                    {
                        "user_id": 2,
                        "username": "yjp",
                        "solved_number": 2,
                        "total_penalty": 1026560.72247,
                        "AC_times": {
                            "1": 511965.375124,
                            "2": 510995.347346
                        },
                        "wrong_numbers": {
                            "1": 1,
                            "2": 2,
                            "3": 1,
                        }
                    },
                    {
                        "user_id": 1,
                        "username": "soj",
                        "solved_number": 1,
                        "total_penalty": 514583.141346,
                        "AC_times": {
                            "1": 510983.141346
                        },
                        "wrong_numbers": {
                            "1": 3
                        }
                    }
                ],

                contest_status: "",
                start_date: null,
                end_date: null,
                elapsed_ratio: 0,
                elapsed_time: '00:00:00',
                remain_time: '00:00:00',

                // 用于调节字体颜色的class
                text_class: {
                    running: "red--text text--lighten-1",
                    scheduled: "light-blue--text text--darken-4",
                    ended: "grey--text text--darken-1",
                },

                // 用于停止时间刷新的值
                interval_value: null,

                /* 选项卡(Tab)相关 */

                // tab的v-model
                tabs: null,

                // tab的标题
                tabs_title: ["Problems", "Status", "Rank", "Comments"],
            }
        },

        computed: {
            simplified_start_time: function () {
                return this.start_time.replace('T', '\n').replace(/\+\d+.*/, '');
            },

            simplified_end_time: function () {
                return this.end_time.replace('T', '\n').replace(/\+\d+.*/, '');
            }
        },

        methods: {
            fill_zero: function(t) {
                if (t < 10) {
                    return '0' + t;
                }
                return t;
            },

            seconds_to_hms: function(seconds) {
                if (!seconds) return ;

                let h = this.fill_zero(Math.floor(seconds / (60 * 60)));
                seconds = seconds % (60 * 60);
                let min = this.fill_zero(Math.floor(seconds / (60)));
                seconds = seconds % (60);
                let s = this.fill_zero(Math.floor(seconds));

                return h + ':' + min + ':' + s;
            },

            cal_time_hms: function(prev, post) {
                let seconds_diff = Math.floor((post.getTime() - prev.getTime()) / 1000);
                return this.seconds_to_hms(seconds_diff);
            },

            updateTime: function () {
                let now = new Date();
                if (now < this.start_date) {
                    // scheduled
                    this.contest_status = "scheduled";
                    this.elapsed_ratio = 0;
                    this.elapsed_time = this.cal_time_hms(now, this.start_date);
                }
                else if (now > this.end_date) {
                    // ended
                    this.contest_status = "ended";
                    this.elapsed_ratio = 100;
                    clearInterval(this.interval_value);
                }
                else {
                    // running
                    this.contest_status = "running";
                    this.elapsed_time = this.cal_time_hms(this.start_date, now);
                    this.remain_time = this.cal_time_hms(now, this.end_date);
                    this.elapsed_ratio = (now.getTime() - this.start_date.getTime()) / (this.end_date.getTime() - this.start_date.getTime()) * 100;
                }
            },


            num_to_alpha: function (num) {
                let position_zero = 'A'.charCodeAt(0);
                return String.fromCharCode(num + position_zero);
            }
        },

        beforeMount() {
            this.cid = this.$route.query.cid;
            let thisCom = this;
            console.log('beforemount: ' + this.cid);

            $.ajax({
                // 请求方式
                type : "GET",
                // 请求地址
                url : thisCom.serveUrl() + '/api/contest/' + this.cid + '/',
                // 请求成功
                success : function(result) {
                    thisCom.name = result.name;
                    thisCom.description = result.description;
                    thisCom.problems = result.problems;
                    thisCom.start_time = result.start_time;
                    thisCom.end_time = result.end_time;
                    thisCom.is_running = result.is_running;
                    thisCom.registered = result.registered;
                    thisCom.category = result.category;

                    thisCom.start_date = new Date(thisCom.start_time);
                    thisCom.end_date = new Date(thisCom.end_time);

                    thisCom.updateTime();
                    thisCom.interval_value = setInterval(thisCom.updateTime, 1000);


                    let ws = new WebSocket("ws://" + location.hostname + "/ws/contest/standings/");

                    ws.onopen = function(evt) {
                        console.log("WS connection open ...");
                        ws.send('{"contest_id":' + thisCom.cid + '}');
                        console.log('contest_id: ' + thisCom.cid);
                    };

                    ws.onmessage = function(evt) {
                        console.log( "WS received Message: " + evt.data);
                        let recv_data = JSON.parse(evt.data);

                        if (recv_data.ok) {
                            thisCom.standings = recv_data.standings;
                        }
                        else {
                            alert(recv_data.detail);
                        }
                    };

                    ws.onclose = function(evt) {
                        console.log("WS connection closed.");
                    };
                },
                // 请求失败，包含具体的错误信息
                error : function(e){
                    console.log(e.status);
                    console.log(e.responseText);
                }
            });
        },


        // 只改变参数是不会使页面刷新的
        // 需要通过这个函数来执行参数更新的操作
        beforeRouteUpdate (to, from, next) {
            // react to route changes...
            // don't forget to call next()
            this.cid = to.query.cid;
            let thisCom = this;
            $.ajax({
                // 请求方式
                type : "GET",
                // 请求地址
                url : thisCom.serveUrl() + '/api/contest/' + this.cid + '/',
                // 请求成功
                success : function(result) {
                    thisCom.cid = result.cid;
                    thisCom.name = result.name;
                    thisCom.description = result.description;
                    thisCom.problems = result.problems;
                    thisCom.start_time = result.start_time;
                    thisCom.end_time = result.end_time;
                    thisCom.is_running = result.is_running;
                    thisCom.registered = result.registered;
                    thisCom.category = result.category;

                    thisCom.start_date = new Date(thisCom.start_time);
                    thisCom.end_date = new Date(thisCom.end_time);

                    thisCom.updateTime();
                    thisCom.interval_value = setInterval(thisCom.updateTime, 1000);
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

<style scoped>
    .th_length {
        width: 500px !important;
    }
    .show_scroll {
        overflow: auto;
    }
</style>