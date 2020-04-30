<template>
    <v-container
     fluid
     no-gutters
    >
<!--        这个CSS会用到public里面的fonts文件夹-->
        <link rel="stylesheet" href="./static/css/katex.min.css">
        <v-row
         align='start'
         justify='end'
         class='mx-4'
        >
            <v-col 
             cols="4"
             style="position: fixed;"
            >
                <v-card
                 class="pa-6"
                 tile
                >
                    <v-row>
                        <v-col><v-btn link :to="{ path: '/problemSubmit', query: { pid: pid }}"
                         block color="light-blue darken-3" class="button_font white_font">
                            <v-icon class="button_icon">mdi-cloud-upload</v-icon>
                            <span>提交</span>
                        </v-btn></v-col>
                        <v-col><v-btn block color="blue-grey lighten-5" class="button_font">
                            <v-icon class="button_icon">mdi-calendar-text</v-icon>
                            <span>提交记录</span>
                        </v-btn></v-col>
                    </v-row>
                    <v-row>
                        <v-col><v-btn block color="blue-grey lighten-5" class="button_font">
                            <v-icon class="button_icon">mdi-forum</v-icon>
                            <span>讨论</span>
                        </v-btn></v-col>
                        <v-col><v-btn block color="blue-grey lighten-5" class="button_font">
                            <v-icon class="button_icon">mdi-lightbulb-on</v-icon>
                            <span>题解</span>
                        </v-btn></v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row
         align='start'
         justify='start'
         class='mx-10'
         >
            <v-col
             cols='8'
             >
                <v-card
                  class="pa-6"
                  tile
                >
                    <v-card-title class='display-1 pb-0'>{{pid}}. {{title}}</v-card-title>
                    <v-card-subtitle class='pa-4 pb-0'>
                        <v-row>
                            <v-col cols='3'>
                                <v-icon>mdi-clock</v-icon>
                                Time Limit: {{time_limit}}ms
                            </v-col>
                            <v-col cols='3'>
                                <v-icon>mdi-database</v-icon>
                                Memory Limit: {{parseInt(memory_limit / 1024)}}MB
                            </v-col>
                        </v-row>
                    </v-card-subtitle>
                    <v-card-text class='body-1 grey--text text--darken-4 pt-8'>
<!--                        <p v-for="p in description.split('\n')" :key="p.id">-->
<!--                            {{p}}-->
<!--                        </p>-->
                        <div v-html="rendered_desc">
                        </div>
                    </v-card-text>
                    <!-- inputs and outputs -->
                    <v-card-text>
                        <template v-for="i in sample_inputs.length">
                            Sample {{i}}:
                            <v-card
                            outlined
                            color="#eee"
                            class="pa-2 mb-10"
                            :key="i.id"
                            >
                                <div class="sample_con">
                                    <v-row>
                                        <v-col class="py-0 d-flex justify-space-between">
                                            <div class='caption'>Input</div>
                                            <v-btn x-small tile text
                                                   class="copy_btn"
                                                   @click.stop="copy_sample(sample_inputs[i - 1])">
                                                <v-icon small>mdi-content-copy</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <div class='code_font' :id="'sample_input_' + (i-1)" v-html='sample_inputs[i - 1].replace(/[\n]/g, "&lt;br&gt;")'></div>
                                </div>
                                <v-divider></v-divider>
                                <div class="sample_con">
                                    <v-row>
                                        <v-col class="py-0 d-flex justify-space-between">
                                            <div class='caption'>Output</div>
                                            <v-btn x-small tile text
                                                   class="copy_btn"
                                                   @click.stop="copy_sample(sample_outputs[i - 1])">
                                                <v-icon small>mdi-content-copy</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <div class="code_font" :id="'sample_output_' + (i-1)" v-html='sample_outputs[i - 1].replace(/[\n]/g, "&lt;br&gt;")'></div>
                                </div>
                            </v-card>
                        </template>
                    </v-card-text>
                    <v-card-text class='body-1 grey--text text--darken-4 pt-8'>
                        <div v-html="rendered_note"></div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <textarea id="for_copy" style="opacity: 0"></textarea>
        <v-snackbar
            v-model="snackbar"
            right bottom
            color="rgba(30, 30, 30, 0.7)"
            :timeout=1000
        >
            copied
        </v-snackbar>
    </v-container>
