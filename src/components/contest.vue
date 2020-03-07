<template>
    <v-container
        fluid
        no-gutters
    >
        <v-row
            align='center'
            justify='center'
        >
            <v-col cols="10">
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col>
                        <v-card class="pa-10">
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

                contest_status: "",
                start_date: null,
                end_date: null,
                elapsed_ratio: 0,
                elapsed_time: '00:00:00',
                remain_time: '00:00:00',

                // 用于调节字体颜色的class
                text_class: {
                    running: "red--text text--darken-3",
                    scheduled: "light-blue--text text--darken-4",
                    ended: "grey--text text--darken-1",
                },


                // 用于停止时间刷新的值
                interval_value: null,
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

            cal_time_hms: function(prev, post) {
                let time_diff = Math.floor((post.getTime() - prev.getTime()) / 1000);
                let h = this.fill_zero(Math.floor(time_diff / (60 * 60)));

                time_diff = time_diff % (60 * 60);
                let min = this.fill_zero(Math.floor(time_diff / (60)));

                time_diff = time_diff % (60);
                let s = this.fill_zero(Math.floor(time_diff));

                return h + ':' + min + ':' + s;
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
                    this.elapsed_tatio = (now.getTime() - this.start_date.getTime()) / (this.end_date.getTime() - this.start_date.getTime()) * 100;
                }
            }
        },

        beforeMount() {
            this.cid = this.$route.params.cid;
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

                    thisCom.interval_value = setInterval(thisCom.updateTime, 1000);
                },
                // 请求失败，包含具体的错误信息
                error : function(e){
                    console.log(e.status);
                    console.log(e.responseText);
                }
            });

            // thisCom.start_date = new Date(thisCom.start_time);
            // thisCom.end_date = new Date(thisCom.end_time);
            //
            // thisCom.interval_value = setInterval(thisCom.updateTime, 1000);
        },


        // 只改变参数是不会使页面刷新的
        // 需要通过这个函数来执行参数更新的操作
        beforeRouteUpdate (to, from, next) {
            // react to route changes...
            // don't forget to call next()
            this.cid = to.params.cid;
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
</style>