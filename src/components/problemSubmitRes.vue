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
                { text: 'memory cost(KB)', value: 'memory_cost'},
                { text: 'time cost(ms)', value: 'time_cost'},
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
    },
    methods: {
        getSubmission: function(submission_id) {
            var thisCom = this;
            $.ajax({
                //请求方式
                type : "GET",
                //请求地址
                url : thisCom.serveUrl() + '/api/submission/' + submission_id,
                //请求成功
                success : function(result) {
                    // 因为是异步的，所以可能执行这个函数的时候，调用这个函数之后的代码段可能已经运行了
                    
                    thisCom.verdict = result.verdict;
                    thisCom.memory_usage = result.memory;
                    thisCom.time_usage = result.time;
                    thisCom.submit_time = result.submit_time;
                    thisCom.code = result.code;
                    thisCom.lang = result.lang;
                    thisCom.outputs = result.outputs;
                    
                    
                    console.log('verdict:\n' + thisCom.verdict);
                    console.log('memory_usage:\n' + thisCom.memory_usage);
                    console.log('time_usage:\n' + thisCom.time_usage);
                    console.log('submit_time:\n' + thisCom.submit_time);
                    console.log('code:\n' + thisCom.code);
                    console.log('lang:\n' + thisCom.lang);
                    console.log('outputs:\n' + thisCom.outputs);
                    
                    thisCom.items[0].status = thisCom.verdict;
                    thisCom.items[0].memory_cost = thisCom.memory_usage;
                    thisCom.items[0].time_cost = thisCom.time_usage;
                    thisCom.items[0].submit_time = thisCom.submit_time;
                    thisCom.items[0].language = thisCom.lang;
                },
                //请求失败，包含具体的错误信息
                error : function(e){
                  console.log(e.status);
                  console.log(e.responseText);
                }
            });
        }
    },
    created: function() {
        var thisCom = this;
        
        this.getSubmission(this.$route.query.submission_id);
        
        
        this.items[0].status = this.verdict;
        this.items[0].memory_cost = this.memory_usage;
        this.items[0].time_cost = this.time_usage;
        this.items[0].submit_time = this.submit_time;
        this.items[0].language = this.lang;
        console.log(this.items[0]);
    },
    
    beforeRouteUpdate (to, from, next) {
        // react to route changes...
        // don't forget to call next()
        this.getSubmission(this.$route.query.submission_id);
        next();
    }
}
</script>