</template>

<script>
    import sdk from 'showdown-katex';
    import sd from 'showdown';

    export default {
        data : function () {
            return {
              // 用于控制页面元素
              snackbar: false,
              // 题目的内容
              pid: -1,
              title: '',
              time_limit: 0,
              memory_limit: 0,
              description: "",
              sample_inputs: [],
              sample_outputs: [],
              note: ''
            }
        },
        computed: {
            rendered_desc: function () {
                let converter = new sd.Converter({
                        extensions: [
                            sdk({
                                // maybe you want katex to throwOnError
                                throwOnError: true,
                                // disable displayMode
                                displayMode: false,
                                delimiters: [
                                    { left: "$", right: "$", display: false }
                                ],
                                // change errorColor to blue
                                errorColor: '#1500ff',
                            }),
                        ],
                    }
                );
                return converter.makeHtml(this.description);
            },
            rendered_note: function () {
                let converter = new sd.Converter({
                        extensions: [
                            sdk({
                                // maybe you want katex to throwOnError
                                throwOnError: true,
                                // disable displayMode
                                displayMode: false,
                                delimiters: [
                                    { left: "$", right: "$", display: false }
                                ],
                                // change errorColor to blue
                                errorColor: '#1500ff',
                            }),
                        ],
                    }
                );
                return converter.makeHtml(this.note);
            }
        },
        methods: {
            get_problem: function () {
                let thisCom = this;
                $.ajax({
                    //请求方式
                    type : "GET",
                    //请求地址
                    url : thisCom.serveUrl() + '/api/problem/' + thisCom.pid + '/',
                    //请求成功
                    success : function(result) {
                        thisCom.title = result.title;
                        thisCom.time_limit = result.time_limit;
                        thisCom.memory_limit = result.memory_limit;
                        thisCom.description = result.description;
                        thisCom.sample_inputs = result.sample_inputs;
                        thisCom.sample_outputs = result.sample_outputs;
                        thisCom.note = result.note;
                    },
                    //请求失败，包含具体的错误信息
                    error : function(e){
                        console.log(e.status);
                        console.log(e.responseText);
                    }
                });
            },

            copy_sample: function (text_for_copy) {
                // 原生方法
                let con = document.getElementById('for_copy');
                con.value = text_for_copy;
                con.select();
                if (document.execCommand('copy')) {
                    document.execCommand('copy');
                    this.snackbar = true;
                    console.log('复制成功');
                }
                else {
                    console.log('复制失败');
                }


                // 原生方法2 会选择被复制的区域
                // /* 创建range对象   */
                // const range = document.createRange();
                // range.selectNode(document.getElementById('for_copy'));    // 设定range包含的节点对象
                //
                // /* 窗口的selection对象，表示用户选择的文本 */
                // const selection = window.getSelection();
                // if(selection.rangeCount > 0) selection.removeAllRanges(); // 将已经包含的已选择的对象清除掉
                // selection.addRange(range);                                // 将要复制的区域的range对象添加到selection对象中
                //
                // document.execCommand('copy'); // 执行copy命令，copy用户选择的文本
            },
        },
        beforeMount : function() {
            this.pid = this.$route.query.pid;
            this.get_problem();
        },
      
        // 只改变参数是不会使页面刷新的
        // 需要通过这个函数来执行参数更新的操作
        beforeRouteUpdate (to, from, next) {
        // react to route changes...
        // don't forget to call next()
            this.pid = to.query.pid;
            this.get_problem();
            next();
        }
    }
    
</script>

<style scoped>
    .code_font {
        color: rgb(189,65,71);
        font-family: "consolas";
        font-weight: bold;
    }
    .button_font {
        font-weight: 500;
    }
    .white_font {
        color: white;
    }
    .button_icon {
        position: absolute;
        left: 5px;
    }

    .sample_con .copy_btn {
        opacity: 0.1;
    }
    .sample_con:hover .copy_btn {
        opacity: 1;
    }
</style>