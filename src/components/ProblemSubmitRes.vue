<template>
    <v-content
     fluid
     no-gutters
    >
        <v-row
         align='center'
         justify='center'
        >
            <v-col cols='8' align="center">
                <v-card class='pa-10'>
                    <v-data-table
                     :headers='headers'
                     :items='items'
                     class="elevation-1"
                    >
                    </v-data-table>
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
            verdict: '',
            memory_usage: 0,
            time_usage: 0,
            submit_time: '',
            code: '',
            lang: '',
            outputs: null,
            
            // 常量
            verdict_status: [
                "Accepted",
                "Presentation Error",
                "Time Limit Exceeded",
                "Memory Limit Exceeded",
                "Wrong Answer",
                "Runtime Error",
                "Output Limit Exceeded",
                "Compile Error",
                "System Error"
            ],
            
            // 用于控制页面本身元素
            headers: [
                { 
                    text: 'user',
                    value: 'user',
                    sortable: false,
                    align: 'left',
                },
                { text: 'status', value: 'status'},
                { text: 'memory cost', value: 'memory_cost'},
                { text: 'time cost', value: 'time_cost'},
                { text: 'submit time', value: 'submit_time'},
                { text: 'language', value: 'language'}
            ],
            items: [
                {
                    user: 'kazami',
                    status: 'wrong answer',
                    memory_cost: '100',
                    time_cost: '996',
                    submit_time: '2019.1.1 16:06',
                    language: 'C++'
                }
            ]
        }
    }
}
</script>