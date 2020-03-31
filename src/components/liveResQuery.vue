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
                        <v-col :cols="selected_query_type === 'all' ? '' : 3">
                            <v-select   :items="query_type_items"
                                        v-model="selected_query_type"
                                        item-text="query_name"
                                        item-value="query_value"
                                        label="Query Type"
                            ></v-select>
                        </v-col>
                        <v-col v-if="selected_query_type !== 'all'">
                            <v-text-field   :label='input_hint[selected_query_type]'
                                            v-model="user_input"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="2"
                               class="d-flex align-center justify-center"
                        >
                            <v-btn  block
                                    outlined
                                    @click="query_submission"
                            >
                                query
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>

                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
    export default {
        data : function () {
            return {
                // 和后端交互
                selected_query_type: 'user',
                input_hint: {
                    'detail': 'Submission ID',
                    'user' : 'Username',
                    'contest': 'Contest ID'
                },
                query_type_items: [
                    {
                        query_name: '单个结果',
                        query_value: 'detail',
                    },
                    {
                        query_name: '用户',
                        query_value: 'user',
                    },
                    {
                        query_name: '比赛',
                        query_value: 'contest',
                    },
                    {
                        query_name: '所有',
                        query_value: 'all',
                    },
                ],
                user_input: null,
                recv_data: null,

                // 用于控制页面本身元素

            }
        },
        methods: {
            query_submission: function () {
                let thisCom = this;
                let post_data = {
                    type: thisCom.selected_query_type
                };

                switch (thisCom.selected_query_type) {
                    case "detail":
                        post_data.submission_id = parseInt(thisCom.user_input);
                        break;
                    case "user":
                        post_data.user_id = thisCom.user_input;
                        break;
                    case "contest":
                        post_data.contest_id = parseInt(thisCom.user_input);
                        break;
                    default:
                        break;
                }

                let ws = new WebSocket("ws://" + location.hostname + "/ws/submission/");

                ws.onopen = function(evt) {
                    console.log("WS connection open ...");
                    ws.send(JSON.stringify(post_data));
                    console.log('send : ' + JSON.stringify(post_data));
                };

                ws.onmessage = function(evt) {
                    console.log( "WS received Message: " + evt.data);
                    let recv_data = JSON.parse(evt.data);
                    thisCom.recv_data = recv_data;
                    console.log('recv: ' + recv_data);
                };

                ws.onclose = function(evt) {
                    console.log("WS connection closed.");
                };
            }
        },
    }
</script>